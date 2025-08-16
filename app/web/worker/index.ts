import { Hono } from "hono";
import { newDrizzle } from "./infra/d1/client";
import { getSearchMontos } from "./infra/d1/query/monto";

const monto = new Hono<{ Bindings: Env }>()
  .get("/search", async (c) => {
    const searchMontos = getSearchMontos(newDrizzle(c.env.D1_SCOOTER));
    const result = await searchMontos();
    return c.json(result);
  })
  .post("/", async (c) => {
    // TODO: impl
    return c.json("not implemented");
  });

const app = new Hono().route("/montos", monto);

export type AppType = typeof app;

export default app;
