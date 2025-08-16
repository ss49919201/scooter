import { Hono } from "hono";
import { searchMontos } from "./query/monto";

type Bindings = {
  KV_SCOOTER: KVNamespace;
};

const monto = new Hono<{ Bindings: Bindings }>()
  .get("/search", async (c) => {
    const result = await searchMontos();
    return c.json(result);
  })
  .post("/", async (c) => {
    // TODO: impl
    return c.json("not implemented");
  });

const app = new Hono<{ Bindings: Bindings }>().route("/montos", monto);

export type AppType = typeof app;

export default app;
