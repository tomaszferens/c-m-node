import express from "express";

import { ordersRouter } from "./routes/orders/router";
import { productsRouter } from "./routes/products/router";
import { globalRequestErrorHandler } from "./utils/globalRequestErrorHandler";

export const app = express();
const apiRouter = express.Router();

app.use(express.json());

apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);

app.use("/api", apiRouter);
app.use(globalRequestErrorHandler);
