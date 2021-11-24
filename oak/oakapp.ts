import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { streamingRouter } from "../streaming.ts";
import { Game } from "../server/game.ts";

import { oakCors } from "https://deno.land/x/cors/mod.ts";

const books = new Map<string, any>();
const game = new Game();

books.set('1', {
  id: '1',
  title: 'The Hound of the Baskervilles',
  author: 'Conan Doyle, Arthur',
});

const router = new Router();
router
  .get('/', (context) => {
    context.response.body = 'Hello world!';
  })
  .get('/book', (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/move/:id/:cell", (context) => {
    const id = parseInt(context.params.id, 10);
    const cell = parseInt(context.params.cell, 10);
    const newState = game.makeMove(id,cell);
    context.response.headers.append("content-type", "application/json");
    context.response.body = newState;
  })
  .get("/reset", context => {
    const newState = game.resetGame();
    context.response.headers.append("content-type", "application/json");
    context.response.body = newState;
  })
  .get("/join", context => {
    context.response.body = game.join();
  })
  .get("/book/:id", (context) => {
    if (books.has(context?.params?.id)) {
      context.response.body = books.get(context.params.id);
    }
  })
  .get('/streaming', streamingRouter.routes())

export const app = new Application();
app.use(
  oakCors({
    origin: "http://localhost:3000"
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());
