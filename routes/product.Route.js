import express from "express";
import { Authentication } from "../middlewares/auth.Middleware.js";
import { getAllProducts } from "../controllers/product.Controller.js";
const Router = express.Router();

/*****************************************************************
 * @PRODUCT_ROUTES
 * /                 @REQUEST_TYPE : GET (Get all Product)
 *****************************************************************/

Router.route("/").get(getAllProducts);
export default Router;
