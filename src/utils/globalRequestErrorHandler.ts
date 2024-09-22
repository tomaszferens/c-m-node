import type { ErrorRequestHandler } from "express";

import { ApiError } from "./errors";

export const globalRequestErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }

  next(err);
};
