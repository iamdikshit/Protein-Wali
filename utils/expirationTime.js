const ExpirationTime = (Days = 1, Hours = 1, Minutes = 1, Seconds = 1, milliSeconds = 0) => {
        // Expiration Time : ( Number of Days ) * ( Number of Hours / Default Value 24) * 
                                                         // ( Number of Minutes / Default Value 60 ) * 
                                                        // ( Number of Seconds / Default Value 60 ) * 
                                                       // ( Number of Milli-Seconds / Default Value 1000 )

        return ( Date.now * ( Days * Hours * Minutes * Seconds * milliSeconds ) );
};

export default ExpirationTime;