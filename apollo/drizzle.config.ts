import type { Config } from 'drizzle-kit';

export default {
  schema: "./src/schema/index.ts",
  out: "drizzle",
  dialect: "sqlite",
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath: 'wrangler.toml',
    dbName: 'graphql-db-2' // enter your db name here
  },
} satisfies Config;
