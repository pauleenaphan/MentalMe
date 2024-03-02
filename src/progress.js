import React from "react";
import { View, Text, Button } from "react-native";

import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "./userInfo.js";
import { getCurrEmail } from "./account.js";

export const ProgressTracker = ({navigation, personalInfo}) => {
    // Function to fetch the data(?)
    getDailyLoginCount = async () => {
        try {
            // Retrieves the "DailyLogins" item which will contain an int
            const DL = await AsyncStorage.getItem('DailyLogins');
            // if it exists, show it in the console
            if (DL !== null) {
            // Checking if data exists
            console.log(DL);
            }
        } catch (error) {
            // Error retrieving data
            console.log("error " + error);
        }
    };

    // Function to increment "DailyLogins"
    const Counter = async () => {
        // Temporary check to see if DailyLogins is 0
        try {
            const DL = await AsyncStorage.getItem('DailyLogins');
            if (DL === 0) {
                setDailyLogins(DL + 1)
            }
            console.log(DL);
            return DL;
        } catch (error) {
            console.log("error " + error);
        }
    }   

    return(
        <View style={styles.container}>
            <Text>Progress Tracker</Text>
            {/* <Text>{Counter}</Text> */}
        </View>
    );
};