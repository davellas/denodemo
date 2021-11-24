import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

function handler(req: Request): Response {
  switch (new URL(req.url).pathname) {
    case "/users":
      return new Response("Hello Mr. Unknown");
    default:
      return new Response("404");
  }
}

const PORT = 8081;
console.log(`🚀 Server is running on http://localhost:${PORT}`);
await serve(handler, { addr: `:${PORT}` });
