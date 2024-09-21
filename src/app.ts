import express, { type ErrorRequestHandler } from "express";

import { productsRouter } from "./routes/products/router";
import { ApiError } from "./utils/errors";

export const app = express();

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }

  next(err);
};

app.use(express.json());
app.use("/products", productsRouter);
app.use(errorHandler);
