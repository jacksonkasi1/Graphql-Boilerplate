import { Hono } from "hono";

// ** import middlewares
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { timing } from "hono/timing";

// ** import routes
import { publicRoute } from "@/routes/public";

const app = new Hono({ strict: false });

/**
 * Middlewares
 * https://hono.dev/middleware/builtin/cors
 */
app.use("*", logger());
app.use("*", timing());
app.use("*", cors());

/**
 * Ping Pong
 */
app.use("/", async (c) => c.text("Hello World"));
app.get("/ping", (c) => c.json({ ping: "pong" }, 200));


/**
 * Public Routes
 */
app.route("/api/public", publicRoute);

const port = 8787;
console.log(`Starting server on port http://127.0.0.1:${port} 🚀`);

export default app;
