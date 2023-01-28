import express from 'express'
import { signUp, signIn, signOut, forgotPassword, resetPassword, changePassword } from '../controllers/auth.Controller.js'
const Router = express.Router();

/******************************************************
 * @AUTH_ROUTES
 * @Route_1   /signup
 * @Route_2   /signin
 * @Route_3   /signout
 * @Route_4   /password/forgot
 * @Route_5   /password/:resetToken
 * @Route_6   /password/change
 ******************************************************/

Router.get('/signup',signUp);
Router.get('/signin',signIn);
Router.get('/signout',signOut);
Router.get('/password/forgot',forgotPassword);
Router.get('/password/:resetToken',resetPassword);
Router.get('/password/change',changePassword);






export default Router;