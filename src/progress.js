import React, {useState, useEffect} from "react";
import { View, Text, Button } from "react-native";

import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "./userInfo.js";
import { getCurrEmail } from "./account.js";

export const ProgressTracker = ({navigation, personalInfo}) => {
    // This state allows us to display the daily logins.
    // Note: The code always tries to match dailyLogins with the .getItem('DailyLogins')
    // These two values should always try to be the same, but they are different variables.
    const [dailyLogins, setDailyLogins] = useState(null);

    // Below is unnecessary code, could be helpful in the future -> delete near finishing project
    // getDailyLoginCount = async () => {
    //     try {
    //         // Retrieves the "DailyLogins" item which will contain an int
    //         const DL = await AsyncStorage.getItem('DailyLogins');
    //         // if it exists, show it in the console
    //         if (DL !== null) {
    //         // Checking if data exists
    //             console.log(DL);
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //         console.log("error " + error);
    //     }
    // };

    // If the user has logged in today, just set the daily logins to already stored value
    // Else, increment by 1
    // useEffect (() => {
        DailyIncrement = async () => {
            try {
                const storedDate = await AsyncStorage.getItem("LastestDate");
                const currentDate = new Date().toLocaleDateString();
    
                if (storedDate === currentDate) {
                    console.log("Daily done today already.");
                    const DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
                    setDailyLogins(DL);
                } else {
                    console.log("Incrementing by 1...");
                    const newDL = await Counter();
                    setDailyLogins(newDL);
                };
            } catch (error) {
                console.log("error " + error);
            };
        };
        // Always making sure user has at least 1 daily login (since they are currently using the app.)
        if (dailyLogins === 0) {
            DailyIncrement();
        };
    // });

    // Function to increment "DailyLogins"
    const Counter = async () => {
        try {
            // Retrieve the item from the AsyncStorage
            let DL = parseInt(await AsyncStorage.getItem('DailyLogins'), 10);
            // Check the type (testing purposes)
            let type = typeof DL;
            console.log('Type of value:', type);
            console.log(DL);
            // New variable to hold the incremented value, 
            // then input this incremented value into AsyncStorage.
            let newDL = DL + 1;
            await AsyncStorage.setItem('DailyLogins', JSON.stringify(newDL));
            console.log(newDL);
            // Always remember to sync the AsyncStorage with the display value
            setDailyLogins(newDL);
            return newDL;
        } catch (error) {
            console.log("error " + error);
        };
    };   

    // Clear the daily logins for testing purposes
    const clearDailyLogins = async () => {
        try {
            await AsyncStorage.setItem('DailyLogins', JSON.stringify(0));
            setDailyLogins(0);
            console.log('DailyLogins cleared successfully.');
        } catch (error) {
            console.log('Error clearing DailyLogins:', error);
        }
    };

    return(
        <View style={styles.container}>
            <Text>Progress Tracker</Text>
            <Button title="Increment +1 (Testing Only)" onPress={DailyIncrement}></Button>
            <Button title="Remove All Count" onPress={clearDailyLogins}></Button>
            {<Text>Daily Logins: {dailyLogins}</Text>}
        </View>
    );
};