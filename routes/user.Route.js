import express from 'express'
import { signUp, signIn, signOut, forgotPassword, resetPassword, changePassword } from '../controllers/auth.Controller.js'
import { Authentication } from "../middlewares/auth.Middleware.js";
const Router = express.Router();

/**********************************************************
 * @AUTH_ROUTES
 * @Route_1   /signup                 @REQUEST_TYPE : POST
 * @Route_2   /signin                 @REQUEST_TYPE : POST
 * @Route_3   /signout                @REQUEST_TYPE : POST
 * @Route_4   /password/forgot        @REQUEST_TYPE : POST
 * @Route_5   /password/:resetToken   @REQUEST_TYPE : POST
 * @Route_6   /password/change        @REQUEST_TYPE : POST
 **********************************************************/

Router.post('/signup',signUp);
Router.post('/signin',signIn);
Router.post('/signout',signOut);
Router.post('/password/forgot',forgotPassword);
Router.get('/password/:resetToken',resetPassword);
Router.post('/password/change', Authentication ,changePassword);






export default Router;