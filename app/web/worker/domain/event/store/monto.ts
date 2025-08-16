import type { Effect } from "effect";
import type { Monto, MontoEvent } from "../monto";

export type StoreMonto = (event: MontoEvent) => Effect.Effect<void, Error>;

export type LoadMonto = (id: string) => Effect.Effect<Monto, Error>;
