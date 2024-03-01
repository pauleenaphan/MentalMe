import React from "react";
import { View, Text, Button } from "react-native"

import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "./userInfo.js";
import { getCurrEmail } from "./account.js";

export const ProgressTracker = ({navigation, personalInfo}) => {

    getDailyLoginCount = async () => {
        try {
            const DL = await AsyncStorage.getItem('DailyLogins');
            if (DL !== null) {
            // Checking if data exists
            console.log(DL);
            }
        } catch (error) {
            // Error retrieving data
            console.log("error " + error);
        }
    };

    function Counter() {
        if (AsyncStorage.getItem('DailyLogins') === 0) {
            setDailyLogins(AsyncStorage.getItem('DailyLogins') + 1)
        }
        return AsyncStorage.getItem('DailyLogins');
    }   

    return(
        <View style={styles.container}>
            <Text>Progress Tracker</Text>
            <Text>{Counter}</Text>
        </View>
    )
}