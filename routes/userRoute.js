import express from 'express'
import {getAllUser} from '../controllers/userController.js'
const Router = express.Router();

Router.get('/',getAllUser);

export default Router;