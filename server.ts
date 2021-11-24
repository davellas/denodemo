import { setupWs } from "./sockets/server/socketServer.ts";
import { createReadableByteStream } from "./streaming.ts";

const defaultHandler = () => {
  return new Response("Hello World\n");
};

async function handle(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    const request = requestEvent.request;
    console.log(`path: ${url.pathname}`);
    switch (url.pathname) {
      case "/ws":
        if (request.headers.get("upgrade") != "websocket") {
          return await requestEvent.respondWith(
            new Response(null, { status: 501 })
          );
        }
        return await requestEvent.respondWith(setupWs(request));
      case "/streaming":
        return await requestEvent.respondWith(
          new Response(createReadableByteStream(), {
              headers: {
                  'content-type': 'text/html'
              }
          })
        );
      default:
        return await requestEvent.respondWith(defaultHandler());
    }
  }
}
const port = 8000;
const server = Deno.listen({ port });
console.log(`Server started and listening on localhost ${port}`);

for await (const conn of server) {
  handle(conn);
}
