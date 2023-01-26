import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });


const config = {

    //ENVIRONMENT
    NODE_ENV : process.env.NODE_ENV,
    PORT : process.env.PORT || 4000, 

    // MONGO DB UTILITIES
    MONGODB_URL : process.env.MONGODB_URL,

    // JSON WEB TOKEN UTILITIES
    JWT_SECRET  : process.env.JWT_SECRET,
    JWT_EXPIRY : process.env.JWT_EXPIRY || "30d",

    // SMPT MAIL UTILITIES
    SMTP_MAIL_HOST : process.env.SMTP_MAIL_HOST,
    SMTP_MAIL_PORT : process.env.SMTP_MAIL_PORT,
    SMTP_MAIL_USERNAME : process.env.SMTP_MAIL_USERNAME,
    SMTP_MAIL_PASSWORD : process.env.SMTP_MAIL_PASSWORD,
    SMTP_MAIL_SENDER_NAME : process.env.SMTP_MAIL_SENDER_NAME,
    SMTP_MAIL_SENDER_EMAIL : process.env.SMTP_MAIL_SENDER_EMAIL,
    SMTP_MAIL_RESET_PASSWORD_SUBJECT : process.env.SMTP_MAIL_RESET_PASSWORD_SUBJECT,
};

export default config;