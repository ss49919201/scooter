import { Effect } from "effect";
import { type DeepReadonly } from "ts-essentials";

export type MontoEvent = MontoCreatedEvent;

export type MontoCreatedEvent = DeepReadonly<{
  type: "MontoCreatedEvent";
  name: string;
  address_urls: string[];
}>;

export type CreateMonto = (
  name: string,
  address_urls: string[]
) => Effect.Effect<MontoCreatedEvent, Error>;

export const createMonto: CreateMonto = (name, address_urls) => {
  const validName = name.length > 0 && name.length < 20;
  const validAddressUrls =
    address_urls.length < 10 && address_urls.every((v) => v.length > 0); // TODO: validate url format.

  if (!validName) {
    return Effect.fail(new Error("invalid name"));
  }

  if (!validAddressUrls) {
    return Effect.fail(new Error("invalid address urls"));
  }

  return Effect.succeed({
    type: "MontoCreatedEvent",
    name,
    address_urls,
  });
};
