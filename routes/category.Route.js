import express from "express";
import { Authentication } from "../middlewares/auth.Middleware.js";
import {
  getAllCategories,
  insertCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.Controller.js";
import { PermittedRoles } from "../middlewares/roles.Middleware.js";
import Roles from "../utils/roles.js";
const Router = express.Router();

/*****************************************************************
 * @CATEGORY_ROUTES
 * /                 @REQUEST_TYPE : GET (Get all categories)
 * /                 @REQUEST_TYPE : POST (insert a category)
 * /id               @REQUEST_TYPE : PATCH (update category)
 * /id               @REQUEST_TYPE : DELETE (delete category)
 *****************************************************************/
// Router.use(Authentication, PermittedRoles(Roles.MODERATOR, Roles.ADMIN));
Router.route("/").get(getAllCategories).post(insertCategory);
Router.route("/:id").patch(updateCategory).delete(deleteCategory);

export default Router;
