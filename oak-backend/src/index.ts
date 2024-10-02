import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createProduct, listProducts } from "./product";

const app = new Hono();

app.use(cors());

app.get("/products", async (c) => c.json(await listProducts()));

app.post("/products", async (c) => {
  const body = await c.req.json();
  return c.json(await createProduct(body));
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
