import React, {useState, useEffect} from "react";
import { View, Text, Button, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { styles, progressPage } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { collection, addDoc, doc, getDocs, setDoc } from "firebase/firestore"; 
import { db } from "../firebase/index.js";
import { getCurrEmail } from "./account.js";

import { useDailyLogins } from './progress_files/dailyLoginsContext.js';
import { useConsecutiveLogins } from './progress_files/consecutiveLoginsContext.js';
import { useLongestStreak } from "./progress_files/longestStreakContext.js";
import { useSundayLogin } from './progress_files/sundayLoginContext.js';
import { useMondayLogin } from './progress_files/mondayLoginContext.js';
import { useTuesdayLogin } from './progress_files/tuesdayLoginContext.js';
import { useWednesdayLogin } from './progress_files/wednesdayLoginContext.js';
import { useThursdayLogin } from './progress_files/thursdayLoginContext.js';
import { useFridayLogin } from './progress_files/fridayLoginContext.js';
import { useSaturdayLogin } from './progress_files/saturdayLoginContext.js';

// Note: There are three variables to consider with daily logins
// 1. "dailylogins" - State variable to display the daily logins
// 2. .getItem('DailyLogins') -  Uses AsyncStorage to retrieve the value of 'DailyLogins'
// 3. setDoc(doc(db, currentUser, "DailyLoginDoc")) - Firebase daily login value
export const ProgressTracker = () => {
    // This state allows us to display the daily logins.
    // Note: The code always tries to match dailyLogins with the .getItem('DailyLogins')
    // These two values should always try to be the same, but they are different variables.

    const { dailyLogins, setDailyLogins } = useDailyLogins();
    const { consecutiveDLs, setConsecutiveDLs } = useConsecutiveLogins();
    const { longestStreak, setLongestStreak } = useLongestStreak();
    const { sundayLogin, setSundayLogin } = useSundayLogin();
    const { mondayLogin, setMondayLogin } = useMondayLogin();
    const { tuesdayLogin, setTuesdayLogin } = useTuesdayLogin();
    const { wednesdayLogin, setWednesdayLogin } = useWednesdayLogin();
    const { thursdayLogin, setThursdayLogin } = useThursdayLogin();
    const { fridayLogin, setFridayLogin } = useFridayLogin();
    const { saturdayLogin, setSaturdayLogin } = useSaturdayLogin();
    // console.log(fridayLogin);
    return(
        <View style={progressPage.fullPageContainer}>
            <Text style={progressPage.title}>Weekly Progress</Text>
            <View style={progressPage.rowOfCheckboxes}>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={sundayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Sun</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={mondayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Mon</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={tuesdayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Tue</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={wednesdayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Wed</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={thursdayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Thu</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={fridayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Fri</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={saturdayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Sat</Text>
                </View>
            </View>
            <Text style={progressPage.title}>All-Time Stats</Text>
            <View style={progressPage.rowOfCheckboxes}>
                <View style={progressPage.statContainer}>
                    <Image
                        style={progressPage.statBox}
                        source={require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.statNumber}>{dailyLogins}</Text>
                    <Text style={progressPage.statLabel}>Total Daily Logins</Text>
                </View>
                <View style={progressPage.statContainer}>
                    <Image
                        style={progressPage.statBox}
                        source={require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.statNumber}>{consecutiveDLs}</Text>
                    <Text style={progressPage.statLabel}>Consecutive Logins</Text>
                </View>
                <View style={progressPage.statContainer}>
                    <Image
                        style={progressPage.statBox}
                        source={require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.statNumber}>{longestStreak}</Text>
                    <Text style={progressPage.statLabel}>Longest Login Streak</Text>
                </View>
            </View>
            {/* <Button title="Increment +1 (Testing Yesterday Date)" onPress={TestDailyIncrementYesterday}></Button> */}
            {/* <Button title="Increment +1 (Testing Tomrorow Date)" onPress={TestDailyIncrementTomorrow}></Button> */}
            {/* <Button title="Remove All Count (Testing Only)" onPress={clearDailyLogins}></Button> */}
        </View>
    );
};

export const dailyIncrement = async ({
    dailyLogins, setDailyLogins, 
    consecutiveDLs, setConsecutiveDLs, 
    longestStreak, setLongestStreak, 
    sundayLogin, setSundayLogin, 
    mondayLogin, setMondayLogin, 
    tuesdayLogin, setTuesdayLogin, 
    wednesdayLogin, setWednesdayLogin, 
    thursdayLogin, setThursdayLogin, 
    fridayLogin, setFridayLogin, 
    saturdayLogin, setSaturdayLogin}) => {
    try {
        let dailyLogs = parseInt(await AsyncStorage.getItem("dailyLogins"), 10);
        // let dailyLogs = 0;
        // TrickToYesterday(); // for testing
        let storedDate = await AsyncStorage.getItem("latestDate");
        if (storedDate === null) {
            TrickToYesterday();
            storedDate = await AsyncStorage.getItem("latestDate");
        }
        let currentDate = new Date().toLocaleDateString();
        console.log("Stored Date: " + storedDate);
        console.log("Current Date: " + currentDate);
        let consecutiveLogs = parseInt(await AsyncStorage.getItem('consecutiveDLs'), 10);
        let longestStreakLogs = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
        let sundayLog = await AsyncStorage.getItem('sundayLogin');
        let mondayLog = await AsyncStorage.getItem('mondayLogin');
        let tuesdayLog = await AsyncStorage.getItem('tuesdayLogin');
        let wednesdayLog = await AsyncStorage.getItem('wednesdayLogin');
        let thursdayLog = await AsyncStorage.getItem('thursdayLogin');
        let fridayLog = await AsyncStorage.getItem('fridayLogin');
        let saturdayLog = await AsyncStorage.getItem('saturdayLogin');
        if (dailyLogs === 0 || isNaN(dailyLogs)) {
            await addPersonalCounter({
                setDailyLogins, setConsecutiveDLs, setLongestStreak,
                setSundayLogin, setMondayLogin, setTuesdayLogin,
                setWednesdayLogin, setThursdayLogin,
                setFridayLogin, setSaturdayLogin
            });
            await incrementCounters({
                setDailyLogins, setConsecutiveDLs, setLongestStreak,
                setSundayLogin, setMondayLogin, setTuesdayLogin,
                setWednesdayLogin, setThursdayLogin,
                setFridayLogin, setSaturdayLogin
            });
        } else if (dailyLogs > 0 && storedDate != currentDate) {
            console.log("Current daily logins: " + dailyLogs)
            await incrementCounters({
                setDailyLogins, setConsecutiveDLs, setLongestStreak,
                setSundayLogin, setMondayLogin, setTuesdayLogin,
                setWednesdayLogin, setThursdayLogin,
                setFridayLogin, setSaturdayLogin
            });
            await AsyncStorage.setItem("latestDate", currentDate);
        } else if (dailyLogs > 0 && storedDate === currentDate) {
            console.log("Same day, already incremented.");
            setDailyLogins(dailyLogs);
            setConsecutiveDLs(consecutiveLogs);
            setLongestStreak(longestStreakLogs);
            if (sundayLog === 'true') {
                setSundayLogin(true);
            } else {
                setSundayLogin(false);
            }    
            if (mondayLog === 'true') {
                setMondayLogin(true);
            } else {
                setMondayLogin(false);
            }
            if (tuesdayLog === 'true') {
                setTuesdayLogin(true);
            } else {
                setTuesdayLogin(false);
            }
            if (wednesdayLog === 'true') {
                setWednesdayLogin(true);
            } else {
                setWednesdayLogin(false);
            }
            if (thursdayLog === 'true') {
                setThursdayLogin(true);
            } else {
                setThursdayLogin(false);
            }
            if (fridayLog === 'true') {
                setFridayLogin(true);
            } else {
                setFridayLogin(false);
            }
            if (saturdayLog === 'true') {
                setSaturdayLogin(true);
            } else {
                setSaturdayLogin(false);
            }
        }
        console.log("Daily Logins After Process: " + dailyLogs + " | Consecutive Logins After Process: " + consecutiveLogs + " | Longest Streak After Process: " + longestStreakLogs);
    } catch (error) {
        console.log("Daily Increment Function Error: " + error);
    }
}

export const addPersonalCounter = async (
    {dailyLogins, setDailyLogins, 
    consecutiveDLs, setConsecutiveDLs, 
    longestStreak, setLongestStreak, 
    sundayLogin, setSundayLogin, 
    mondayLogin, setMondayLogin, 
    tuesdayLogin, setTuesdayLogin, 
    wednesdayLogin, setWednesdayLogin, 
    thursdayLogin, setThursdayLogin, 
    fridayLogin, setFridayLogin, 
    saturdayLogin, setSaturdayLogin}) => {
    try {
        const email = await getCurrEmail();
        let currentUser = email;
        await AsyncStorage.setItem('dailyLogins', JSON.stringify(0));
        await AsyncStorage.setItem('latestDate', new Date().toLocaleDateString());
        await AsyncStorage.setItem('consecutiveDLs', JSON.stringify(1));
        await AsyncStorage.setItem('longestStreak', JSON.stringify(1));
        await AsyncStorage.setItem('sundayLogin', 'false');
        await AsyncStorage.setItem('mondayLogin', 'false');
        await AsyncStorage.setItem('tuesdayLogin', 'false');
        await AsyncStorage.setItem('wednesdayLogin', 'false');
        await AsyncStorage.setItem('thursdayLogin', 'false');
        await AsyncStorage.setItem('fridayLogin', 'false');
        await AsyncStorage.setItem('saturdayLogin', 'false');
        // TrickToYesterday();
        setDailyLogins(0);
        setConsecutiveDLs(1);
        setLongestStreak(1);
        setSundayLogin(false);
        setMondayLogin(false);
        setTuesdayLogin(false);
        setWednesdayLogin(false);
        setThursdayLogin(false);
        setFridayLogin(false);
        setSaturdayLogin(false);

        let firstDL = parseInt(await AsyncStorage.getItem('dailyLogins'), 10);
        let lastLogin = await AsyncStorage.getItem('latestDate');
        let firstCDL = parseInt(await AsyncStorage.getItem('consecutiveDLs'), 10);
        let firstLS = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
        let firstSunday = await AsyncStorage.getItem('sundayLogin');
        let firstMonday = await AsyncStorage.getItem('mondayLogin');
        let firstTuesday = await AsyncStorage.getItem('tuesdayLogin');
        let firstWednesday = await AsyncStorage.getItem('wednesdayLogin');
        let firstThursday = await AsyncStorage.getItem('thursdayLogin');
        let firstFriday = await AsyncStorage.getItem('fridayLogin');
        let firstSaturday = await AsyncStorage.getItem('saturdayLogin');

        await setDoc(doc(db, currentUser, "ProgressTrackingDoc"), {
            userDailyLogins: firstDL.toString(),
            userLastLogin: lastLogin.toString(),
            userConsecutiveLogins: firstCDL.toString(),
            userLongestStreak: firstLS.toString(),
            userSunday: firstSunday,
            userMonday: firstMonday,
            userTuesday: firstTuesday,
            userWednesday: firstWednesday,
            userThursday: firstThursday,
            userFriday: firstFriday,
            userSaturday: firstSaturday
        });
        console.log("New Progress Tracking Document Created For: " + currentUser);
    } catch (error) {
        console.log("Adding Personal Counter Error: " + error);
    }
}

export const incrementCounters = async ({
    dailyLogins, setDailyLogins, 
    consecutiveDLs, setConsecutiveDLs, 
    longestStreak, setLongestStreak, 
    sundayLogin, setSundayLogin, 
    mondayLogin, setMondayLogin, 
    tuesdayLogin, setTuesdayLogin, 
    wednesdayLogin, setWednesdayLogin, 
    thursdayLogin, setThursdayLogin, 
    fridayLogin, setFridayLogin, 
    saturdayLogin, setSaturdayLogin}) => {
        try {
            const email = await getCurrEmail();
            let currentUser = email;
            let currentDL = parseInt(await AsyncStorage.getItem('dailyLogins'), 10);
            let lastLogin = await AsyncStorage.getItem('latestDate');
            let currentCDL = parseInt(await AsyncStorage.getItem('consecutiveDLs'), 10);
            let currentLS = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
            let currentSunday = await AsyncStorage.getItem('sundayLogin');
            let currentMonday = await AsyncStorage.getItem('mondayLogin');
            let currentTuesday = await AsyncStorage.getItem('tuesdayLogin');
            let currentWednesday = await AsyncStorage.getItem('wednesdayLogin');
            let currentThursday = await AsyncStorage.getItem('thursdayLogin');
            let currentFriday = await AsyncStorage.getItem('fridayLogin');
            let currentSaturday = await AsyncStorage.getItem('saturdayLogin');

            // Increment daily logins by 1 for a new day
            await AsyncStorage.setItem('dailyLogins', (currentDL+1).toString());
            setDailyLogins(currentDL+1);
            newDL = parseInt(await AsyncStorage.getItem('dailyLogins'), 10);
            // console.log("Increment Counter Step 1 - CurrentDL: " + newDL);

            //if last date recorded date is -1 of the current date
            let currentDate = new Date();
            let currentDay = currentDate.getDate();
            let currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
            let currentYear = currentDate.getFullYear();

            let [month, day, year] = lastLogin.split("/").map(Number);
            if (currentYear === year && currentMonth === month && currentDay - day === 1) {
                // console.log("The last recorded date is one day before the current date.");
                currentCDL += 1;
                await AsyncStorage.setItem('consecutiveDLs', currentCDL.toString());
                setConsecutiveDLs(currentCDL);
                // console.log("New consecutive login streak!: " + currentCDL);
            } else if (currentYear === year && currentMonth === month && currentDay === day) {
                console.log("The last recorded date is the same as the current date.");
            } else {
                // console.log("The last recorded date is not one day before the current date.");
                currentCDL = 1;
                await AsyncStorage.setItem('consecutiveDLs', currentCDL.toString());
                setConsecutiveDLs(currentCDL);
                // console.log("New consecutive login streak!: " + currentCDL);
            }
            // console.log("Increment Counter Step 2 - ConsecutiveDL: " + currentCDL);

            if (currentCDL > currentLS) {
                await AsyncStorage.setItem('longestStreak', currentCDL.toString());
                setLongestStreak(currentCDL);
                currentLS = currentCDL;
                // console.log("New longest streak!: " + currentLS);
            }

            if (currentDate.getDay() === 0) {
                await AsyncStorage.setItem('sundayLogin', 'true');
                setSundayLogin(true);
                await AsyncStorage.setItem('mondayLogin', 'false')
                setMondayLogin(false);
                await AsyncStorage.setItem('tuesdayLogin', 'false')
                setTuesdayLogin(false);
                await AsyncStorage.setItem('wednesdayLogin', 'false')
                setWednesdayLogin(false);
                await AsyncStorage.setItem('thursdayLogin', 'false')
                setThursdayLogin(false);
                await AsyncStorage.setItem('fridayLogin', 'false')
                setFridayLogin(false);
                await AsyncStorage.setItem('saturdayLogin', 'false')
                setSaturdayLogin(false);
                console.log("Today is Sunday!");
            } else if (currentDate.getDay() === 1) {
                await AsyncStorage.setItem('mondayLogin', 'true')
                setMondayLogin(true);
                console.log("Today is Monday!");
            } else if (currentDate.getDay() === 2) {
                await AsyncStorage.setItem('tuesdayLogin', 'true')
                setTuesdayLogin(true);
            } else if (currentDate.getDay() === 3) {
                await AsyncStorage.setItem('wednesdayLogin', 'true')
                setWednesdayLogin(true);
                console.log("Today is Wednesday!");
            } else if (currentDate.getDay() === 4) {
                await AsyncStorage.setItem('thursdayLogin', 'true')
                setThursdayLogin(true);
                console.log("Today is Thursday!");
            } else if (currentDate.getDay() === 5) {
                await AsyncStorage.setItem('fridayLogin', 'true')
                setFridayLogin(true);
                console.log("Today is Friday!");
            } else if (currentDate.getDay() === 6) {
                await AsyncStorage.setItem('saturdayLogin', 'true')
                setSaturdayLogin(true);
            } 

            await setDoc(doc(db, currentUser, 'ProgressTrackingDoc'), {
                userDailyLogins: currentDL.toString(),
                userLastLogin: lastLogin.toString(),
                userConsecutiveLogins: currentCDL.toString(),
                userLongestStreak: currentLS.toString(),
                userSunday: currentSunday,
                userMonday: currentMonday,
                userTuesday: currentTuesday,
                userWednesday: currentWednesday,
                userThursday: currentThursday,
                userFriday: currentFriday,
                userSaturday: currentSaturday
            });
            // console.log("Increment Counters Function Success!");
        } catch (error) {
            console.log("Increment Counters Function Error: " + error);
        }
    }

    const TrickToYesterday = async () => {
        try {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate()-1);
            await AsyncStorage.setItem('latestDate', yesterday.toLocaleDateString());
            console.log("Trick Date: " + yesterday);
        } catch (error) {
            console.log("Error with tricking to yesterday: " + error);
        }
    }

    const TrickToTomorrow = async () => {
        try {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate()+1);
            await AsyncStorage.setItem('latestDate', tomorrow.toLocaleDateString());
            console.log("Trick Date: " + tomorrow);
        } catch (error) {
            console.log("Error with tricking to tomorrow: " + error);
        }
    }