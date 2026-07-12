import express from "express";
import { validateProduct } from "../middlewares/products.middleware.js";
import { createProductController, getProductsController } from "../controllers/products.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const productsRouter = express.Router();

productsRouter.post("/", authenticate, authorize("ADMIN"), validateProduct, createProductController)

productsRouter.get("/", getProductsController)


export default productsRouter;