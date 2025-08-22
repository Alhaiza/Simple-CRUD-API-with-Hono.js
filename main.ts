import { Hono } from "./deps.ts";
import { Client } from "./deps.ts";
import productRoutes from "./routes/productRoute.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono From Deno!");
});

app.route("/products", productRoutes);

Deno.serve(app.fetch);
