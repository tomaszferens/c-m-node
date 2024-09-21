import { db, tables } from "../database/client";

import { ProductRepository } from "./ProductRepository";

interface ProductDto {
  id: number;
  quantity: number;
}

export class OrderRepository {
  static async placeOrder(customerId: number, products: ProductDto[]) {
    const transactionResponse = await db.transaction(async (trx) => {
      const [order] = await trx
        .insert(tables.order)
        .values({
          customerId,
          orderDate: new Date().toISOString(),
        })
        .returning();

      if (!order) {
        return trx.rollback();
      }

      const dataPromises = products.map(async (product) => {
        const orderItemPromise = trx
          .insert(tables.orderItem)
          .values({
            orderId: order.id,
            productId: product.id,
            quantity: product.quantity,
          })
          .returning();

        await ProductRepository.sell(product.id, product.quantity, trx);

        return {
          orderItem: await orderItemPromise,
        };
      });

      return {
        order,
        data: await Promise.all(dataPromises),
      };
    });

    return {
      order: transactionResponse.order,
      orderItems: transactionResponse.data.flatMap((item) => item.orderItem),
    };
  }
}
