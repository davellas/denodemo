import { app } from "./oak/oakapp.ts";

await app.listen({ port: 8082 });
