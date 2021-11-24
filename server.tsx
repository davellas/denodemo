import React from 'https://jspm.dev/react';

import pogo from 'https://deno.land/x/pogo/main.ts';
import { streamingHandler } from "./streaming.ts";

const server = pogo.server({ port : 8000 });

server.router.get('/', () => {
    return 'Hello, world!';
});

server.router.get('/react', () => {
    return <div>hello react</div>;
});

// server.router.get('/streaming', streamingHandler);

console.log('Strarting server...');


await server.start();

console.log('Server is lestning on ');
