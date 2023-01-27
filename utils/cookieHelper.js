import ExpirationTime from "./expirationTime.js"

const CookieHelper = (token) =>{

    const expiration = {
        Days : 3,
        Hours : 24,
        Minutes : 60,
        Seconds : 60,
        milliSeconds : 1000,
    };

    const timeOfExpiry = ExpirationTime(expiration.Days, expiration.Hours, expiration.Minutes, expiration.Seconds, expiration.milliSeconds);

    //Cookie Options
    const CookieOptions = () => {

        return( {   expires: new Date(timeOfExpiry),
                    httpOnly:true,
        });
    };

    // Creating Cookies Along with Some Data
    res.cookie("token", token, CookieOptions);

    // Sending Bearer Token
    res.setHeader("Authorization", "Bearer "+ token);
};

export default CookieHelper;