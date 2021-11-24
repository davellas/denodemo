import { readerFromStreamReader } from 'https://deno.land/std/streams/conversion.ts';
import { delay } from 'https://deno.land/std@0.115.1/async/delay.ts';
import { Handler } from 'https://deno.land/std@0.115.1/http/server.ts';

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

async function* lineGenerator() {
  yield '<ul>\n';
  for (let i = 0; i < 10; i++) {
    await delay(1e3);
    yield `<li>line ${i}</li>\n`;
  }
  yield '</ul>\n';
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

export const streamingHandler: Handler = (request, connInfo) => {
  const iterator = lineGenerator();
  const readableStream = iteratorToStream(iterator).pipeThrough(
    new AnyToU8Stream(),
  );
  return new Response(readableStream, {
    headers: {
      'content-type': 'text/html',
    },
  });
};
