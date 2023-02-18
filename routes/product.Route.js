import express from "express";
import { Authentication } from "../middlewares/auth.Middleware.js";
import { insertProduct } from "../controllers/product.controller.js";

const Router = express.Router();

/******************************************************************************************
 * @PRODUCT_ROUTES
 *
 * @Route_1         /:id                   @REQUEST_TYPE : PUT (UPDATE PRODUCT)
 *                                         @MIDDLEWARE   : Authentication
 *
 * @Route_2         /:id                   @REQUEST_TYPE : DELETE (DELETE PRODUCT)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 *
 * @Route_4         /all                   @REQUEST_TYPE : GET (GET ALL PRODUCTS)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 *
 * @Route_5        /:id                    @REQUEST_TYPE : GET (GET PRODUCTS BY ID)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 ******************************************************************************************/

Router.post("/insert/product", insertProduct);

export default Router;
