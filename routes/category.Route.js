import express from "express";
import { Authentication } from "../middlewares/auth.Middleware.js";
import {
  getAllCategories,
  insertCategory,
} from "../controllers/category.Controller.js";
const Router = express.Router();

/*****************************************************************
 * @CATEGORY_ROUTES
 * /                 @REQUEST_TYPE : GET (Get all categories)
 * /                 @REQUEST_TYPE : POST (insert a category)
 *****************************************************************/

Router.route("/").get(getAllCategories).post(insertCategory);

export default Router;
