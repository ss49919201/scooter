import { Effect, Match } from "effect";
import { type DeepReadonly } from "ts-essentials";

export type MontoEvent = MontoRegisteredEvent | MontoRemovedEvent;

export type MontoRegisteredEvent = DeepReadonly<{
  readonly _tag: "MontoRegisteredEvent";
  name: string;
  address_urls: string[];
}>;

export type MontoRemovedEvent = DeepReadonly<{
  readonly _tag: "MontoRemovedEvent";
  reason: string;
}>;

export type CreateMonto = (
  name: string,
  address_urls: string[]
) => Effect.Effect<MontoRegisteredEvent, Error>;

type MontoStatus = {
  version: number;
  id: string;
  name: string;
  addressUrls: string[];
  removedReason: string | null;
};

export class Monto {
  #events: ReadonlyArray<DeepReadonly<MontoEvent>>;
  #status: DeepReadonly<MontoStatus>;

  private constructor(
    events: MontoEvent[] = [],
    status: MontoStatus = {
      version: 0,
      id: "",
      name: "",
      addressUrls: [],
      removedReason: null,
    }
  ) {
    this.#events = events;
    this.#status = status;
  }

  private append(event: MontoEvent) {
    this.#events = [...this.#events, event];
    this.apply(event);
  }

  private apply(event: MontoEvent) {
    Match.type<MontoEvent>().pipe(
      Match.tag("MontoRegisteredEvent", (event) => {
        this.#status = {
          version: 0,
          id: crypto.randomUUID(),
          name: event.name,
          addressUrls: event.address_urls,
          removedReason: null,
        };
      }),
      Match.tag("MontoRemovedEvent", (event) => {
        this.#status = {
          ...this.#status,
          removedReason: event.reason,
        };
      }),
      Match.exhaustive
    )(event);
  }

  public static replay(events: MontoEvent[]): Effect.Effect<Monto, Error> {
    if (events.length < 1)
      Effect.fail(new Error("events must be greater than 0"));

    const monto = new Monto();
    for (const event of events) {
      monto.append(event);
    }
    return Effect.succeed(monto);
  }
}
