import express from "express";

import { ProductRepository } from "../../repositories/ProductRepository";

export const listRouter = express.Router();

listRouter.get("/", async (_req, res, next) => {
  try {
    const data = await ProductRepository.list();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
