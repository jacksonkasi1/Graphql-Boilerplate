import { Hono } from "hono";
import { userApi } from "./user";

export const publicRoute = new Hono();

publicRoute.route("/users", userApi);
