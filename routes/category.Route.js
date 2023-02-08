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


/******************************************************************************************
 * @CATEGORY_ROUTES
 * 
 * @Route_1         /                      @REQUEST_TYPE : GET (GET ALL CATEGORY)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 * 
 * @Route_2         /                      @REQUEST_TYPE : POST (INSERT CATEGORY)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 * 
 * @Route_3         /:id                    @REQUEST_TYPE : PATCH (UPDATE CATEGORY)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 * 
 * @Route_4         /:id                   @REQUEST_TYPE : DELETE (DELETE CATEGORY)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 ******************************************************************************************/


Router.use(Authentication, PermittedRoles(Roles.MODERATOR, Roles.ADMIN));

Router.route("/").get(getAllCategories).post(insertCategory);

Router.route("/:id").patch(updateCategory).delete(deleteCategory);

export default Router;
