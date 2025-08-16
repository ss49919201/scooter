import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const montos = sqliteTable("montos", {
  id: text().notNull().primaryKey(),
  name: text().notNull(),
});

export const montoAddresses = sqliteTable("monto_addresses", {
  id: text().notNull().primaryKey(),
  montoId: text("monto_id")
    .notNull()
    .references(() => montos.id),
  url: text().notNull(),
});

export const montoEvents = sqliteTable(
  "monto_events",
  {
    id: text().notNull(),
    version: integer().notNull(),
    data: text().notNull(),
  },
  (montoEvent) => ({
    compositePk: primaryKey({ columns: [montoEvent.id, montoEvent.version] }),
  })
);
