import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDoc, doc} from '@firebase/firestore';

import { getCurrEmail } from './account';
import { db } from '../firebase/index.js';

const UserCurrencyContext = createContext();

export const UserCurrencyProvider = ({children}) =>{
    const[currency, setCurrency] = useState(0);

    //using the prevcurrency to make sure we are getting the latest value
    const updateCurrency = (value) =>{
        setCurrency(value);
        AsyncStorage.setItem("userCurrency", JSON.stringify(value));
        console.log("this is value: ", value);
        updateCurrencyDoc(value);
    }

    //updates the async storage when the value of currrency is changed
    useEffect(() => {
        console.log("Currency updated:", currency);
        // printValueInAsync();
    }, [currency]);

    //USED FOR TESTING
    // const printValueInAsync = async () =>{
    //     try{
    //         const curr = await AsyncStorage.getItem("userCurrency");
    //         console.log("this is the currency value in async: ", curr);
    //         const val = parseInt(JSON.parse(curr), 10); // Parse the JSON string before parsing it into an integer
    //         console.log("this is val: ", val);
    //     }catch(error){
    //         console.log("error: ", error)
    //     }
    // }

    const updateCurrencyDoc = async (value) =>{
        console.log("this is the value in update doc: ", value);
        try{
            console.log("currency amt being inserted into the doc: ", value);
            let currentUserEmail = await getCurrEmail();
            //creates a new doc for user currency and set it to 0
            console.log("editing user currency doc");
            await setDoc(doc(db, currentUserEmail, "User Currency Document"),{
                honeyCoins: value
            })
        }catch(error){
            console.log("error: ", error);
        }
    }

    return(
        <UserCurrencyContext.Provider value = {{currency, updateCurrency}}>
            {children}
        </UserCurrencyContext.Provider>
    )
}

export const getCurrency = () => useContext(UserCurrencyContext);