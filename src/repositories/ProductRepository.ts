import { eq, sql } from "drizzle-orm";

import { db, tables } from "../database/client";
import { ApiError } from "../utils/errors";

export class ProductRepository {
  static list() {
    return db.query.product.findMany();
  }

  static create(productDto: typeof tables.product.$inferInsert) {
    return db.insert(tables.product).values(productDto).returning();
  }

  static async restock(id: number, quantity: number) {
    const currentStock = await db.query.product.findFirst({
      where: eq(tables.product.id, id),
    });

    if (!currentStock) {
      throw new ApiError("Product not found", 404);
    }

    return db
      .update(tables.product)
      .set({ stock: sql`${tables.product.stock} + ${quantity}` })
      .where(eq(tables.product.id, id))
      .returning();
  }

  static async sell(id: number, quantity: number) {
    const currentStock = await db.query.product.findFirst({
      where: eq(tables.product.id, id),
    });

    if (!currentStock) {
      throw new ApiError("Product not found", 404);
    }

    const newStockLevel = currentStock.stock - quantity;

    if (newStockLevel < 0) {
      throw new ApiError("Insufficient stock", 400);
    }

    return db
      .update(tables.product)
      .set({ stock: sql`${tables.product.stock} - ${quantity}` })
      .where(eq(tables.product.id, id))
      .returning();
  }
}
