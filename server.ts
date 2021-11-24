import { serve } from 'https://deno.land/std@0.115.1/http/server.ts';
import { streamingHandler } from './streaming.ts';

console.log('http://localhost:8000/');
serve(
  (request, connInfo) => {
    const url = new URL(request.url);

    if (url.pathname === '/streaming') {
      return streamingHandler(request, connInfo);
    }
    return new Response('Hello World\n');
  },
  { addr: ':8000' },
);
