import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

let _drizzle: DrizzleD1Database;

export const newDrizzle = (d1: D1Database) => {
  if (!_drizzle) {
    _drizzle = drizzle(d1);
  }
  return _drizzle;
};
