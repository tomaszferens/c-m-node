import { customType } from "drizzle-orm/sqlite-core";

export const integerCheck = customType<{
  data: number;
  notNull: true;
  config: { condition: string };
}>({
  dataType(config) {
    const condition = config?.condition || "";
    return `INTEGER NOT NULL CHECK(${condition})`;
  },
});

export const textLength = customType<{
  data: string;
  length: number;
  notNull: true;
  config: { name: string; length: number };
}>({
  dataType(config) {
    const name = config?.name || "";
    const length = config?.length || 0;
    return `TEXT NOT NULL CHECK(LENGTH(${name}) <= ${length})`;
  },
});
