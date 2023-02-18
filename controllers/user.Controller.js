import User from "../models/user.Schema.js"
import asyncHandler from "../services/asyncHandler.js";
import AppError from "../services/appError.js";
import EmailValidation from "../utils/emailValidation.js";
import PhoneNumberValidation from "../utils/phoneNumberValidation.js"


/******************************************************
 * @UPDATE_USER
 * @REQUEST_TYPE PUT
 * @Route       /:id
 * @Description User Controller for Updating Existing User
 * @Middleware auth.Middleware
 * @Parameters id
 * @Returns Success Message
 ******************************************************/

export const updateUser = asyncHandler(async (req, res, next) =>{

        //Grab ID from URL
        const { id : userId } = req.params;

        // Grab User Details From the Frontend
        let {name, email, phone, address } = req.body;
        
        // Validate whether Name is Empty or Not.
        if(!name){

            next(new AppError("User's Name is Required",400));

        };

        // Validate whether Email is Empty or Not.
        if(!email){

            next(new AppError("User's Email is Required",400));

        };

        // Checks Whether email is Valid or Not on the Bases Of Pattern or Whether Email is null
        if(!EmailValidation(email)){

            next(new AppError("Invalid Email",400));

        };

        // Validate whether Phone Number is Empty or Not , If Empty then Set to Undefined.
        if(!phone){

            phone = undefined;

        }
        else {

            // Checks Whether phone [Phone Number] is Valid or Not on the Bases Of Pattern or Whether phone [Phone Number] is null
            if(!PhoneNumberValidation(phone.primary) || !PhoneNumberValidation(phone.alternate)){

                next(new AppError("Invalid Phone Number",400));

            };

        };

        // Validate whether Address is Empty or Not , If Empty then Set to Undefined.
        if(!address){

            address = undefined;

        };

        // Updating an Existing Collection in the Database
        const updatedUser = await User.findByIdAndUpdate(

            userId,
            {
                name, 
                email, 
                phone, 
                address,
            },

            {
                new : true,
                runValidators : true,
            }
        );

        // In Case Updating an Existing Collection Fails then Throw Error
        if(!updatedUser){

            next(new AppError("User Not Found, User Cannot be Updated. ",404));

        };

        // Sending Response if Collection Name gets Updated Sucessfully in the Database
        return res.status(200).json({
            success : true,
            message : `User Updated Successfully with ID : ${userId}`,
        });

});








/******************************************************
 * @DELETE_USER
 * @REQUEST_TYPE DELETE
 * @Route       /:id
 * @Description User Controller for Deleting Existing User
 * @Middleware auth.Middleware, roles.Middleware
 * @Parameters id
 * @Returns Success Message
 ******************************************************/

export const deleteUser = asyncHandler(async (req, res, next) => {

    // Grab ID From URL
    const {id : userId} = req.params;

    // Delete an Existing User from the Database.
    const deletedUser = await User.findByIdAndDelete(userId);

    // In Case Deleting an Existing Collection Fails then Throw Error
    if(!deletedUser){

        next(new AppError("User Not Found, User Cannot be Deleted.",404));

    };

    // Sending Response if User gets Deleted Sucessfully from the Database
    return res.status(200).json({
        success : true,
        message : `User Deleted Successfully with ID : ${userId}`, 
    });

});







/******************************************************
 * @GET_USER_PROFILE
 * @REQUEST_TYPE GET
 * @Route       /profile
 * @Description Check for token and Populate req.user
 * @Middleware auth.Middleware
 * @Parameters None
 * @Returns Success Message, User Object
 ******************************************************/

export const getProfile = asyncHandler(async (req, res, next)=>{
    
    // Grab User from request
    const {user} = req;

    // If User Not Found Throw Error
    if(!user){

        next(new AppError("User Not Found.",404));

    };

     // Sending Response if User is Found
    return res.status(200).json({
        success : true,
        user,
    });

});


/******************************************************
 * @GET_USER_BY_ID
 * @REQUEST_TYPE GET
 * @Route       /:id
 * @Description 1.Controller used for Getting Single User Detail
 *              2. Moderator and Admin can get Single User detail
 * @Middleware auth.Middleware, roles.Middleware
 * @Parameters ID
 * @Returns Success Message, User Object
 ******************************************************/

export const getUserById = asyncHandler (async (req, res, next) => {

    // Get id from URL as userId
    const {id : userId} = req.params;

    const user = await User.findById(userId);

    // CHECK : When User Not Found throw Error
    if(!user) {

         next(new AppError("No User was Found.",404));

    };

    // When Successful Send Response
    return res.status(201).json({
        success : true,
        message : `User Found with ID : ${userId}`,
        user,
    });

});






/******************************************************
 * @GET_ALL_USER
 * @REQUEST_TYPE GET
 * @Route       /all
 * @Description 1.Controller used for Getting all Users Details
 *              2. Moderator and Admin can get all the Users
 * @Middleware auth.Middleware, roles.Middleware
 * @Parameters None
 * @Returns Success Message, User Object
 ******************************************************/

export const getAllUsers = asyncHandler (async (_req, res, next) => {

    // Find All Products From The Database
    const users = await User.find({});
    
    // CHECK : When User Not Found throw Error
    if(!users) {

         next(new AppError("No User was Found",404));

    };

    // When Successful Send Response
    return res.status(201).json({
        success : true,
        message : "Fetched All Users Details Successfully.",
        results: users.length,
        users,
    });

});




