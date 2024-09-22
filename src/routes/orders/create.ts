import express from "express";
import validate from "express-zod-safe";
import zod from "zod";

import { CustomerRepository } from "../../repositories/CustomerRepository";
import { OrderRepository } from "../../repositories/OrderRepository";
import { ProductRepository } from "../../repositories/ProductRepository";
import { ApiError } from "../../utils/errors";

export const createRouter = express.Router();

const bodySchema = zod.object({
  customerId: zod.number().min(1),
  products: zod
    .array(
      zod.object({
        id: zod.number().min(1),
        quantity: zod.number().min(1),
      }),
    )
    .min(1)
    .refine(
      (products) => {
        const ids = products.map((product) => product.id);
        return new Set(ids).size === ids.length;
      },
      {
        message: "Products must have unique ids",
      },
    ),
});

const validation = validate({ body: bodySchema });

createRouter.post("/", validation, async (req, res, next) => {
  try {
    const customer = await CustomerRepository.findById(req.body.customerId);
    if (!customer) {
      throw new ApiError("Customer not found", 404);
    }

    const products = await Promise.all(
      req.body.products.map(async (product) => {
        const productData = await ProductRepository.findById(product.id);
        if (!productData) {
          throw new ApiError(`Product not found: ${product.id}`, 404);
        }
        return {
          ...productData,
          quantity: product.quantity,
        };
      }),
    );

    const outOfStockProducts = products.filter(
      (product) => product.stock < product.quantity,
    );

    if (outOfStockProducts.length > 0) {
      throw new ApiError(
        `Out of stock products: ${outOfStockProducts
          .map((product) => `(id=${product.id})`)
          .join(", ")}`,
        400,
      );
    }

    try {
      const data = await OrderRepository.placeOrder(
        req.body.customerId,
        req.body.products,
      );
      return res.status(201).json(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      throw new ApiError(`Failed to place an order: ${message}`, 500);
    }
  } catch (error) {
    next(error);
  }
});
