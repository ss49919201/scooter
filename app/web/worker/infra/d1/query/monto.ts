import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { SearchMontos } from "../../../query/monto";
import { montoAddresses, montos } from "../schema";

export const getSearchMontos: (drizzle: DrizzleD1Database) => SearchMontos = (
  drizzle: DrizzleD1Database
) => {
  return async () => {
    const rows = await drizzle
      .select()
      .from(montos)
      .leftJoin(montoAddresses, eq(montos.id, montoAddresses.montoId))
      .all();

    return rows
      .reduce((acc, cur) => {
        const montoIndex = acc.findIndex(({ id }) => cur.montos.id === id);
        if (montoIndex >= 0) {
          acc[montoIndex].addresses.push(
            ...(cur.monto_addresses
              ? [
                  {
                    url: cur.monto_addresses.url,
                  },
                ]
              : [])
          );
        } else {
          acc.push({
            id: cur.montos.id,
            name: cur.montos.name,
            addresses: [
              ...(cur.monto_addresses
                ? [
                    {
                      url: cur.monto_addresses.url,
                    },
                  ]
                : []),
            ],
          });
        }
        return acc;
      }, [] as (Awaited<ReturnType<SearchMontos>>[number] & { id: string })[])
      .map((v) => ({
        name: v.name,
        addresses: v.addresses,
      }));
  };
};
