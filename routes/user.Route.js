import express from 'express'
import { signUp, signIn, signOut, forgotPassword, resetPassword, changePassword } from "../controllers/auth.Controller.js";
import { updateUser, deleteUser, getProfile, getUserById, getAllUsers } from "../controllers/user.Controller.js";
import { Authentication } from "../middlewares/auth.Middleware.js";
import { PermittedRoles } from "../middlewares/roles.Middleware.js";
import Roles from "../utils/roles.js";



const Router = express.Router();

/*****************************************************************
 * @AUTH_ROUTES
 * @Route_1   /signup                 @REQUEST_TYPE : POST
 * @Route_2   /signin                 @REQUEST_TYPE : POST
 * @Route_3   /signout                @REQUEST_TYPE : POST
 * @Route_4   /password/forgot        @REQUEST_TYPE : POST
 * @Route_5   /password/:resetToken   @REQUEST_TYPE : POST
 * @Route_6   /password/change        @REQUEST_TYPE : POST
 *                                    @MIDDLEWARE   : Authentication
 *****************************************************************/

  Router.post("/signup", signUp);
  Router.post("/signin", signIn);
  Router.post("/signout", signOut);
  Router.post("/password/forgot", forgotPassword);
  Router.get("/password/:resetToken", resetPassword);
  Router.post("/password/change", Authentication ,changePassword);








/******************************************************************************************
 * @USER_ROUTES
 * @Route_1         /update/:id            @REQUEST_TYPE : PUT
 *                                         @MIDDLEWARE   : Authentication
 * 
 * @Route_2         /delete/:id            @REQUEST_TYPE : DELETE
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(ADMIN)
 * 
 * @Route_3         /profile               @REQUEST_TYPE : POST
 *                                         @MIDDLEWARE   : Authentication
 * 
 * @Route_4         /:id                   @REQUEST_TYPE : POST
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 * 
 * @Route_5        /all                    @REQUEST_TYPE : POST
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 ******************************************************************************************/

  Router.put("/update/:id", Authentication, updateUser);
  Router.delete("/delete/:id", Authentication, PermittedRoles(Roles.ADMIN), deleteUser);
  Router.get("/profile", Authentication, getProfile);
  Router.get("/:id", Authentication, PermittedRoles(Roles.MODERATOR, Roles.ADMIN), getUserById);
  Router.get("/all", Authentication, PermittedRoles(Roles.MODERATOR, Roles.ADMIN), getAllUsers);



export default Router;