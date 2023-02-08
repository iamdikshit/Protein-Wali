import express from 'express'
import { signUp, signIn, signOut, forgotPassword, resetPassword, changePassword, twoFactorOtp, resendOtp } from "../controllers/auth.Controller.js";
import { updateUser, deleteUser, getProfile, getUserById, getAllUsers } from "../controllers/user.Controller.js";
import { Authentication } from "../middlewares/auth.Middleware.js";
import { PermittedRoles } from "../middlewares/roles.Middleware.js";
import Roles from "../utils/roles.js";



const Router = express.Router();

/*****************************************************************
 * @AUTH_ROUTES
 * 
 * @Route_1   /signup                 @REQUEST_TYPE : POST

 * @Route_2   /signin                 @REQUEST_TYPE : POST

 * @Route_2   /twofactor/otp          @REQUEST_TYPE : POST
 *                                    @MIDDLEWARE   : Authentication

 * @Route_2   /resend/otp             @REQUEST_TYPE : PATCH
 *                                    @MIDDLEWARE   : Authentication

 * @Route_3   /signout                @REQUEST_TYPE : POST

 * @Route_4   /password/forgot        @REQUEST_TYPE : POST

 * @Route_5   /password/reset/:token  @REQUEST_TYPE : PATCH

 * @Route_6   /password/change        @REQUEST_TYPE : PATCH
 *                                    @MIDDLEWARE   : Authentication
 *****************************************************************/

  Router.post("/signup", signUp);
  Router.post("/signin", signIn);
  Router.post("/twofactor/otp", Authentication ,twoFactorOtp);
  Router.patch("/resend/otp", Authentication ,resendOtp);
  Router.post("/signout", signOut);
  Router.post("/password/forgot", forgotPassword);
  Router.patch("/password/reset/:token", resetPassword);
  Router.patch("/password/change", Authentication ,changePassword);








/******************************************************************************************
 * @USER_ROUTES
 * 
 * @Route_1         /:id                   @REQUEST_TYPE : PUT (UPDATE USER)
 *                                         @MIDDLEWARE   : Authentication
 * 
 * @Route_2         /:id                   @REQUEST_TYPE : DELETE (DELETE USER)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(ADMIN)
 * 
 * @Route_3         /profile               @REQUEST_TYPE : GET (GET USER PROFILE)
 *                                         @MIDDLEWARE   : Authentication
 * 
 * @Route_4         /all                   @REQUEST_TYPE : GET (GET ALL USER)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 * 
 * @Route_5        /:id                    @REQUEST_TYPE : GET (GET USER BY ID)
 *                                         @MIDDLEWARE   : Authentication, PermittedRoles(MODERATOR, ADMIN)
 ******************************************************************************************/

Router.route("/:id")

.put(Authentication, updateUser)

.get(Authentication, PermittedRoles(Roles.MODERATOR, Roles.ADMIN), getUserById)

.delete(Authentication, PermittedRoles(Roles.ADMIN), deleteUser);

Router.get("/profile", Authentication, getProfile);

Router.get("/all", Authentication, PermittedRoles(Roles.MODERATOR, Roles.ADMIN), getAllUsers);



export default Router;