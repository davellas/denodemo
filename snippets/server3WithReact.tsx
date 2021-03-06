/** @jsx h */

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

function App() {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
      </head>
      <body>
        <h1>Hello world12</h1>
      </body>
    </html>
  );
}

function handler(req: Request) {
  const html = renderSSR(<App />);
  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

const port = 8001;

console.log(`Listening on http://localhost:${port}`);
await serve(handler, {
  addr: `:${port}`,
});
