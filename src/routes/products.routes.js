import express from "express";
import { validateProduct } from "../middlewares/products.middleware.js";
import { createProductController, getProductsController, deleteProductController } from "../controllers/products.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const productsRouter = express.Router();

productsRouter.post("/", authenticate, authorize("ADMIN"), validateProduct, createProductController)

productsRouter.get("/", getProductsController)

productsRouter.delete("/:id", authenticate, authorize("ADMIN"), deleteProductController)


export default productsRouter;