import express from "express";
import validate from "express-zod-safe";
import zod from "zod";

import { ProductRepository } from "../../repositories/ProductRepository";

export const sellRouter = express.Router();

const bodySchema = zod.object({
  quantity: zod.number().min(1),
});

const paramsSchema = zod.object({
  productId: zod.number({ coerce: true }).min(1),
});

const validation = validate({ body: bodySchema, params: paramsSchema });

sellRouter.post("/:productId/sell", validation, async (req, res, next) => {
  try {
    const data = await ProductRepository.sell(
      req.params.productId,
      req.body.quantity,
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
});
