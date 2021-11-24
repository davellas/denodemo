import { Router } from 'https://deno.land/x/oak/mod.ts';
import { readerFromStreamReader } from 'https://deno.land/std/streams/conversion.ts';
import { delay } from 'https://deno.land/std@0.115.1/async/delay.ts';

function iteratorToStream<T>(iterator: AsyncGenerator<T> | Iterator<T>) {
  return new ReadableStream<T>({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

class AnyToU8Stream extends TransformStream {
  #textencoder = new TextEncoder();
  constructor() {
    super({
      transform: async (chunk: unknown, controller) => {
        chunk = await chunk;
        switch (typeof chunk) {
          case 'object':
            if (chunk === null) controller.terminate();
            controller.enqueue(this.#textencoder.encode(JSON.stringify(chunk)));
            break;
          default:
            controller.enqueue(this.#textencoder.encode(String(chunk)));
            break;
        }
      },
    });
  }
}

export async function* createAsyncGenerator(): AsyncGenerator<string> {
  yield '<ul>\n';
  for (let i = 0; i < 5; i++) {
    await delay(500);
    yield `<li>line ${i}</li>\n`;
  }
  yield '</ul>\n';
}

export const createReadableStream = (): ReadableStream<string> => {
  const asyncGenerator = createAsyncGenerator();
  return iteratorToStream(asyncGenerator);
};

export const createReadableByteStream = (): ReadableStream<Uint8Array> => {
  const readableStringStream = createReadableStream();
  const readableByteStream = readableStringStream.pipeThrough(
    new AnyToU8Stream(),
  );
  return readableByteStream;
};

export const createDenoReader = (): Deno.Reader => {
  const readableByteStream = createReadableByteStream();
  const reader = readerFromStreamReader(readableByteStream.getReader());
  return reader;
};

export const streamingRouter = new Router();
streamingRouter
  .get('/async-generator', (context) => {
    context.response.type = 'html';
    context.response.body = createAsyncGenerator();
  })
  .get('/readable-stream', (context) => {
    context.response.type = 'html';
    context.response.body = createReadableStream();
  })
  .get('/reader', (context) => {
    context.response.type = 'html';
    context.response.body = createDenoReader();
  })
  .get('/', (context) => {
    context.response.type = 'html';
    context.response.body = createAsyncGenerator();
  });
