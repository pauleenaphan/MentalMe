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
import { useWeeklyLogins } from "./progress_files/weeklyLoginsContext.js";

export const useDailyLoginsState = () => {
    const [dailyLogins, setDailyLogins] = useState();
    return [dailyLogins, setDailyLogins];
}

export const useConsecutiveDLsState = () => {
    const [consecutiveDLs, setConsecutiveDLs] = useState();
    return [consecutiveDLs, setConsecutiveDLs];
}

export const useLongestStreakState = () => {
    const [longestStreak, setLongestStreak] = useState();
    return [longestStreak, setLongestStreak];
}

export const useWeeklyLoginsState = () => {
    const [weeklyLogins, setWeeklyLogins] = useState({
        SundayLogin: false,
        MondayLogin: false,
        TuesdayLogin: false,
        WednesdayLogin: false,
        ThursdayLogin: false,
        FridayLogin: false,
        SaturdayLogin: false
    });
    return [weeklyLogins, setWeeklyLogins];
}

// Note: There are three variables to consider with daily logins
// 1. "dailylogins" - State variable to display the daily logins
// 2. .getItem('DailyLogins') -  Uses AsyncStorage to retrieve the value of 'DailyLogins'
// 3. setDoc(doc(db, currentUser, "DailyLoginDoc")) - Firebase daily login value
export const ProgressTracker = () => {
    // This state allows us to display the daily logins.
    // Note: The code always tries to match dailyLogins with the .getItem('DailyLogins')
    // These two values should always try to be the same, but they are different variables.
    // const [dailyLogins, setDailyLogins] = useState();
    // const [consecutiveDLs, setConsecutiveDLs] = useState();
    // const [longestStreak, setLongestStreak] = useState();

    // const [weeklyLogins, setWeeklyLogins] = useState ( { 
    //     SundayLogin: false, 
    //     MondayLogin: false, 
    //     TuesdayLogin: false, 
    //     WednesdayLogin: false,  
    //     ThursdayLogin: false, 
    //     FridayLogin: false, 
    //     SaturdayLogin: false
    // })

    const { dailyLogins, setDailyLogins } = useDailyLogins();
    const { consecutiveDLs, setConsecutiveDLs } = useConsecutiveLogins();
    const { longestStreak, setLongestStreak } = useLongestStreak();
    const { weeklyLogins, setWeeklyLogins } = useWeeklyLogins();

    // // Always shows the daily login count on entering
    // useFocusEffect(
    //     React.useCallback(() => {
    //         const StartUpDisplay = async () => {
    //         try {
    //             DailyIncrement();
    //             ConsecutiveDL();
    //             updateWeeklyLogins();
    //         } catch (error) {
    //             console.log("Opening Error: " + error);
    //         };
    //         };
    //         StartUpDisplay();
    //     }, [])
    // );

    // // If the user has logged in today, just set the daily logins to already stored value
    // // Else, increment by 1
    // const DailyIncrement = async () => {
    //     try {
    //         setDailyLogins(parseInt(await AsyncStorage.getItem("DailyLogins"), 10));
    //         let dailyLogs = parseInt(await AsyncStorage.getItem("DailyLogins"), 10);
    //         let storedDate = await AsyncStorage.getItem("LatestDate");
    //         let currentDate = new Date().toLocaleDateString();
    //         console.log("Stored Date: " + storedDate)
    //         console.log("Current Date: " + currentDate)
    //         console.log("Initial Daily Logins: " + dailyLogs);
    //         if (dailyLogs === 0) { // if it's their first day, create a counter in firebase and increment by 1
    //             addPersonalCounter();
    //             console.log("Incrementing by 1 from 0...");
    //             let newDL = await Counter();
    //             setDailyLogins(newDL);
    //         } else if (dailyLogs === null) { // null check
    //             console.log(dailyLogs);
    //         } else if (storedDate === currentDate) { // if already incremented in the day, return the previous amount
    //             console.log("Daily done today already.");
    //             let DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
    //             setDailyLogins(DL);
    //             counterCheck();
    //             console.log("Same daily logs: " + dailyLogs);
    //         } else { // new day incrementation
    //             console.log("Incrementing by 1...");
    //             await Counter();
    //             await AsyncStorage.setItem("LatestDate", currentDate);
    //             ConsecutiveDL();
    //             updateWeeklyLogins();
    //         };
    //     } catch (error) {
    //         console.log("DailyIncrement Error: " + error);
    //     };
    // };

    // // Creates the document in firebase for daily logins
    // const addPersonalCounter = async () => {
    //     try {
    //         const email = await getCurrEmail();
    //         let currentUser = email;
    //         let firstDL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
    //         let lastLogin = await AsyncStorage.getItem("LatestDate");
    //         let consecutiveDLs = parseInt(await AsyncStorage.getItem("ConsecutiveDLs"), 10);
    //         let longestStreak = parseInt(await AsyncStorage.getItem("longestStreak"), 10);
    //         await AsyncStorage.setItem("ConsecutiveDLs", JSON.stringify(1));
    //         let serializedWeeklyLogins = await AsyncStorage.getItem("weeklyLogins");
    //         await AsyncStorage.setItem("weeklyLogins", serializedWeeklyLogins);
    //         setConsecutiveDLs(1);
    //         if (longestStreak < 1 || longestStreak === null) {
    //             await AsyncStorage.setItem("longestStreak", JSON.stringify(1))
    //             setLongestStreak(1);
    //         } else {
    //             console.log("LS Already Made.");
    //         }
    //         await setDoc(doc(db, currentUser, "DailyLoginDoc"), {
    //             userDL: firstDL.toString(),
    //             userLastLogin: lastLogin.toString(),
    //             userConsecutiveLogins: consecutiveDLs.toString(),
    //             userLongestStreak: longestStreak.toString(),
    //             userWeeklyLogins: serializedWeeklyLogins
    //         });
    //         console.log("New User DL Created: " + currentUser);
    //     } catch(error) {
    //         console.log("New User DL Error: " + error);
    //     };
    // };

    // // Function to increment "DailyLogins"
    // const Counter = async () => {
    //     try {
    //         // Retrieve the item from the AsyncStorage
    //         let DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);

    //         // Check the type (testing purposes)
    //         let type = typeof DL;
    //         console.log('Type of value:', type);
    //         console.log("Old DL: " + DL);

    //         // New variable to hold the incremented value, 
    //         // then input this incremented value into AsyncStorage.
    //         let newDL = DL + 1;
    //         await AsyncStorage.setItem('DailyLogins', JSON.stringify(newDL));
    //         console.log("New DL: " + newDL);

    //         // Always remember to sync the AsyncStorage with the display value
    //         setDailyLogins(newDL);
    //         // return newDL;
    //     } catch (error) {
    //         console.log("error " + error);
    //     };
    // };   

    // // Update Database with new Daily Logins and Time
    // const counterCheck = async () => {
    //     try {
    //         const email = await getCurrEmail();
    //         let currentUser = email;
    //         let currentDL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
    //         let lastLogin = await AsyncStorage.getItem("LatestDate");
    //         let consecutiveDLs = parseInt(await AsyncStorage.getItem("ConsecutiveDLs"), 10);
    //         let longestStreak = parseInt(await AsyncStorage.getItem("longestStreak"), 10);
    //         let serializedWeeklyLogins = JSON.stringify(await AsyncStorage.getItem("weeklyLogins"));
    //         if (longestStreak < 1 || longestStreak === null) {
    //             await AsyncStorage.setItem("longestStreak", JSON.stringify(1))
    //             setLongestStreak(1);
    //             console.log("Longest Streak set to 1.");
    //         } else {
    //             console.log("LS Already Made.");
    //         }
    //         await setDoc(doc(db, currentUser, "DailyLoginDoc"), {
    //             userDL: currentDL.toString(),
    //             userLastLogin: lastLogin.toString(),
    //             userConsecutiveLogins: consecutiveDLs.toString(),
    //             userLongestStreak: longestStreak.toString(),
    //             userWeeklyLogins: serializedWeeklyLogins.toString()
    //         });
    //         console.log("CounterCheck WeeklyLogins: " + weeklyLogins);
    //         console.log("Current DL: " + currentDL)
    //     } catch(error) {
    //         console.log("Current DL Error: " + error);
    //     }
    // }

    // const ConsecutiveDL = async () => {
    //     try {
    //         const email = await getCurrEmail();
    //         let currentUser = email;
    //         let consDLs = parseInt(await AsyncStorage.getItem('ConsecutiveDLs'), 10);
    //         let dailyLogins = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
    //         let longestStreak = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
    //         if (dailyLogins >= consDLs) {
    //             await AsyncStorage.setItem('ConsecutiveDLs', JSON.stringify(dailyLogins))
    //             setConsecutiveDLs(dailyLogins);
    //             consDLs = parseInt(await AsyncStorage.getItem('ConsecutiveDLs'), 10);
    //             console.log("New Consecutive Login: " + consDLs)
    //         }
    //         if (consDLs >= longestStreak) { // if consecutive streak is equal or greater to the longest streak
    //             await AsyncStorage.setItem('longestStreak', JSON.stringify(consDLs))
    //             setLongestStreak(consDLs); // set them equal to each other
    //             longestStreak = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
    //             console.log("The New longest streak: " + longestStreak);
    //         }
    //         let latestDate = await AsyncStorage.getItem("LatestDate");
    //         let currentDate = new Date().toLocaleDateString();
    //         let nextDay = latestDate + 1;
    //         if (latestDate === nextDay) { // check if current date is date + 1
    //             setConsecutiveDLs(consDLs + 1); // if so, increase consecutive count by 1
    //             if (consDLs >= longestStreak) { // if consecutive streak is equal or greater to the longest streak
    //                 setLongestStreak(consDLs); // set them equal to each other
    //                 console.log("New longest streak: " + consDLs)
    //             }
    //         } else { // else if current date is same date as today do nothing to consecutive count
    //             setLongestStreak(longestStreak);
    //             console.log("Same day, no consecutive changes. Current Streak: " + longestStreak); // do nothing to consecutive count
    //         }
    //     } catch (error) {
    //         console.log("Consecutive Error: " + error);
    //     }
    // };

    // const updateWeeklyLogins = async () => { 
    //     try {
    //         const email = await getCurrEmail();
    //         let currentUser = email;
    //         const storedDate = await AsyncStorage.getItem("LatestDate");
    //         let type = typeof storedDate;
    //         console.log('Type of value (StoredDate): ', type);
    //         // Parsing the date is necessary because of
    //         // how dates are saved in AsyncStorage
    //         function parseDMY(s) {
    //             var b = s.split(/\D+/);
    //             // Note: Date(year, month, day) format
    //             // and JS goes by 0 format so need a -1 for month
    //             var d = new Date(b[2], b[0]-1, b[1]);
    //             d.setFullYear(b[2]);
    //             return d && d.getMonth() == b[0]-1? d : new Date(NaN);
    //         }
    //         console.log("Unparsed: " + storedDate);
    //         const currentDate = parseDMY(storedDate);
    //         console.log("Parsed Current Date: " + currentDate);

    //         let weeklyLoginsData = await AsyncStorage.getItem("weeklyLogins");
    //         if (weeklyLoginsData === null) {
    //             weeklyLoginsData = {
    //                 SundayLogin: false,
    //                 MondayLogin: false,
    //                 TuesdayLogin: false,
    //                 WednesdayLogin: false,
    //                 ThursdayLogin: false,
    //                 FridayLogin: false,
    //                 SaturdayLogin: false
    //             };
    //         } else {
    //             // console.log("316 new: " + weeklyLoginsData);
    //             weeklyLoginsData = JSON.parse(weeklyLoginsData); // JSON.parse() may be needed
    //         }
    //         console.log("New weekly login data: " + weeklyLoginsData);

    //         if (currentDate.getDay() === 0) {
    //             for (const day in weeklyLoginsData) {
    //                 weeklyLoginsData[day] = false;
    //             }
    //             weeklyLoginsData["SundayLogin"] = true;
    //             setWeeklyLogins(weeklyLoginsData);
    //             await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
    //             console.log("Sunday Checked!" + weeklyLoginsData);
    //         } else if (currentDate.getDay() === 1) {
    //             weeklyLoginsData["MondayLogin"] = true;
    //             setWeeklyLogins(weeklyLoginsData);
    //             await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
    //             console.log("Monday Checked!" + weeklyLoginsData);
    //         } else if (currentDate.getDay() === 2) {
    //             weeklyLoginsData["TuesdayLogin"] = true;
    //             setWeeklyLogins(weeklyLoginsData);
    //             await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
    //             console.log("Tuesday Checked!" + weeklyLoginsData);
    //         } else if (currentDate.getDay() === 3) {
    //             weeklyLoginsData["WednesdayLogin"] = true;
    //             setWeeklyLogins(weeklyLoginsData);
    //             await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
    //             console.log("Wednesday Checked!" + weeklyLoginsData);
    //         } else if (currentDate.getDay() === 4) {
    //             weeklyLoginsData["ThursdayLogin"] = true;
    //             setWeeklyLogins(weeklyLoginsData);
    //             await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
    //             console.log("Thursday Checked!" + weeklyLoginsData );
    //         } else if (currentDate.getDay() === 5) {
    //             weeklyLoginsData["FridayLogin"] = true;
    //             setWeeklyLogins(weeklyLoginsData);
    //             await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
    //             console.log("Friday Checked!" + weeklyLoginsData);
    //         } else if (currentDate.getDay() === 6) {
    //             weeklyLoginsData["SaturdayLogin"] = true;
    //             setWeeklyLogins(weeklyLoginsData);
    //             await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
    //             console.log("Saturday Checked!" + weeklyLoginsData);
    //         } else {
    //             console.log("Error with checking day? "+ currentDate);
    //         }
    //         counterCheck();
    //     } catch (error) {
    //         console.log("Weekly Logins Error: " + error)
    //     }
    // }

    // // Clear the daily logins for testing purposes
    // const clearDailyLogins = async () => {
    //     try {
    //         await AsyncStorage.setItem('DailyLogins', JSON.stringify(0));
    //         setDailyLogins(0);
    //         setConsecutiveDLs(0);

    //         // Comment these lines out if you want to clear without clearing the longest streak.
    //         await AsyncStorage.setItem('longestStreak', JSON.stringify(0));
    //         setLongestStreak(0);

    //         let serializedWeeklyLogins = {
    //             SundayLogin: false,
    //             MondayLogin: false,
    //             TuesdayLogin: false,
    //             WednesdayLogin: false,
    //             ThursdayLogin: false,
    //             FridayLogin: false,
    //             SaturdayLogin: false
    //         }
    //         await AsyncStorage.setItem("weeklyLogins", JSON.stringify(serializedWeeklyLogins));
    //         setWeeklyLogins(serializedWeeklyLogins);
    //         console.log('DailyLogins and WeeklyLogins cleared successfully.');
    //         // DailyIncrement();
    //     } catch (error) {
    //         console.log('Error clearing DailyLogins:', error);
    //     }
    // };

    // // Trick logic that it's a new day
    // const TrickToYesterday = async () => {
    //     try { 
    //         const yesterday = new Date();
    //         yesterday.setDate(yesterday.getDate() - 1);
    //         await AsyncStorage.setItem("LatestDate", yesterday.toLocaleDateString());
    //         console.log("Trick Date: " + yesterday);
    //     } catch(error) {
    //         console.log("Error with tricking: " + error);
    //     }
    // }

    // // Trick logic that it's a new day
    // const TrickToTomorrow = async () => {
    //     try { 
    //         const tomorrow = new Date();
    //         tomorrow.setDate(tomorrow.getDate() + 1);
    //         await AsyncStorage.setItem("LatestDate", tomorrow.toLocaleDateString());
    //         console.log("Trick Date: " + tomorrow);
    //     } catch(error) {
    //         console.log("Error with tricking: " + error);
    //     }
    // }

    // // Same as DailyIncrement except it includes the TrickToYesterday Function
    // // and this only applies manually, not on StartUp
    // const TestDailyIncrementYesterday = async () => {
    //     try {
    //         setDailyLogins(parseInt(await AsyncStorage.getItem("DailyLogins"), 10));
    //         let dailyLogs = parseInt(await AsyncStorage.getItem("DailyLogins"), 10);
    //         TrickToYesterday();
    //         updateWeeklyLogins();
    //         let storedDate = await AsyncStorage.getItem("LatestDate");
    //         let currentDate = new Date().toLocaleDateString();
    //         console.log("Stored Date: " + storedDate)
    //         console.log("Current Date: " + currentDate)
    //         console.log("Initial Daily Logins: " + dailyLogs);
    //         if (dailyLogs === 0) { // if it's their first day, create a counter in firebase and increment by 1
    //             addPersonalCounter();
    //             console.log("Incrementing by 1 from 0...");
    //             let newDL = await Counter();
    //             setDailyLogins(newDL);
    //         } else if (dailyLogs === null) { // null check
    //             console.log(dailyLogs);
    //         } else if (storedDate === currentDate) { // if already incremented in the day, return the previous amount
    //             console.log("Daily done today already.");
    //             let DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
    //             setDailyLogins(DL);
    //             counterCheck();
    //             console.log("Same daily logs: " + dailyLogs);
    //         } else { // new day incrementation
    //             console.log("Incrementing by 1...");
    //             await Counter();
    //             await AsyncStorage.setItem("LatestDate", currentDate);
    //             ConsecutiveDL();
    //             console.log("TDIY WeeklyLogins: " + weeklyLogins);
    //         };
    //     } catch (error) {
    //         console.log("DailyIncrement Error: " + error);
    //     };
    // };

    // // Same as DailyIncrement except it includes the TrickToTomorrow Function
    // // and this only applies manually, not on StartUp
    // const TestDailyIncrementTomorrow = async () => {
    //     try {
    //         setDailyLogins(parseInt(await AsyncStorage.getItem("DailyLogins"), 10));
    //         let dailyLogs = parseInt(await AsyncStorage.getItem("DailyLogins"), 10);
    //         TrickToTomorrow();
    //         updateWeeklyLogins();
    //         let storedDate = await AsyncStorage.getItem("LatestDate");
    //         let currentDate = new Date().toLocaleDateString();
    //         console.log("Stored Date: " + storedDate)
    //         console.log("Current Date: " + currentDate)
    //         console.log("Initial Daily Logins: " + dailyLogs);
    //         if (dailyLogs === 0) { // if it's their first day, create a counter in firebase and increment by 1
    //             addPersonalCounter();
    //             console.log("Incrementing by 1 from 0...");
    //             let newDL = await Counter();
    //             setDailyLogins(newDL);
    //         } else if (dailyLogs === null) { // null check
    //             console.log(dailyLogs);
    //         } else if (storedDate === currentDate) { // if already incremented in the day, return the previous amount
    //             console.log("Daily done today already.");
    //             let DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
    //             setDailyLogins(DL);
    //             counterCheck();
    //             console.log("Same daily logs: " + dailyLogs);
    //         } else { // new day incrementation
    //             console.log("Incrementing by 1...");
    //             await Counter();
    //             await AsyncStorage.setItem("LatestDate", currentDate);
    //             ConsecutiveDL();
    //         };
    //     } catch (error) {
    //         console.log("DailyIncrement Error: " + error);
    //     };
    // };

    return(
        <View style={progressPage.fullPageContainer}>
            <Text style={progressPage.title}>Weekly Progress</Text>
            <View style={progressPage.rowOfCheckboxes}>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={weeklyLogins.SundayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Sun</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={weeklyLogins.MondayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Mon</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={weeklyLogins.TuesdayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Tue</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={weeklyLogins.WednesdayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Wed</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={weeklyLogins.ThursdayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Thu</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={weeklyLogins.FridayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                    />
                    <Text style={progressPage.checkboxLabel}>Fri</Text>
                </View>
                <View style={progressPage.checkboxContainer}>
                    <Image
                        style={progressPage.weeklyCheckbox}
                        source={weeklyLogins.SundayLogin ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
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
            {/* <View style={[progressPage.statContainer, {marginTop: -50}]}>
                <Image
                    style={progressPage.statBox}
                    source={require("../imgs/squareCheckbox.png")}
                />
                <Text style={progressPage.statNumber}>{longestStreak}</Text>
                <Text style={progressPage.statLabel}>Longest Login Streak</Text>
            </View> */}
            {/* <Button title="Increment +1 (Testing Yesterday Date)" onPress={TestDailyIncrementYesterday}></Button>
            <Button title="Increment +1 (Testing Tomrorow Date)" onPress={TestDailyIncrementTomorrow}></Button>
            <Button title="Remove All Count (Testing Only)" onPress={clearDailyLogins}></Button> */}
            {/* {<Text>Total Daily Logins: {dailyLogins}</Text>}
            {<Text>Consecutive Logins: {consecutiveDLs}</Text>}
            {<Text>Longest Streak: {longestStreak}</Text>} */}
            {/* <Text>Weekly Logins:</Text>
            {<Text>Sunday: {weeklyLogins.SundayLogin ? "✅" : "❌"}</Text>}
            {<Text>Monday: {weeklyLogins.MondayLogin ? "✅" : "❌"}</Text>}
            {<Text>Tuesday: {weeklyLogins.TuesdayLogin ? "✅" : "❌"}</Text>}
            {<Text>Wednesday: {weeklyLogins.WednesdayLogin ? "✅" : "❌"}</Text>}
            {<Text>Thursday: {weeklyLogins.ThursdayLogin ? "✅" : "❌"}</Text>}
            {<Text>Friday: {weeklyLogins.FridayLogin ? "✅" : "❌"}</Text>}
            {<Text>Saturday: {weeklyLogins.SaturdayLogin ? "✅" : "❌"}</Text>} */}
        </View>
    );
};

// If the user has logged in today, just set the daily logins to already stored value
// Else, increment by 1
export const DailyIncrement = async (dailyLogins, setDailyLogins, consecutiveDLs, setConsecutiveDLs, longestStreak, setLongestStreak, weeklyLogins, setWeeklyLogins) => {
    // const [dailyLogins, setDailyLogins] = useDailyLogins();
    // const [consecutiveDLs, setConsecutiveDLs] = useConsecutiveLogins();
    // const [longestStreak, setLongestStreak] = useLongestStreak();
    // const [weeklyLogins, setWeeklyLogins] = useWeeklyLogins();
    try {
        // setDailyLogins(parseInt(await AsyncStorage.getItem("DailyLogins"), 10));
        // setConsecutiveDLs(await AsyncStorage.getItem("ConsecutiveDLs"));
        let dailyLogs = parseInt(await AsyncStorage.getItem("DailyLogins"), 10);
        let storedDate = await AsyncStorage.getItem("LatestDate");
        let currentDate = new Date().toLocaleDateString();
        console.log("Stored Date: " + storedDate)
        console.log("Current Date: " + currentDate)
        console.log("Initial Daily Logins: " + dailyLogs);
        if (dailyLogs === 0 || dailyLogs === null) { // if it's their first day, create a counter in firebase and increment by 1
            setDailyLogins(0);
            await addPersonalCounter(setDailyLogins, setConsecutiveDLs, setLongestStreak, setWeeklyLogins);
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
            console.log("Same daily logs: " + dailyLogs);
        } else { // new day incrementation
            console.log("Incrementing by 1...");
            await Counter(setDailyLogins);
            await AsyncStorage.setItem("LatestDate", currentDate);
            ConsecutiveDL(setConsecutiveDLs, setLongestStreak);
            updateWeeklyLogins(setWeeklyLogins);
        };
    } catch (error) {
        console.log("DailyIncrement Error: " + error);
    };
};

export const addPersonalCounter = async (dailyLogins, setDailyLogins, consecutiveDLs, setConsecutiveDLs, longestStreak, setLongestStreak, weeklyLogins, setWeeklyLogins) => {
    // const [dailyLogins, setDailyLogins] = useDailyLoginsState();
    // const [consecutiveDLs, setConsecutiveDLs] = useConsecutiveDLsState();
    // const [longestStreak, setLongestStreak] = useLongestStreakState();
    // const [weeklyLogins, setWeeklyLogins] = useWeeklyLoginsState();
    try {
        const email = await getCurrEmail();
        let currentUser = email;
        let firstDL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
        let lastLogin = await AsyncStorage.getItem("LatestDate");
        let consecutiveDLs = parseInt(await AsyncStorage.getItem("ConsecutiveDLs"), 10);
        let longestStreak = parseInt(await AsyncStorage.getItem("longestStreak"), 10);
        await AsyncStorage.setItem("ConsecutiveDLs", JSON.stringify(1));
        let serializedWeeklyLogins = await AsyncStorage.getItem("weeklyLogins");
        await AsyncStorage.setItem("weeklyLogins", serializedWeeklyLogins);
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
            userLongestStreak: longestStreak.toString(),
            userWeeklyLogins: serializedWeeklyLogins
        });
        console.log("New User DL Created: " + currentUser);
    } catch(error) {
        console.log("New User DL Error: " + error);
    };
};

// Function to increment "DailyLogins"
export const Counter = async (dailyLogins, setDailyLogins, consecutiveDLs, setConsecutiveDLs, longestStreak, setLongestStreak, weeklyLogins, setWeeklyLogins) => {
    // const [dailyLogins, setDailyLogins] = useDailyLoginsState();
    // const [consecutiveDLs, setConsecutiveDLs] = useConsecutiveDLsState();
    // const [longestStreak, setLongestStreak] = useLongestStreakState();
    // const [weeklyLogins, setWeeklyLogins] = useWeeklyLoginsState();
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
export const counterCheck = async (dailyLogins, setDailyLogins, consecutiveDLs, setConsecutiveDLs, longestStreak, setLongestStreak, weeklyLogins, setWeeklyLogins) => {
    // const [dailyLogins, setDailyLogins] = useDailyLoginsState();
    // const [consecutiveDLs, setConsecutiveDLs] = useConsecutiveDLsState();
    // const [longestStreak, setLongestStreak] = useLongestStreakState();
    // const [weeklyLogins, setWeeklyLogins] = useWeeklyLoginsState();
    try {
        const email = await getCurrEmail();
        let currentUser = email;
        let currentDL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
        let lastLogin = await AsyncStorage.getItem("LatestDate");
        let consecutiveDLs = parseInt(await AsyncStorage.getItem("ConsecutiveDLs"), 10);
        let longestStreak = parseInt(await AsyncStorage.getItem("longestStreak"), 10);
        let serializedWeeklyLogins = JSON.stringify(await AsyncStorage.getItem("weeklyLogins"));
        if (longestStreak < 1 || longestStreak === null) {
            await AsyncStorage.setItem("longestStreak", JSON.stringify(1))
            setLongestStreak(1);
            console.log("Longest Streak set to 1.");
        } else {
            console.log("LS Already Made.");
        }
        await setDoc(doc(db, currentUser, "DailyLoginDoc"), {
            userDL: currentDL.toString(),
            userLastLogin: lastLogin.toString(),
            userConsecutiveLogins: consecutiveDLs.toString(),
            userLongestStreak: longestStreak.toString(),
            userWeeklyLogins: serializedWeeklyLogins.toString()
        });
        console.log("CounterCheck WeeklyLogins: " + serializedWeeklyLogins);
        console.log("Current DL: " + currentDL)
    } catch(error) {
        console.log("Current DL Error: " + error);
    }
}

export const ConsecutiveDL = async (dailyLogins, setDailyLogins, consecutiveDLs, setConsecutiveDLs, longestStreak, setLongestStreak, weeklyLogins, setWeeklyLogins) => {
    // const [dailyLogins, setDailyLogins] = useDailyLoginsState();
    // const [consecutiveDLs, setConsecutiveDLs] = useConsecutiveDLsState();
    // const [longestStreak, setLongestStreak] = useLongestStreakState();
    // const [weeklyLogins, setWeeklyLogins] = useWeeklyLoginsState();
    try {
        const email = await getCurrEmail();
        let currentUser = email;
        let consDLs = parseInt(await AsyncStorage.getItem('ConsecutiveDLs'), 10);
        let dailyLogins = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
        let longestStreak = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
        if (dailyLogins >= consDLs) {
            await AsyncStorage.setItem('ConsecutiveDLs', JSON.stringify(dailyLogins))
            setConsecutiveDLs(dailyLogins);
            consDLs = parseInt(await AsyncStorage.getItem('ConsecutiveDLs'), 10);
            console.log("New Consecutive Login: " + consDLs)
        }
        if (consDLs >= longestStreak) { // if consecutive streak is equal or greater to the longest streak
            await AsyncStorage.setItem('longestStreak', JSON.stringify(consDLs))
            setLongestStreak(consDLs); // set them equal to each other
            longestStreak = parseInt(await AsyncStorage.getItem('longestStreak'), 10);
            console.log("The New longest streak: " + longestStreak);
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
            setLongestStreak(longestStreak);
            console.log("Same day, no consecutive changes. Current Streak: " + longestStreak); // do nothing to consecutive count
        }
    } catch (error) {
        console.log("Consecutive Error: " + error);
    }
};

export const updateWeeklyLogins = async (dailyLogins, setDailyLogins, consecutiveDLs, setConsecutiveDLs, longestStreak, setLongestStreak, weeklyLogins, setWeeklyLogins) => { 
    // const [dailyLogins, setDailyLogins] = useDailyLoginsState();
    // const [consecutiveDLs, setConsecutiveDLs] = useConsecutiveDLsState();
    // const [longestStreak, setLongestStreak] = useLongestStreakState();
    // const [weeklyLogins, setWeeklyLogins] = useWeeklyLoginsState();
    try {
        const email = await getCurrEmail();
        let currentUser = email;
        const storedDate = await AsyncStorage.getItem("LatestDate");
        let type = typeof storedDate;
        console.log('Type of value (StoredDate): ', type);
        // Parsing the date is necessary because of
        // how dates are saved in AsyncStorage
        function parseDMY(s) {
            var b = s.split(/\D+/);
            // Note: Date(year, month, day) format
            // and JS goes by 0 format so need a -1 for month
            var d = new Date(b[2], b[0]-1, b[1]);
            d.setFullYear(b[2]);
            return d && d.getMonth() == b[0]-1? d : new Date(NaN);
        }
        console.log("Unparsed: " + storedDate);
        const currentDate = parseDMY(storedDate);
        console.log("Parsed Current Date: " + currentDate);

        let weeklyLoginsData = await AsyncStorage.getItem("weeklyLogins");
        if (weeklyLoginsData === null) {
            weeklyLoginsData = {
                SundayLogin: false,
                MondayLogin: false,
                TuesdayLogin: false,
                WednesdayLogin: false,
                ThursdayLogin: false,
                FridayLogin: false,
                SaturdayLogin: false
            };
        } else {
            // console.log("316 new: " + weeklyLoginsData);
            weeklyLoginsData = JSON.parse(weeklyLoginsData); // JSON.parse() may be needed
        }
        console.log("New weekly login data: " + weeklyLoginsData);

        if (currentDate.getDay() === 0) {
            for (const day in weeklyLoginsData) {
                weeklyLoginsData[day] = false;
            }
            weeklyLoginsData["SundayLogin"] = true;
            setWeeklyLogins(weeklyLoginsData);
            await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
            console.log("Sunday Checked!" + weeklyLoginsData);
        } else if (currentDate.getDay() === 1) {
            weeklyLoginsData["MondayLogin"] = true;
            setWeeklyLogins(weeklyLoginsData);
            await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
            console.log("Monday Checked!" + weeklyLoginsData);
        } else if (currentDate.getDay() === 2) {
            weeklyLoginsData["TuesdayLogin"] = true;
            setWeeklyLogins(weeklyLoginsData);
            await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
            console.log("Tuesday Checked!" + weeklyLoginsData);
        } else if (currentDate.getDay() === 3) {
            weeklyLoginsData["WednesdayLogin"] = true;
            setWeeklyLogins(weeklyLoginsData);
            await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
            console.log("Wednesday Checked!" + weeklyLoginsData);
        } else if (currentDate.getDay() === 4) {
            weeklyLoginsData["ThursdayLogin"] = true;
            setWeeklyLogins(weeklyLoginsData);
            await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
            console.log("Thursday Checked!" + weeklyLoginsData );
        } else if (currentDate.getDay() === 5) {
            weeklyLoginsData["FridayLogin"] = true;
            setWeeklyLogins(weeklyLoginsData);
            await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
            console.log("Friday Checked!" + weeklyLoginsData);
        } else if (currentDate.getDay() === 6) {
            weeklyLoginsData["SaturdayLogin"] = true;
            setWeeklyLogins(weeklyLoginsData);
            await AsyncStorage.setItem("weeklyLogins", JSON.stringify(weeklyLoginsData));
            console.log("Saturday Checked!" + weeklyLoginsData);
        } else {
            console.log("Error with checking day? "+ currentDate);
        }
        counterCheck();
    } catch (error) {
        console.log("Weekly Logins Error: " + error)
    }
}