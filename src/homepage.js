import React from "react";
import { View, Text, Button, TouchableOpacity, ImageBackground } from "react-native";
import { Image } from 'expo-image'; //makes the imgs load faster
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Feather, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import { homePageMoobie, styles, homePage } from "./styles.js";
import { getMoobie } from "./moobie.js";
import { getCurrency } from "./currency.js";
import FastImage from 'react-native-fast-image' //this wasn't working maybe try it later

import { DailyIncrement, ConsecutiveDL, updateWeeklyLogins } from "./progress.js";
import { useDailyLogins } from './dailyLoginsContext';
import { useConsecutiveLogins } from './consecutiveLoginsContext';
import { useLongestStreak } from "./longestStreakContext.js";
import { useWeeklyLogins } from "./weeklyLoginsContext.js";

//Main home page 
export const HomePage = ({navigation}) =>{
    const {bodyPart, handlePart} = getMoobie();
    const {currency, updateCurrency} = getCurrency();

    const { dailyLogins, setDailyLogins } = useDailyLogins();
    const { consecutiveDLs, setConsecutiveDLs } = useConsecutiveLogins();
    const { longestStreak, setLongestStreak } = useLongestStreak();
    const { weeklyLogins, setWeeklyLogins } = useWeeklyLogins();

    const setBody = async () => {
        try {
            const [currHead, currBody, currLowerBody] = await Promise.all([
                AsyncStorage.getItem("moobie_head"),
                AsyncStorage.getItem("moobie_body"),
                AsyncStorage.getItem("moobie_lowerBody")
            ]);
    
            handlePart("head", JSON.parse(currHead));
            handlePart("body", JSON.parse(currBody)); 
            handlePart("lowerBody", JSON.parse(currLowerBody)); 

        } catch (error) {
            console.error("Error in setBody:", error);
        }
    };

    const handleDailyIncrement = async (dailyLogins, setDailyLogins) => {
        try {
            await DailyIncrement(
                dailyLogins,
                setDailyLogins,
                consecutiveDLs,
                setConsecutiveDLs,
                longestStreak,
                setLongestStreak,
                weeklyLogins,
                setWeeklyLogins
            );
            console.log("Daily incrementation successful");
        } catch (error) {
            console.log("Error with daily incrementation: " + error);
        }
    };

    const handleConsecutiveLogins = async (setConsecutiveDLs, setLongestStreak) => {
        try {
            await ConsecutiveDL(
                dailyLogins,
                setDailyLogins,
                consecutiveDLs,
                setConsecutiveDLs,
                longestStreak,
                setLongestStreak,
                weeklyLogins,
                setWeeklyLogins
            );
            console.log("Consecutive incrementation successful");
        } catch (error) {
            console.log("Error with consecutive incrementation: " + error);
        }
    };

    const handleWeeklyLogins = async (setWeeklyLogins) => {
        try {
            await updateWeeklyLogins(
                dailyLogins,
                setDailyLogins,
                consecutiveDLs,
                setConsecutiveDLs,
                longestStreak,
                setLongestStreak,
                weeklyLogins,
                setWeeklyLogins
            );
            console.log("Weekly Logins incrementation successful");
        } catch (error) {
            console.log("Error with weekly logins incrementation: " + error);
        }
    };

    useFocusEffect(
        React.useCallback(()=>{
            setBody();
            console.log("body part changed");
            handleDailyIncrement(dailyLogins, setDailyLogins);
            handleConsecutiveLogins(setConsecutiveDLs, setLongestStreak);
            handleWeeklyLogins(setWeeklyLogins);
        }, [dailyLogins])
    )

    return(
        // trying to get the background to work but its not working
        <ImageBackground 
            source = {require("../imgs/backgrounds/background1.png")} 
            style = {homePage.background}
            resizeMode = "cover"
            >
            <View style = {styles.container}>
                <Image source = {bodyPart.head} style = {homePageMoobie.moobie_head}/>
                <Image source = {bodyPart.body} style = {homePageMoobie.moobie_body}/>
                <Image source = {bodyPart.lowerBody} style = {homePageMoobie.moobie_feet}/>

                <View style = {homePage.currency}>
                    <Image 
                        source = {require("../imgs/honeycoin.png")}
                        style = {{width: 60, height: 50}}
                    />
                    <Text style = {{fontSize: 30, marginTop: 10}}>{currency}</Text>
                </View>
                
                
                {/* Positions the setting icon */}
                <View style = {{ position: 'absolute', top: 0, right: 0, paddingTop: 80, paddingRight: 10 }}>
                    <IconButton
                        onPress = {() => navigation.navigate("Settings Page")}
                        iconName = "settings"
                        iconComponent = {Feather}
                        size = {30}
                        color = "black"
                    />
                </View>
                
                {/* All icons on the bottom bar */}
                <View style = {homePage.iconBarContainer}>
                    <View style = {homePage.iconBar}>
                        <IconButton
                            onPress = {() => navigation.navigate('Journal Home Page')}
                            iconName = "pencil-alt"
                            iconComponent = {FontAwesome5}
                            size = {30}
                            color = "black"
                        />
                        <IconButton
                            onPress = {() => navigation.navigate("Progress Tracking")}
                            iconName = "calendar"
                            iconComponent = {Entypo}
                            size = {30}
                            color = "black"
                        />
                        <IconButton
                            onPress = {() => navigation.navigate("Store Page")}
                            iconName = "store"
                            iconComponent = {FontAwesome5}
                            size = {30}
                            color = "black"
                        />
                        <IconButton
                            onPress = {() => navigation.navigate("Closet Page")}
                            iconName = "hanger"
                            iconComponent = {MaterialCommunityIcons}
                            size = {30}
                            color = "black"
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};



export const IconButton = ({ onPress, iconName, iconComponent: IconComponent, size, color }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <IconComponent name={iconName} size={size} color={color} />
      </TouchableOpacity>
    );
  };
  
 