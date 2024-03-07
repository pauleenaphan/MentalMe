import React, {useState, useEffect} from "react";
import { View, Text, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { collection, addDoc, doc, getDocs, setDoc } from "firebase/firestore"; 
import { db } from "../firebase/index.js";
import { getCurrEmail } from "./account.js";

// Note: There are three variables to consider with daily logins
// 1. "dailylogins" - State variable to display the daily logins
// 2. .getItem('DailyLogins') -  Uses AsyncStorage to retrieve the value of 'DailyLogins'
// 3. setDoc(doc(db, currentUser, "DailyLoginDoc")) - Firebase daily login value
export const ProgressTracker = () => {
    // This state allows us to display the daily logins.
    // Note: The code always tries to match dailyLogins with the .getItem('DailyLogins')
    // These two values should always try to be the same, but they are different variables.
    const [dailyLogins, setDailyLogins] = useState();
    const [consecutiveDLs, setConsecutiveDLs] = useState();
    const [longestStreak, setLongestStreak] = useState();

    // Always shows the daily login count on entering
    useFocusEffect(
        React.useCallback(() => {
            const StartUpDisplay = async () => {
            try {
                DailyIncrement();
                ConsecutiveDL();
            } catch (error) {
                console.log("Opening Error: " + error);
            };
            };
            StartUpDisplay();
        }, [])
    );

    // If the user has logged in today, just set the daily logins to already stored value
    // Else, increment by 1
    const DailyIncrement = async () => {
        try {
            setDailyLogins(parseInt(await AsyncStorage.getItem("DailyLogins"), 10));
            let dailyLogs = parseInt(await AsyncStorage.getItem("DailyLogins"), 10);
            let storedDate = await AsyncStorage.getItem("LatestDate");
            let currentDate = new Date().toLocaleDateString();
            console.log("Stored Date: " + storedDate)
            console.log("Current Date: " + currentDate)
            console.log("Initial Daily Logins: " + dailyLogs);
            if (dailyLogs === 0) { // if it's their first day, create a counter in firebase and increment by 1
                addPersonalCounter();
                console.log("Incrementing by 1 from 0...");
                let newDL = await Counter();
                setDailyLogins(newDL);
            } else if (dailyLogs === null) { // null check
                console.log(dailyLogs);
            } else if (storedDate === currentDate) { // if already incremented in the day, return the previous amount
                console.log("Daily done today already.");
                let DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
                setDailyLogins(DL);
                counterCheck();
                console.log(dailyLogs);
            } else { // new day incrementation
                console.log("Incrementing by 1...");
                await Counter();
                await AsyncStorage.setItem("LatestDate", currentDate);
                ConsecutiveDL();
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
            let lastLogin = await AsyncStorage.getItem("LatestDate");
            let consecutiveDLs = parseInt(await AsyncStorage.getItem("ConsecutiveDLs"), 10);
            let longestStreak = parseInt(await AsyncStorage.getItem("longestStreak"), 10);
            await AsyncStorage.setItem("ConsecutiveDLs", JSON.stringify(1))
            setConsecutiveDLs(1);
            if (longestStreak < 1 || longestStreak === null) {
                await AsyncStorage.setItem("longestStreak", JSON.stringify(1))
                setLongestStreak(1);
            } else {
                console.log("LS Already Made.");
            }
            await setDoc(doc(db, currentUser, "DailyLoginDoc"), {
                userDL: firstDL.toString(),
                userLastLogin: lastLogin.toString(),
                userConsecutiveLogins: consecutiveDLs.toString(),
                userLongestStreak: longestStreak.toString()
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
            // return newDL;
        } catch (error) {
            console.log("error " + error);
        };
    };   

    // Update Database with new Daily Logins and Time
    const counterCheck = async () => {
        try {
            const email = await getCurrEmail();
            let currentUser = email;
            let currentDL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
            let lastLogin = await AsyncStorage.getItem("LatestDate");
            await setDoc(doc(db, currentUser, "DailyLoginDoc"), {
                userDL: currentDL.toString(),
                userLastLogin: lastLogin.toString()
            });
            console.log("Current DL: " + currentDL)
        } catch(error) {
            console.log("Current DL Error: " + error);
        }
    }

    const ConsecutiveDL = async () => {
        try {
            const email = await getCurrEmail();
            let currentUser = email;
            let consDLs = parseInt(await AsyncStorage.getItem('ConsecutiveDLs'), 10);
            let dailyLogins = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
            // console.log("DailyLogin is currently: " + dailyLogins)
            // console.log("Consecutive Logins is currently: " + consDLs)
            let longestStreak = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
            if (dailyLogins >= consDLs) {
                await AsyncStorage.setItem('ConsecutiveDLs', JSON.stringify(dailyLogins))
                setConsecutiveDLs(dailyLogins);
                // console.log("New Consecutive Login2: " + consDLs)
                consDLs = parseInt(await AsyncStorage.getItem('ConsecutiveDLs'), 10);
                console.log("New Consecutive Login: " + consDLs)
            }
            if (consDLs >= longestStreak) { // if consecutive streak is equal or greater to the longest streak
                await AsyncStorage.setItem('longestStreak', JSON.stringify(consDLs))
                setLongestStreak(consDLs); // set them equal to each other
                console.log("The New longest streak: " + consDLs)
            }
            let latestDate = await AsyncStorage.getItem("LatestDate");
            let currentDate = new Date().toLocaleDateString();
            let nextDay = latestDate + 1;
            if (latestDate === nextDay) { // check if current date is date + 1
                setConsecutiveDLs(consDLs + 1); // if so, increase consecutive count by 1
                if (consDLs >= longestStreak) { // if consecutive streak is equal or greater to the longest streak
                    setLongestStreak(consDLs); // set them equal to each other
                    console.log("New longest streak: " + consDLs)
                }
            } else { // else if current date is same date as today do nothing to consecutive count
                console.log("Same day, no consecutive changes. Current Streak: " + longestStreak) // do nothing to consecutive count
                // await AsyncStorage.setItem('ConsecutiveDLs', JSON.stringify(1))
                // setConsecutiveDLs(1);  // reset consecutive logins to 1
            }
        } catch (error) {
            console.log("Consecutive Error: " + error);
        }
    };

    // Clear the daily logins for testing purposes
    const clearDailyLogins = async () => {
        try {
            await AsyncStorage.setItem('DailyLogins', JSON.stringify(0));
            setDailyLogins(0);
            setConsecutiveDLs(0);
            // setLongestStreak(0);
            console.log('DailyLogins cleared successfully.');
            // DailyIncrement();
        } catch (error) {
            console.log('Error clearing DailyLogins:', error);
        }
    };

    // Trick logic that it's a new day
    const TrickToNewDay = async () => {
        try { 
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            await AsyncStorage.setItem("LatestDate", yesterday.toLocaleDateString());
            console.log("Trick Date: " + yesterday);
        } catch(error) {
            console.log("Error with tricking: " + error);
        }
    }

    // Same as DailyIncrement except it includes the TrickToNewDay Function
    const TestDailyIncrement = async () => {
        try {
            setDailyLogins(parseInt(await AsyncStorage.getItem("DailyLogins"), 10));
            let dailyLogs = parseInt(await AsyncStorage.getItem("DailyLogins"), 10);
            TrickToNewDay();
            let storedDate = await AsyncStorage.getItem("LatestDate");
            let currentDate = new Date().toLocaleDateString();
            console.log("Stored Date: " + storedDate)
            console.log("Current Date: " + currentDate)
            console.log("Initial Daily Logins: " + dailyLogs);
            if (dailyLogs === 0) { // if it's their first day, create a counter in firebase and increment by 1
                addPersonalCounter();
                console.log("Incrementing by 1 from 0...");
                let newDL = await Counter();
                setDailyLogins(newDL);
            } else if (dailyLogs === null) { // null check
                console.log(dailyLogs);
            } else if (storedDate === currentDate) { // if already incremented in the day, return the previous amount
                console.log("Daily done today already.");
                let DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
                setDailyLogins(DL);
                counterCheck();
                console.log(dailyLogs);
            } else { // new day incrementation
                console.log("Incrementing by 1...");
                await Counter();
                await AsyncStorage.setItem("LatestDate", currentDate);
                ConsecutiveDL();
            };
        } catch (error) {
            console.log("DailyIncrement Error: " + error);
        };
    };

    return(
        <View style={styles.container}>
            <Text>Progress Tracker</Text>
            <Button title="Increment +1 (Testing Only)" onPress={TestDailyIncrement}></Button>
            <Button title="Remove All Count (Testing Only)" onPress={clearDailyLogins}></Button>
            {<Text>Daily Logins: {dailyLogins}</Text>}
            {<Text>Consecutive Logins: {consecutiveDLs}</Text>}
            {<Text>Longest Streak: {longestStreak}</Text>}
        </View>
    );
};