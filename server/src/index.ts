import { buildSchema } from "drizzle-graphql";
import { createYoga } from "graphql-yoga";
import { drizzle } from "drizzle-orm/d1";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const db = drizzle(env.DB);
    const { schema } = buildSchema(db);
    // Create a Yoga instance with a GraphQL schema.
    const yoga = createYoga({ schema});

    return yoga.fetch(request, env, ctx);
  },
};
