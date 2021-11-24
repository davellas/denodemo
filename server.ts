import { Application } from "https://deno.land/x/oak/mod.ts";
import { serve } from 'https://deno.land/std@0.115.1/http/server.ts';
import { setupWs } from './sockets/server/socketServer.ts';
import { streamingHandler } from './streaming.ts';

console.log('http://localhost:8000/');

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
serve(
  (request, connInfo) => {
    const url = new URL(request.url);
    switch (url.pathname) {
      case '/ws':
        if (request.headers.get('upgrade') == 'websocket') {
           return setupWs(request);
        } else {
          return new Response(null, { status: 501 });
        }
      case '/streaming':
        return streamingHandler(request, connInfo);
      default:
        return defaultHandler();
    }
  },
  { addr: ':8000' },
);

const defaultHandler = () => {
  return new Response('Hello World\n');
};
