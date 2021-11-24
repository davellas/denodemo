import { serve } from "https://deno.land/std@0.115.1/http/server.ts";

console.log("http://localhost:8000/");
serve((_: any) => new Response("Hello World\n"), { addr: ":8000" });
