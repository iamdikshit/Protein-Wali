const EmailValidation = (email) =>{
    //Checks Whether email is Valid or Not on the Bases Of Pattern Whether Email is null
    
    const validEmailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
    return (validEmailPattern.test(email));
};

export default EmailValidation;