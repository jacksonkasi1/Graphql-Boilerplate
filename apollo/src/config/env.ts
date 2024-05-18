import { Context } from "hono";

export type Env = {
  DB: D1Database;
};

export type AppContext = Context<{ Bindings: Env }>;
