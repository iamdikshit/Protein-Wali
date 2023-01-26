import User from "../models/user.Schema.js"
import asyncHandler from "../services/asyncHandler.js";
import AppError from "../services/appError.js";
import EmailValidation from "../utils/emailValidation.js"
import config from "../config/env.config.js";
import crypto from "crypto";

//------------------------ API ROUTES ------------------------



/******************************************************
 * @SIGNUP
 * @REQUEST_TYPE POST
 * @Route http://localhost:4000/api/auth/signup
 * @Description User signUp Controller for creating new user
 * @Parameters name, email, password
 * @Returns User Object
 ******************************************************/

export const signUp = asyncHandler ( async (req, res) => {
    // Collect all Information
    const { name, email, password } = req.body;

    // Validate the Data if exists
    if(!name || !email || !password){
      throw new AppError("Please Fill All Fields",400);
    };

    // Check If User Exists
    const existingUser = await User.findOne({email});

    if(existingUser){
      throw new AppError("User Already Exists.",400);
    };

    // Checks Whether email is Valid or Not on the Bases Of Pattern or Whether Email is null
    if(!EmailValidation(email)){
      throw new AppError("Invalid Email",400);
    };

    // Creating New User Entry in the Database
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = user.getJwtToken();

    // Setting Password undefined so that it couldn't be passed through token
    user.password = undefined;

    //Cookie Helper Method for Creating Cookies and sending to Response
    //SET COOKIE & BEARER TOKEN VALUE AS "token"
    cookieHelper(token);

    // Sending Response if User Entry gets Sucessfully Created in the Database
    res.status(200).json({
      success : true,
      token,
    });

    // Unsetting existingUser, token, user, to Free Up Space from the Memory
    existingUser.remove();
    token.remove();
    user.remove();

});





/******************************************************
 * @SIGNIN
 * @REQUEST_TYPE POST
 * @Route http://localhost:4000/api/auth/signin
 * @Description User signIn Controller for signing in user
 * @Parameters email, password
 * @Returns User Object
 ******************************************************/

export const signIn = asyncHandler (async (req,res) => {
    //Collect Sign In Credentials
    const { email,password } = req.body;

    // Validatation Check if email and password or either of them missing
    if(!email || !password){
      throw new AppError("Credentials cannot be empty!",400);
    };

    if(!user){
      throw new AppError("Invalid Credentials!",400);
    };

    // Compare Password Using Predefined Method in Schema "comparePassword"
    const ispasswordMatched = await user.comparePassword(password);

    if(ispasswordMatched){
      // Token Generation using Predefined Method in User Schema
      const token = user.getJwtToken;

      // Setting Password undefined so that it couldn't be passed through token
      user.password = undefined;

      //Cookie Helper Method for Creating Cookies and sending to Response
        //SET COOKIE & BEARER TOKEN VALUE AS "token"
        cookieHelper(token);

      // Sending Response if User gets SignIn Successfully
      res.status(200).json({
        success : true,
        token,
      });

      // Unsetting isPasswordMatched, user to Free Up Space from the Memory

        isPasswordMatched.remove();
        user.remove();
    };

    throw new AppError("Invalid Credentials!",400);

});





/******************************************************
 * @SIGNOUT
 * @REQUEST_TYPE POST
 * @Route http://localhost:4000/api/auth/signout
 * @Description User signOut by clearing user cookies
 * @Parameters None
 * @Returns Success Message
 ******************************************************/

export const signOut = asyncHandler(async (_req,res) => {
    
    //Cookie Helper Method for Creating Cookies and sending to Response 
    //SET COOKIE & BEARER TOKEN TO NULL

    cookieHelper(null);

    // Sending Response if User SignOuts Successfully
    res.status(200).json({
      success : true,
      message : "Sign Out"
    });

});

