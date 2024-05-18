// ** import hono
import { Hono } from "hono";
import { cors } from "hono/cors";
import { timing } from "hono/timing";
import { HTTPException } from "hono/http-exception";

// ** import drizzle & graphql
import { buildSchema } from "drizzle-graphql";
import { createYoga } from "graphql-yoga";
import { drizzle } from "drizzle-orm/d1";

// ** import schema
import * as dbSchema from "@/schema";

// ** import config
import { Env } from "@/config/env";

const app = new Hono<{ Bindings: Env }>({ strict: false });

app.use("*", timing());
app.use(cors());

app.use("/graphql/*", async (c) => {
  const db = drizzle({ schema: dbSchema });
  const { schema } = buildSchema(db);

  const yoga = createYoga({
    schema,
    context: c,
    multipart: true,
    cors: true,
    logging: "debug"
  });

  return yoga.handle(c.req.raw);
});

app.notFound((c) => c.text("😢 Not Found", 404));

app.onError((err: any, c) => {
  console.log("calling on error");

  if (err instanceof HTTPException) {
    return c.json(
      {
        status: err.status,
        success: false,
        message: err.message ?? "unknown error",
      },
      {
        status: err.status,
      }
    );
  } else {
    return c.json(
      {
        status: 500,
        success: false,
        message: err.message ?? "unknown error",
      },
      {
        status: 500,
      }
    );
  }
});

export default app;
