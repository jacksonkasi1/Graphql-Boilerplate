import { eq, sql } from "drizzle-orm";
import { tbl_users } from "@/schema";
import { DrizzleD1Database } from "drizzle-orm/d1";

export const userService = {
  getUsers: (db: DrizzleD1Database, offset: number, limit: number) => {
    return db.select().from(tbl_users).limit(limit).offset(offset).all();
  },
  getUserById: (db: DrizzleD1Database, id: number) => {
    return db.select().from(tbl_users).where(eq(tbl_users.id, id)).get();
  },
  addUser: (
    db: DrizzleD1Database,
    input: { name: string; email: string; profile: string }
  ) => {
    const result = db
      .insert(tbl_users)
      .values({
        name: input.name,
        email: input.email,
        profile: input.profile,
        createdAt: sql`(strftime('%s', 'now'))`,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .returning()
      .get();
    return result;
  },
  updateUser: (
    db: DrizzleD1Database,
    id: number,
    input: { name: string; email: string; profile: string }
  ) => {
    const result = db
      .update(tbl_users)
      .set({
        name: input.name,
        email: input.email,
        profile: input.profile,
        updatedAt: sql`(strftime('%s', 'now'))`,
      })
      .where(eq(tbl_users.id, id))
      .returning()
      .get();
    return result;
  },
  deleteUser: (db: DrizzleD1Database, id: number) => {
    db.delete(tbl_users).where(eq(tbl_users.id, id)).execute();
    return true;
  },
};
