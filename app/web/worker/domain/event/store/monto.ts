import type { Effect } from "effect";
import type { MontoEvent } from "../monto";

export type StoreMontoEvent = (
  event: MontoEvent
) => Effect.Effect<never, Error>;
