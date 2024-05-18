import { ApolloServer } from "@apollo/server";
import { startServerAndCreateCloudflareWorkersHandler } from "@as-integrations/cloudflare-workers";

import { schema } from "./graphql/schema";
import { drizzle } from "drizzle-orm/d1";
import { Env } from "./config/env";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

export interface Context {
  env: Env;
  request: Request;
}

const server = new ApolloServer<Context>({
  schema, //  typeDefs & resolvers
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

export default {
  fetch: startServerAndCreateCloudflareWorkersHandler<Env, Context>(server, {
    context: async ({ request, env, ctx }) => {
      const db = drizzle(env.DB);
      return { db, request, env, ctx };
    },
  }),
};
