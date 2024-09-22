import express from "express";
import validate from "express-zod-safe";
import zod from "zod";

import { ProductRepository } from "../../repositories/ProductRepository";

export const createRouter = express.Router();

const bodySchema = zod.object({
  name: zod.string().min(1).max(50),
  description: zod.string().min(1).max(512),
  price: zod.number().gt(0),
  stock: zod.number().min(0),
});

const validation = validate({ body: bodySchema });

createRouter.post("/", validation, async (req, res, next) => {
  try {
    const data = await ProductRepository.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});
