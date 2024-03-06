import React, {useState, useEffect} from "react";
import { View, Text, Button } from "react-native";

import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { collection, addDoc, doc, getDocs, setDoc } from "firebase/firestore"; 
import { db } from "../firebase/index.js";
import { getCurrEmail } from "./account.js";

export const ProgressTracker = () => {
    // This state allows us to display the daily logins.
    // Note: The code always tries to match dailyLogins with the .getItem('DailyLogins')
    // These two values should always try to be the same, but they are different variables.
    const [dailyLogins, setDailyLogins] = useState(null);

    // Attempt at fixing the no-show value upon opening
    // useEffect(() => {
    //     DailyIncrement();
    //     setDailyLogins(parseInt(AsyncStorage.getItem('DailyLogins'), 10));
    // });

    // If the user has logged in today, just set the daily logins to already stored value
    // Else, increment by 1
    const DailyIncrement = async () => {
        try {
            const storedDate = await AsyncStorage.getItem("LastestDate");
            const currentDate = new Date().toLocaleDateString();

            if (dailyLogins === 0) {
                addPersonalCounter();
                console.log("Incrementing by 1 from 0...");
                let newDL = await Counter();
                setDailyLogins(newDL);
            } else if (dailyLogins === null) {
                addPersonalCounter();
                console.log("Incrementing by 1 from null...");
                let newDL = 0;
                setDailyLogins(newDL);
            }

            if (storedDate === currentDate) {
                console.log("Daily done today already.");
                let DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
                setDailyLogins(DL);
                counterCheck();
            } else {
                console.log("Incrementing by 1...");
                let newDL = await Counter();
                setDailyLogins(newDL);
            };
        } catch (error) {
            console.log("DailyIncrement Error: " + error);
        };
    };

    // Creates the document in firebase for daily logins
    const addPersonalCounter = async () => {
        try {
            const email = await getCurrEmail();
            let currentUser = email;
            let firstDL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
            let lastLogin = await AsyncStorage.getItem("LastestDate");
            const entry = await setDoc(doc(db, currentUser, "DailyLoginDoc"), {
                userDL: firstDL.toString(),
                userLastLogin: lastLogin.toString()
            });
            console.log("New User DL Created: " + currentUser);
        } catch(error) {
            console.log("New User DL Error: " + error);
        };
    };

    // Function to increment "DailyLogins"
    const Counter = async () => {
        try {
            // Retrieve the item from the AsyncStorage
            let DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);

            // Check the type (testing purposes)
            let type = typeof DL;
            console.log('Type of value:', type);
            console.log("Old DL: " + DL);

            // New variable to hold the incremented value, 
            // then input this incremented value into AsyncStorage.
            let newDL = DL + 1;
            await AsyncStorage.setItem('DailyLogins', JSON.stringify(newDL));
            console.log("New DL: " + newDL);

            // Always remember to sync the AsyncStorage with the display value
            setDailyLogins(newDL);
            return newDL;
        } catch (error) {
            console.log("error " + error);
        };
    };   

    // check with the current database document
    const counterCheck = async () => {
        try {
            const email = await getCurrEmail();
            let currentUser = email;
            let currentDL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
            const entryHolder = await setDoc(doc(db, currentUser, "DailyLoginDoc"), {
                userDL: currentDL.toString()
            });
            console.log("Current DL: " + currentDL)
        } catch(error) {
            console.log("Current DL Error: " + error);
        }
    }

    // Clear the daily logins for testing purposes
    const clearDailyLogins = async () => {
        try {
            await AsyncStorage.setItem('DailyLogins', JSON.stringify(0));
            setDailyLogins(0);
            console.log('DailyLogins cleared successfully.');
            DailyIncrement();
        } catch (error) {
            console.log('Error clearing DailyLogins:', error);
        }
    };

    return(
        <View style={styles.container}>
            <Text>Progress Tracker</Text>
            <Button title="Increment +1 (Testing Only)" onPress={DailyIncrement}></Button>
            <Button title="Remove All Count (Testing Only)" onPress={clearDailyLogins}></Button>
            {<Text>Daily Logins: {dailyLogins}</Text>}
        </View>
    );
};