import React, {useState, useEffect} from "react";
import { View, Text, Button} from "react-native";
import { Image } from "expo-image";
import { useFocusEffect } from "@react-navigation/native";

import { styles, progressPage, storePage } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore"; 
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

import { getCurrency } from "./currency.js";

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
    const { currency, updateCurrency } = getCurrency();

    const handleTestDailyIncrementV0 = async ({
        dailyLogins, setDailyLogins, 
        consecutiveDLs, setConsecutiveDLs, 
        longestStreak, setLongestStreak, 
        sundayLogin, setSundayLogin, 
        mondayLogin, setMondayLogin, 
        tuesdayLogin, setTuesdayLogin, 
        wednesdayLogin, setWednesdayLogin, 
        thursdayLogin, setThursdayLogin, 
        fridayLogin, setFridayLogin, 
        saturdayLogin, setSaturdayLogin,
        currency, updateCurrency}) => {
            try {
                await testDailyIncrementV0({
                    setDailyLogins,
                    setConsecutiveDLs,
                    setLongestStreak,
                    setSundayLogin,
                    setMondayLogin,
                    setTuesdayLogin,
                    setWednesdayLogin,
                    setThursdayLogin,
                    setFridayLogin,
                    setSaturdayLogin,
                    updateCurrency
                });
            } catch (error) {
                console.log("Error with handling testDailyIncrementV1: " + error);
            }
    };

    const handleTestDailyIncrementV1 = async ({
        dailyLogins, setDailyLogins, 
        consecutiveDLs, setConsecutiveDLs, 
        longestStreak, setLongestStreak, 
        sundayLogin, setSundayLogin, 
        mondayLogin, setMondayLogin, 
        tuesdayLogin, setTuesdayLogin, 
        wednesdayLogin, setWednesdayLogin, 
        thursdayLogin, setThursdayLogin, 
        fridayLogin, setFridayLogin, 
        saturdayLogin, setSaturdayLogin,
        currency, updateCurrency}) => {
            try {
                await testDailyIncrementV1({
                    setDailyLogins,
                    setConsecutiveDLs,
                    setLongestStreak,
                    setSundayLogin,
                    setMondayLogin,
                    setTuesdayLogin,
                    setWednesdayLogin,
                    setThursdayLogin,
                    setFridayLogin,
                    setSaturdayLogin,
                    updateCurrency
                });
            } catch (error) {
                console.log("Error with handling testDailyIncrementV1: " + error);
            }
    };

    const handleTestDailyIncrementV2 = async ({
        dailyLogins, setDailyLogins, 
        consecutiveDLs, setConsecutiveDLs, 
        longestStreak, setLongestStreak, 
        sundayLogin, setSundayLogin, 
        mondayLogin, setMondayLogin, 
        tuesdayLogin, setTuesdayLogin, 
        wednesdayLogin, setWednesdayLogin, 
        thursdayLogin, setThursdayLogin, 
        fridayLogin, setFridayLogin, 
        saturdayLogin, setSaturdayLogin,
        currency, updateCurrency}) => {
            try {
                await testDailyIncrementV2({
                    setDailyLogins,
                    setConsecutiveDLs,
                    setLongestStreak,
                    setSundayLogin,
                    setMondayLogin,
                    setTuesdayLogin,
                    setWednesdayLogin,
                    setThursdayLogin,
                    setFridayLogin,
                    setSaturdayLogin
                });
            } catch (error) {
                console.log("Error with handling testDailyIncrementV1: " + error);
            }
    };

    const handleTestDailyIncrementV3 = async ({
        dailyLogins, setDailyLogins, 
        consecutiveDLs, setConsecutiveDLs, 
        longestStreak, setLongestStreak, 
        sundayLogin, setSundayLogin, 
        mondayLogin, setMondayLogin, 
        tuesdayLogin, setTuesdayLogin, 
        wednesdayLogin, setWednesdayLogin, 
        thursdayLogin, setThursdayLogin, 
        fridayLogin, setFridayLogin, 
        saturdayLogin, setSaturdayLogin,
        currency, updateCurrency}) => {
            try {
                await testDailyIncrementV3({
                    setDailyLogins,
                    setConsecutiveDLs,
                    setLongestStreak,
                    setSundayLogin,
                    setMondayLogin,
                    setTuesdayLogin,
                    setWednesdayLogin,
                    setThursdayLogin,
                    setFridayLogin,
                    setSaturdayLogin
                });
            } catch (error) {
                console.log("Error with handling testDailyIncrementV1: " + error);
            }
    };

    const handleClearDailyLogins = async ({
        dailyLogins, setDailyLogins, 
        consecutiveDLs, setConsecutiveDLs, 
        longestStreak, setLongestStreak, 
        sundayLogin, setSundayLogin, 
        mondayLogin, setMondayLogin, 
        tuesdayLogin, setTuesdayLogin, 
        wednesdayLogin, setWednesdayLogin, 
        thursdayLogin, setThursdayLogin, 
        fridayLogin, setFridayLogin, 
        saturdayLogin, setSaturdayLogin,
        currency, updateCurrency}) => {
            try {
                await clearDailyLogins({
                    setDailyLogins,
                    setConsecutiveDLs,
                    setLongestStreak,
                    setSundayLogin,
                    setMondayLogin,
                    setTuesdayLogin,
                    setWednesdayLogin,
                    setThursdayLogin,
                    setFridayLogin,
                    setSaturdayLogin
                });
            } catch (error) {
                console.log("Error with handling clearDailyLogins: " + error);
            }
    };

    const handleLoginAll = async ({
        sundayLogin, setSundayLogin, 
        mondayLogin, setMondayLogin, 
        tuesdayLogin, setTuesdayLogin, 
        wednesdayLogin, setWednesdayLogin, 
        thursdayLogin, setThursdayLogin, 
        fridayLogin, setFridayLogin, 
        saturdayLogin, setSaturdayLogin}) => {
            try {
                await loginAll({
                    setSundayLogin,
                    setMondayLogin,
                    setTuesdayLogin,
                    setWednesdayLogin,
                    setThursdayLogin,
                    setFridayLogin,
                    setSaturdayLogin
                });
            } catch (error) {
                console.log("Error with handling loginAll: " + error);
            }
    };

    return(
        <View style={progressPage.fullPageContainer}>
            {/* <View style = {storePage.currencyContainer}>
                <Text style = {storePage.honeyCoinTitle}> Honey Coins: {currency} </Text>
                <Image source = {require("../imgs/honeycoin.png")} style = {storePage.honeyCoinTitleImg}/>
            </View> */}
            <Text style={progressPage.title}>Weekly Progress</Text>
            <Text style = {progressPage.caption}> Moobie loves to see your progress! </Text>
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
            <Text style = {progressPage.caption}> Moobie is so proud of you! </Text>
            <View style={progressPage.rowOfCheckboxes}>
                <View style={progressPage.statContainer}>
                    <Text style={progressPage.statNumber}>{dailyLogins}</Text>
                    <Text style={progressPage.statLabel}>Total Daily Logins</Text>
                </View>
                <View style={progressPage.statContainer}>
                    <Text style={progressPage.statNumber}>{consecutiveDLs}</Text>
                    <Text style={progressPage.statLabel}>Consecutive Logins</Text>
                </View>
                <View style={progressPage.statContainer}>
                    <Text style={progressPage.statNumber}>{longestStreak}</Text>
                    <Text style={progressPage.statLabel}>Longest Login Streak</Text>
                </View>
            </View>
            {/* <Button title="Simulate New Day (Tomorrow)" onPress={() => handleTestDailyIncrementV0({
                dailyLogins, setDailyLogins, 
                consecutiveDLs, setConsecutiveDLs, 
                longestStreak, setLongestStreak, 
                sundayLogin, setSundayLogin, 
                mondayLogin, setMondayLogin, 
                tuesdayLogin, setTuesdayLogin, 
                wednesdayLogin, setWednesdayLogin, 
                thursdayLogin, setThursdayLogin, 
                fridayLogin, setFridayLogin, 
                saturdayLogin, setSaturdayLogin,
                currency, updateCurrency
            })}></Button> */}
            {/* <Button title="Simulate New Day (Yesterday)" onPress={() => handleTestDailyIncrementV1({
                dailyLogins, setDailyLogins, 
                consecutiveDLs, setConsecutiveDLs, 
                longestStreak, setLongestStreak, 
                sundayLogin, setSundayLogin, 
                mondayLogin, setMondayLogin, 
                tuesdayLogin, setTuesdayLogin, 
                wednesdayLogin, setWednesdayLogin, 
                thursdayLogin, setThursdayLogin, 
                fridayLogin, setFridayLogin, 
                saturdayLogin, setSaturdayLogin,
                currency, updateCurrency
            })}></Button>
            <Button title="Test Last Login: Two Days Ago" onPress={() => handleTestDailyIncrementV2({
                dailyLogins, setDailyLogins, 
                consecutiveDLs, setConsecutiveDLs, 
                longestStreak, setLongestStreak, 
                sundayLogin, setSundayLogin, 
                mondayLogin, setMondayLogin, 
                tuesdayLogin, setTuesdayLogin, 
                wednesdayLogin, setWednesdayLogin, 
                thursdayLogin, setThursdayLogin, 
                fridayLogin, setFridayLogin, 
                saturdayLogin, setSaturdayLogin,
                currency, updateCurrency
            })}></Button>
            <Button title="Test Last Login: Three Days Ago" onPress={() => handleTestDailyIncrementV3({
                dailyLogins, setDailyLogins, 
                consecutiveDLs, setConsecutiveDLs, 
                longestStreak, setLongestStreak, 
                sundayLogin, setSundayLogin, 
                mondayLogin, setMondayLogin, 
                tuesdayLogin, setTuesdayLogin, 
                wednesdayLogin, setWednesdayLogin, 
                thursdayLogin, setThursdayLogin, 
                fridayLogin, setFridayLogin, 
                saturdayLogin, setSaturdayLogin,
                currency, updateCurrency
            })}></Button>
            <Button title="Remove All Count" onPress={() => handleClearDailyLogins({
                dailyLogins, setDailyLogins, 
                consecutiveDLs, setConsecutiveDLs, 
                longestStreak, setLongestStreak, 
                sundayLogin, setSundayLogin, 
                mondayLogin, setMondayLogin, 
                tuesdayLogin, setTuesdayLogin, 
                wednesdayLogin, setWednesdayLogin, 
                thursdayLogin, setThursdayLogin, 
                fridayLogin, setFridayLogin, 
                saturdayLogin, setSaturdayLogin,
                currency, updateCurrency
            })}></Button>
            <Button title="Login all 7 days" onPress={() => handleLoginAll({
                setSundayLogin, setMondayLogin, setTuesdayLogin,
                setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin
            })}></Button> */}
            <Image
                source = {require("../imgs/moobiePoint.png")}
                style = {progressPage.moobieImg}
            />
        </View>
    );
};

export const dailyIncrement = async ({
    setDailyLogins, setConsecutiveDLs, setLongestStreak, 
    setSundayLogin, setMondayLogin, setTuesdayLogin, 
    setWednesdayLogin, setThursdayLogin, setFridayLogin, 
    setSaturdayLogin, updateCurrency}) => {
    try {
        let dailyLogs = parseInt(await AsyncStorage.getItem("dailyLogins"), 10);
        let storedDate = await AsyncStorage.getItem("latestDate");
        if (storedDate === null) {
            trickToYesterday();
            storedDate = await AsyncStorage.getItem("latestDate");
        }
        let currentDate = new Date().toLocaleDateString();
        console.log("Stored Date: " + storedDate);
        console.log("Current Date: " + currentDate);
        let consecutiveLogs = parseInt(await AsyncStorage.getItem('consecutiveDLs'), 10);
        let longestStreakLogs = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
        let currencyLog = await AsyncStorage.getItem('userCurrency');
        console.log("Daily Logins Before Process: " + dailyLogs + " | Consecutive Logins Before Process: " + consecutiveLogs + " | Longest Streak Before Process: " + longestStreakLogs + " | User Currency Before Process: " + currencyLog);
        if (dailyLogs === 0) {
            await addPersonalCounter({
                setDailyLogins, setConsecutiveDLs, setLongestStreak,
                setSundayLogin, setMondayLogin, setTuesdayLogin,
                setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                setSaturdayLogin
            });
            await incrementCounters({
                setDailyLogins, setConsecutiveDLs, setLongestStreak,
                setSundayLogin, setMondayLogin, setTuesdayLogin,
                setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                setSaturdayLogin, updateCurrency
            });
        } else if (isNaN(dailyLogs)) {
            await setPersonalCounters({
                setDailyLogins, setConsecutiveDLs, setLongestStreak, 
                setSundayLogin, setMondayLogin, setTuesdayLogin, 
                setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin
            });
            if (dailyLogs === 0) {
                await addPersonalCounter({
                    setDailyLogins, setConsecutiveDLs, setLongestStreak,
                    setSundayLogin, setMondayLogin, setTuesdayLogin,
                    setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                    setSaturdayLogin
                });
                await incrementCounters({
                    setDailyLogins, setConsecutiveDLs, setLongestStreak,
                    setSundayLogin, setMondayLogin, setTuesdayLogin,
                    setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                    setSaturdayLogin, updateCurrency
                });
            } else if (dailyLogs > 0 && storedDate != currentDate) {
                // console.log("Current daily logins: " + dailyLogs)
                await incrementCounters({
                    setDailyLogins, setConsecutiveDLs, setLongestStreak,
                    setSundayLogin, setMondayLogin, setTuesdayLogin,
                    setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                    setSaturdayLogin, updateCurrency
                });
                await AsyncStorage.setItem("latestDate", currentDate);
            } else if (dailyLogs > 0 && storedDate === currentDate) {
                console.log("Same day, already incremented.");
                setDailyLogins(dailyLogs);
                setConsecutiveDLs(consecutiveLogs);
                setLongestStreak(longestStreakLogs);
                await convertDayToBool({
                    setSundayLogin, setMondayLogin, setTuesdayLogin, 
                    setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin});
                updateCurrency(parseInt(currencyLog));
                currencyLog = await AsyncStorage.getItem('userCurrency');
            }
        } else if (dailyLogs > 0 && storedDate != currentDate) {
            console.log("Daily Logs Greater Than 0 and the Date is Not the Same");
            await incrementCounters({
                setDailyLogins, setConsecutiveDLs, setLongestStreak,
                setSundayLogin, setMondayLogin, setTuesdayLogin,
                setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                setSaturdayLogin, updateCurrency
            });
            await AsyncStorage.setItem("latestDate", currentDate);
        } else if (dailyLogs > 0 && storedDate === currentDate) {
            console.log("Same day, already incremented.");
            setDailyLogins(dailyLogs);
            setConsecutiveDLs(consecutiveLogs);
            setLongestStreak(longestStreakLogs);
            await convertDayToBool({
                setSundayLogin, setMondayLogin, setTuesdayLogin, 
                setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin});
            updateCurrency(parseInt(currencyLog));
            currencyLog = await AsyncStorage.getItem('userCurrency');
        }

        dailyLogs = parseInt(await AsyncStorage.getItem("dailyLogins"), 10);
        consecutiveLogs = parseInt(await AsyncStorage.getItem('consecutiveDLs'), 10);
        longestStreakLogs = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
        currencyLog = await AsyncStorage.getItem('userCurrency');
        console.log("Daily Logins After Process: " + dailyLogs + " | Consecutive Logins After Process: " + consecutiveLogs + " | Longest Streak After Process: " + longestStreakLogs + " | User Currency After Process: " + currencyLog);
    } catch (error) {
        console.log("Daily Increment Function Error: " + error);
    }
}

export const addPersonalCounter = async ({
    setDailyLogins, setConsecutiveDLs, setLongestStreak, 
    setSundayLogin, setMondayLogin, setTuesdayLogin, 
    setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin}) => {
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

export const setPersonalCounters = async ({
    setDailyLogins, setConsecutiveDLs, setLongestStreak, 
    setSundayLogin, setMondayLogin, setTuesdayLogin, 
    setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin
}) => {
    try {
        const currentUser = await getCurrEmail();
        const docRef = doc(db, currentUser, "ProgressTrackingDoc");
        const docSnap = await getDoc(docRef);
        let prevDL = parseInt(await AsyncStorage.getItem('dailyLogins'), 10);
        let lastLogin = await AsyncStorage.getItem('latestDate');
        let prevCDL = parseInt(await AsyncStorage.getItem('consecutiveDLs'), 10);
        let prevLS = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
        let prevSunday = await AsyncStorage.getItem('sundayLogin');
        let prevMonday = await AsyncStorage.getItem('mondayLogin');
        let prevTuesday = await AsyncStorage.getItem('tuesdayLogin');
        let prevWednesday = await AsyncStorage.getItem('wednesdayLogin');
        let prevThursday = await AsyncStorage.getItem('thursdayLogin');
        let prevFriday = await AsyncStorage.getItem('fridayLogin');
        let prevSaturday = await AsyncStorage.getItem('saturdayLogin');
        if (docSnap.exists()) {
            prevDL = docSnap.data().userDailyLogins;
            lastLogin = docSnap.data().userLastLogin;
            prevCDL = docSnap.data().userConsecutiveLogins;
            prevLS = docSnap.data().userLongestStreak;
            prevSunday = docSnap.data().userSunday;
            prevMonday = docSnap.data().userMonday;
            prevTuesday = docSnap.data().userTuesday;
            prevWednesday = docSnap.data().userWednesday;
            prevThursday = docSnap.data().userThursday;
            prevFriday = docSnap.data().userFriday;
            prevSaturday = docSnap.data().userSaturday;
            console.log("DocSnap Success!");
        } else {
            console.log("No such document found!");
        }
        console.log("DailyLogs has: " + prevDL);
        await AsyncStorage.setItem('dailyLogins', prevDL);
        await AsyncStorage.setItem('latestDate', lastLogin);
        await AsyncStorage.setItem('consecutiveDLs', prevCDL);
        await AsyncStorage.setItem('longestStreak', prevLS);
        await AsyncStorage.setItem('sundayLogin', prevSunday);
        await AsyncStorage.setItem('mondayLogin', prevMonday);
        await AsyncStorage.setItem('tuesdayLogin', prevTuesday);
        await AsyncStorage.setItem('wednesdayLogin', prevWednesday);
        await AsyncStorage.setItem('thursdayLogin', prevThursday);
        await AsyncStorage.setItem('fridayLogin', prevFriday);
        await AsyncStorage.setItem('saturdayLogin', prevSaturday);
        setDailyLogins(prevDL);
        setConsecutiveDLs(prevCDL);
        setLongestStreak(prevLS);
        await convertDayToBool({
            setSundayLogin, setMondayLogin, setTuesdayLogin, 
            setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin
        });
        console.log("Set Personal Counters Function Success!");
    } catch (error) {
        console.log("Set Personal Counters Function Error: " + error);
    }
}

export const incrementCounters = async ({
    setDailyLogins, setConsecutiveDLs, setLongestStreak, 
    setSundayLogin, setMondayLogin, setTuesdayLogin, 
    setWednesdayLogin, setThursdayLogin, setFridayLogin, 
    setSaturdayLogin, updateCurrency}) => {
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
            currentDL = await AsyncStorage.getItem('dailyLogins');
            // newDL = parseInt(await AsyncStorage.getItem('dailyLogins'), 10);
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

            let currencyAmt = parseInt(await AsyncStorage.getItem('userCurrency'), 10);
            updateCurrency(currencyAmt+1);
            await AsyncStorage.setItem('userCurrency', (currencyAmt+1).toString());

            if (currentDate.getDay() === 0) {
                if (await AsyncStorage.getItem('sundayLogin') === 'true' && 
                await AsyncStorage.getItem('mondayLogin') === 'true' && 
                await AsyncStorage.getItem('tuesdayLogin') === 'true' && 
                await AsyncStorage.getItem('wednesdayLogin') === 'true' && 
                await AsyncStorage.getItem('thursdayLogin') === 'true' && 
                await AsyncStorage.getItem('fridayLogin') === 'true' &&
                await AsyncStorage.getItem('saturdayLogin') === 'true') {
                    updateCurrency(currencyAmt+2);
                    await AsyncStorage.setItem('userCurrency', (currencyAmt+2).toString());
                }
                await AsyncStorage.setItem('sundayLogin', 'true');
                setSundayLogin(true);
                await AsyncStorage.setItem('mondayLogin', 'false');
                setMondayLogin(false);
                await AsyncStorage.setItem('tuesdayLogin', 'false');
                setTuesdayLogin(false);
                await AsyncStorage.setItem('wednesdayLogin', 'false');
                setWednesdayLogin(false);
                await AsyncStorage.setItem('thursdayLogin', 'false');
                setThursdayLogin(false);
                await AsyncStorage.setItem('fridayLogin', 'false');
                setFridayLogin(false);
                await AsyncStorage.setItem('saturdayLogin', 'false');
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

            lastLogin = new Date().toLocaleDateString();

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

            await setDoc(doc(db, currentUser, 'User Currency Document'), {
                honeyCoins: currencyAmt.toString()
            });
            console.log("Increment Counters Function Success!");
        } catch (error) {
            console.log("Increment Counters Function Error: " + error);
        }
    }

    export const convertDayToBool = async ({
        setSundayLogin, setMondayLogin, setTuesdayLogin, setWednesdayLogin, 
        setThursdayLogin, setFridayLogin, setSaturdayLogin}) => {
            try {
                let sundayLog = await AsyncStorage.getItem('sundayLogin');
                let mondayLog = await AsyncStorage.getItem('mondayLogin');
                let tuesdayLog = await AsyncStorage.getItem('tuesdayLogin');
                let wednesdayLog = await AsyncStorage.getItem('wednesdayLogin');
                let thursdayLog = await AsyncStorage.getItem('thursdayLogin');
                let fridayLog = await AsyncStorage.getItem('fridayLogin');
                let saturdayLog = await AsyncStorage.getItem('saturdayLogin');
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
            } catch (error) {
                console.log("Converting Day To Bool Error: " + error);
            }
    }

    // Test Cases:
    // 0) Simulate a new day.
    // -> Make the current day tomorrow
    // export const testDailyIncrementV0 = async ({
    //     setDailyLogins, setConsecutiveDLs, setLongestStreak, 
    //     setSundayLogin, setMondayLogin, setTuesdayLogin, 
    //     setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin, updateCurrency}) => {
    //     try {
    //         let dailyLogs = parseInt(await AsyncStorage.getItem("dailyLogins"), 10);
    //         let storedDate = new Date();
    //         await AsyncStorage.setItem("latestDate", new Date().toLocaleDateString());
    //         if (storedDate === null) {
    //             trickToYesterday();
    //             storedDate = await AsyncStorage.getItem("latestDate");
    //         }
    //         let currentDate = new Date();
    //         currentDate.setDate(currentDate.getDate()+1);
    //         console.log("Stored Date: " + storedDate);
    //         console.log("Current Date: " + currentDate);
    //         let consecutiveLogs = parseInt(await AsyncStorage.getItem('consecutiveDLs'), 10);
    //         let longestStreakLogs = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
    //         let sundayLog = await AsyncStorage.getItem('sundayLogin');
    //         let mondayLog = await AsyncStorage.getItem('mondayLogin');
    //         let tuesdayLog = await AsyncStorage.getItem('tuesdayLogin');
    //         let wednesdayLog = await AsyncStorage.getItem('wednesdayLogin');
    //         let thursdayLog = await AsyncStorage.getItem('thursdayLogin');
    //         let fridayLog = await AsyncStorage.getItem('fridayLogin');
    //         let saturdayLog = await AsyncStorage.getItem('saturdayLogin');
    //         let currencyLog = await AsyncStorage.getItem('userCurrency');
    //         if (dailyLogs === 0 || isNaN(dailyLogs)) {
    //             await addPersonalCounter({
    //                 setDailyLogins, setConsecutiveDLs, setLongestStreak,
    //                 setSundayLogin, setMondayLogin, setTuesdayLogin,
    //                 setWednesdayLogin, setThursdayLogin,
    //                 setFridayLogin, setSaturdayLogin
    //             });
    //             await incrementCounters({
    //                 setDailyLogins, setConsecutiveDLs, setLongestStreak,
    //                 setSundayLogin, setMondayLogin, setTuesdayLogin,
    //                 setWednesdayLogin, setThursdayLogin,
    //                 setFridayLogin, setSaturdayLogin, updateCurrency
    //             });
    //         } else if (dailyLogs > 0 && storedDate != currentDate) {
    //             console.log("Current daily logins: " + dailyLogs)
    //             await incrementCounters({
    //                 setDailyLogins, setConsecutiveDLs, setLongestStreak,
    //                 setSundayLogin, setMondayLogin, setTuesdayLogin,
    //                 setWednesdayLogin, setThursdayLogin,
    //                 setFridayLogin, setSaturdayLogin, updateCurrency
    //             });
    //             await AsyncStorage.setItem("latestDate", currentDate.toLocaleDateString());
    //         } else if (dailyLogs > 0 && storedDate === currentDate) {
    //             console.log("Same day, already incremented.");
    //             setDailyLogins(dailyLogs);
    //             setConsecutiveDLs(consecutiveLogs);
    //             setLongestStreak(longestStreakLogs);
    //             if (sundayLog === 'true') {
    //                 setSundayLogin(true);
    //             } else {
    //                 setSundayLogin(false);
    //             }    
    //             if (mondayLog === 'true') {
    //                 setMondayLogin(true);
    //             } else {
    //                 setMondayLogin(false);
    //             }
    //             if (tuesdayLog === 'true') {
    //                 setTuesdayLogin(true);
    //             } else {
    //                 setTuesdayLogin(false);
    //             }
    //             if (wednesdayLog === 'true') {
    //                 setWednesdayLogin(true);
    //             } else {
    //                 setWednesdayLogin(false);
    //             }
    //             if (thursdayLog === 'true') {
    //                 setThursdayLogin(true);
    //             } else {
    //                 setThursdayLogin(false);
    //             }
    //             if (fridayLog === 'true') {
    //                 setFridayLogin(true);
    //             } else {
    //                 setFridayLogin(false);
    //             }
    //             if (saturdayLog === 'true') {
    //                 setSaturdayLogin(true);
    //             } else {
    //                 setSaturdayLogin(false);
    //             }
    //             updateCurrency(currencyLog);
    //         }
    //         console.log("Daily Logins After Process: " + dailyLogs + " | Consecutive Logins After Process: " + consecutiveLogs + " | Longest Streak After Process: " + longestStreakLogs);
    //     } catch (error) {
    //         console.log("Daily Increment Function Error: " + error);
    //     }
    // }


    // 1) Test if latest date is one day behind the current date
    // -> Increment daily login, consecutive login, longest streak if applicable
    const trickToYesterday = async () => {
        try {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate()-1);
            await AsyncStorage.setItem('latestDate', yesterday.toLocaleDateString());
            console.log("Trick Date: " + yesterday);
        } catch (error) {
            console.log("Error with tricking to yesterday: " + error);
        }
    }

    const testDailyIncrementV1 = async ({
        setDailyLogins, setConsecutiveDLs, setLongestStreak, 
        setSundayLogin, setMondayLogin, setTuesdayLogin, 
        setWednesdayLogin, setThursdayLogin, setFridayLogin, 
        setSaturdayLogin, updateCurrency}) => {
        try {
            let temp = await AsyncStorage.getItem('dailyLogins');
            // console.log("temp = " + temp);
            // setDailyLogins(temp);
            trickToYesterday();
            dailyIncrement({
                setDailyLogins, setConsecutiveDLs, setLongestStreak, 
                setSundayLogin, setMondayLogin, setTuesdayLogin, 
                setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                setSaturdayLogin, updateCurrency});
        } catch (error) {
            console.log("TestV1 Function Error: " + error);
        }
    }


    // 2) Test if latest date is not one day behind the current date (ex: two days behind)
    // -> Increment daily login
    // -> Reset consecutive login, keep longest streak
    const trickToTwoDaysAgo = async () => {
        try {
            const yesterday2 = new Date();
            yesterday2.setDate(yesterday2.getDate()-2);
            await AsyncStorage.setItem('latestDate', yesterday2.toLocaleDateString());
            console.log("Trick Date: " + yesterday2);
        } catch (error) {
            console.log("Error with tricking to two days ago: " + error);
        }
    }

    const testDailyIncrementV2 = async ({
        setDailyLogins, setConsecutiveDLs, setLongestStreak, 
        setSundayLogin, setMondayLogin, setTuesdayLogin, 
        setWednesdayLogin, setThursdayLogin, setFridayLogin, 
        setSaturdayLogin, updateCurrency}) => {
            try {
                trickToTwoDaysAgo();
                dailyIncrement({
                    setDailyLogins, setConsecutiveDLs, setLongestStreak, 
                    setSundayLogin, setMondayLogin, setTuesdayLogin, 
                    setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                    setSaturdayLogin, updateCurrency});
            } catch (error) {
                console.log("TestV2 Function Error: " + error);
            }
    }

    // 3) Test when consecutive login broken, longest streak only applies when CDL surpasses LS
    // -> Use testDailyIncrementV3 then testDailyIncrementV1
    // -> They are 2 days apart so it would be proper testing
    const trickToThreeDaysAgo = async () => {
        try {
            const yesterday3 = new Date();
            yesterday3.setDate(yesterday3.getDate()-3);
            await AsyncStorage.setItem('latestDate', yesterday3.toLocaleDateString());
            console.log("Trick Date: " + yesterday3);
        } catch (error) {
            console.log("Error with tricking to three days ago: " + error);
        }
    }

    const testDailyIncrementV3 = async ({
        setDailyLogins, setConsecutiveDLs, setLongestStreak, 
        setSundayLogin, setMondayLogin, setTuesdayLogin, 
        setWednesdayLogin, setThursdayLogin, setFridayLogin, 
        setSaturdayLogin, updateCurrency}) => {
            try {
                trickToThreeDaysAgo();
                dailyIncrement({
                    setDailyLogins, setConsecutiveDLs, setLongestStreak, 
                    setSundayLogin, setMondayLogin, setTuesdayLogin, 
                    setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                    setSaturdayLogin, updateCurrency});
            } catch (error) {
                console.log("TestV3 Function Error: " + error);
            }
    }

    // 4) Clear all data
    const clearDailyLogins = async ({
        setDailyLogins, setConsecutiveDLs, setLongestStreak, 
        setSundayLogin, setMondayLogin, setTuesdayLogin, 
        setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin}) => {
            try {
                addPersonalCounter({
                    setDailyLogins, setConsecutiveDLs, setLongestStreak, 
                    setSundayLogin, setMondayLogin, setTuesdayLogin, 
                    setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin});
                testDailyIncrementV1({
                    setDailyLogins, setConsecutiveDLs, setLongestStreak, 
                    setSundayLogin, setMondayLogin, setTuesdayLogin, 
                    setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin});
            } catch (error) {
                console.log("Clear Daily Logins Function Error: " + error);
            }
    }

    const loginAll = async ({
        setSundayLogin, setMondayLogin, setTuesdayLogin,
        setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin
    }) => {
        try {
            await AsyncStorage.setItem('sundayLogin', 'true');
            await AsyncStorage.setItem('mondayLogin', 'true');
            await AsyncStorage.setItem('tuesdayLogin', 'true');
            await AsyncStorage.setItem('wednesdayLogin', 'true');
            await AsyncStorage.setItem('thursdayLogin', 'true');
            await AsyncStorage.setItem('fridayLogin', 'true');
            await AsyncStorage.setItem('saturdayLogin', 'true');
            await convertDayToBool({
                setSundayLogin, setMondayLogin, setTuesdayLogin, 
                setWednesdayLogin, setThursdayLogin, setFridayLogin, setSaturdayLogin});
        } catch (error) {
            console.log("Error with Logging All Days: " + error)
        }
    }