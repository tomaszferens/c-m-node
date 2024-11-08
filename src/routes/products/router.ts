import express from "express";

import { createRouter } from "./create";
import { listRouter } from "./list";
import { restockRouter } from "./restock";
import { sellRouter } from "./sell";

export const productsRouter = express.Router();

productsRouter.use(listRouter);
productsRouter.use(createRouter);
productsRouter.use(restockRouter);
productsRouter.use(sellRouter);
