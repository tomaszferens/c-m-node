import { db } from "../client";
import * as tables from "../schema";

import { data } from "./data";

async function main() {
  const customerPromises = data.customers.map((customer) => {
    return db
      .insert(tables.customer)
      .values({
        name: customer.name,
        email: customer.email,
      })
      .returning();
  });

  const customers = await Promise.all(customerPromises);

  const productPromises = data.products.map((product) => {
    return db
      .insert(tables.product)
      .values({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      })
      .returning();
  });

  const products = await Promise.all(productPromises);

  const orderPromises = data.orders.map((order) => {
    return db
      .insert(tables.order)
      .values({
        customerId: order.customerId,
        orderDate: order.date,
      })
      .returning();
  });

  const orders = await Promise.all(orderPromises);

  const orderItemPromises = data.orderItems.map((orderItem) => {
    return db
      .insert(tables.orderItem)
      .values({
        orderId: orderItem.orderId,
        productId: orderItem.productId,
        quantity: orderItem.quantity,
      })
      .returning();
  });

  const orderItems = await Promise.all(orderItemPromises);

  return {
    customers,
    products,
    orders,
    orderItems,
  };
}

main().then(console.log);
