import { Hono } from "hono";

// ** import drizzle
import { drizzle } from "drizzle-orm/d1";

// ** import query builder
import { and, between, eq, sql } from "drizzle-orm";

// ** import db schema
import { tbl_users } from "@/schema";

import { Env } from "@/config/env";

export const userApi = new Hono<{ Bindings: Env }>({ strict: false });

userApi.get("/", async (c) => {
  try {
    const db = drizzle(c.env.DB);

    const result = await db.select().from(tbl_users).prepare().all()
    return c.json(result);
  } catch (error) {
    console.error(`Error in - userAPI POST / : ${error}`);

    return c.json(
      { success: false, message: "Error processing usage metrics", error },
      500
    );
  }
});
