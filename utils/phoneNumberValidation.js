const PhoneNumberValidation = (phoneNumber) =>{
    //Checks Whether Phone Number is Valid or Not on the Bases Of Pattern Whether Phone Number is null
    
    const validPhoneNumberPattern = /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/;
        
    return (validPhoneNumberPattern.test(phoneNumber));
};

export default PhoneNumberValidation;