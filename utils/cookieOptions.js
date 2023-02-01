// Expiration Time : ( Number of Days ) * ( Number of Hours / Default Value 24) * 
                                                         // ( Number of Minutes / Default Value 60 ) * 
                                                        // ( Number of Seconds / Default Value 60 ) * 
                                                       // ( Number of Milli-Seconds / Default Value 1000 )


//Cookie Options
const CookieOptions = () => {

    return( {   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
                secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });
};


export default CookieOptions;