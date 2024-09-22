import express from "express";

import { createRouter } from "./create";

export const ordersRouter = express.Router();
ordersRouter.use(createRouter);
