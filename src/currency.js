import React, { createContext, useContext, useState, useEffect } from 'react';

const UserCurrencyContext = createContext();

export const UserCurrencyProvider = ({children}) =>{
    const[currency, setCurrency] = useState(0);

    //using the prevcurrency to make sure we are getting the latest value
    const updateCurrency = (value) =>{
        setCurrency(value);
    }

    useEffect(() => {
        console.log("Currency updated:", currency);
    }, [currency]);

    return(
        <UserCurrencyContext.Provider value = {{currency, updateCurrency}}>
            {children}
        </UserCurrencyContext.Provider>
    )
}

export const getCurrency = () => useContext(UserCurrencyContext);