import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { integerCheck, textLength } from "./customTypes";

export const product = sqliteTable("product", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: textLength("name", {
    name: "name",
    length: 50,
  }),
  description: textLength("description", {
    name: "description",
    length: 512,
  }),
  price: integerCheck("price", { condition: "price > 0" }),
  stock: integerCheck("stock", { condition: "stock >= 0" }),
});

export const customer = sqliteTable("customer", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: textLength("name", {
    name: "name",
    length: 128,
  }),
  email: text("email").notNull().unique(),
});

export const order = sqliteTable("order", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  customerId: integer("customerId", { mode: "number" })
    .notNull()
    .references(() => customer.id),
  orderDate: text("date").default(sql`(CURRENT_TIME)`),
});

export const orderItem = sqliteTable("orderItem", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  orderId: integer("orderId", { mode: "number" })
    .notNull()
    .references(() => order.id),
  productId: integer("productId", { mode: "number" })
    .notNull()
    .references(() => product.id),
  quantity: integerCheck("quantity", { condition: "quantity > 0" }),
});
