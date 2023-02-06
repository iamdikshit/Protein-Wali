import mongoose from "mongoose";
import AuthRoles from "../utils/roles.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/env.config.js";




// User Schema
const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "Name is Required."],
            maxLength : [50, "Name must be less than 50 Characters."],
        },

        email : {
            type : String,
            required : [true, "Email is Required."],
            unique : true,
        },

        password : {
            type : String,
            required : [true, "Password is Required."],
            minLength : [8, "Password must be atleast 8 Characters."],
            select : false,
        },

        phone : {

             primary : {
                type : String,
                maxLength : [15, "Phone Number cannot Exceed 15 Digits." ],
             },

             alternate : {
                type : String,
                maxLength : [15, "Phone Number cannot Exceed 15 Digits." ],
             },
        },

        address : {

            uid : {
                type : String,
            },
            street : {
                type : String,
            },
            area : {
                type : String,
            },
            city : {
                type : String,
            },
            state : {
                type : String,
            },
            pincode : {
                type : Number,
                maxLength : [10, "Pincode cannot Exceed 10 Digits." ]
            },
            landmark : {
                type : String,
            },
            country : {
                type : String,
                default : "India",
            },
            
        },

        photo : {
            id : {
                type : String,
            },
            secureUrl : {
                type : String,
            },
        },

        isActive : {
            type : Boolean,
            default : true,
        },

        role : {
            type : String,
            enum : Object.values(AuthRoles),
            default : AuthRoles.USER,
        },

        otp : {
            type : String,
        },

        otpExpiry : {
            type : Date,
        },
        
        forgotPasswordToken : {
            type : String,
        },

        forgotPasswordExpiry : {
            type : Date,
        },

    },
    
    {
        timestamps : true,
    },
);


//Password Encryption in Schema

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))  return next();
    this.password = await bcrypt.hash(this.password,10); 
    next();
});



// Add More Features Directly into Schema

userSchema.methods = {

    // Compare Password

    comparePassword : async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword,this.password);
    },

    // Generate JWT TOKEN

    getJwtToken : function () {
        
        const jwtToken =  JWT.sign(
            {
                _id : this._id,
                role : this.role,
            },

            config.JWT_SECRET,

            {
                expiresIn : config.JWT_EXPIRY
            },
        );

        return jwtToken;
    },

    // Generate Forgot Password Token TOKEN

    generateForgotPasswordToken : function () {

        const forgotToken = crypto.randomBytes(20).toString("hex");

        // Step 1 - Save to Database

        // Encrypting Forgot Password Token Using SHA-3 Algorithm
        this.forgotPasswordToken = crypto.createHash("sha3-256").update(forgotToken).digest("hex");

        // Setting Forgot Password Expiry
        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

        // Step 2 - Return values to user

        return forgotToken;

    },

    // Generate OTP

    generateOtp : function () {

        const otp = `${Math.floor(Math.random()*1000000)}`;

        // Step 1 - Save to Database

        // Saving OTP in Database
        this.otp = otp

        // Setting OTP Expiry
        this.otpExpiry = Date.now() + 5 * 60 * 1000;

        // Step 2 - Return values to user

        return otp;
    },

};

export default mongoose.model("User",userSchema);