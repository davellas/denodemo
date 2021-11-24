
import { setupWs } from './sockets/server/socketServer.ts';
import { streamingHandler } from './streaming.ts';


const defaultHandler = () => {
    return new Response('Hello World\n');
  };

async function handle(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
        const url = new URL(requestEvent.request.url);
        const request =requestEvent.request;
        console.log(`path: ${url.pathname}`);
        switch (url.pathname) {
            case '/ws':
                if (request.headers.get("upgrade") != "websocket") {
                    return await requestEvent.respondWith(
                        new Response(null, {status: 501}));
                }
                return await requestEvent.respondWith(
                        setupWs(request)
                      );
            case '/streaming':
                return await requestEvent.respondWith(
                streamingHandler(request,  conn)
              );
            default:
                await requestEvent.respondWith(
                    defaultHandler()
                  );
          }
    }
  }
  
  const server = Deno.listen({ port: 8000 });
  console.log('http://localhost:8000/');

  for await (const conn of server) {
    handle(conn);
  }
// for await (const req of serve({port:80})){
//     req.response({body:"Hello world"})
//     }

// serve(
//   (request, connInfo) => {
//     const url = new URL(request.url);
    // switch (url.pathname) {
    //   case '/ws':
    //     if (request.headers.get('upgrade') == 'websocket') {
    //        return setupWs(request);
    //     } else {
    //       return new Response(null, { status: 501 });
    //     }
    //   case '/streaming':
    //     return streamingHandler(request, connInfo);
    //   default:
    //     return defaultHandler();
    // }
//   },
//   { addr: ':8000' },
// );

