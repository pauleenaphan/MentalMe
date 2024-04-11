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

import { dailyIncrement } from "./progress.js";
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

//Main home page 
export const HomePage = ({navigation}) =>{
    const {bodyPart, handlePart} = getMoobie();
    const {currency, updateCurrency} = getCurrency();

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

    //load moobie on the homepage
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

    const handleDailyIncrement = async ({
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
                await dailyIncrement({
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
                console.log("Daily incrementation successful");
            } catch (error) {
                console.log("Error with daily incrementation: " + error);
            }
    };

    useFocusEffect(
        React.useCallback(()=>{
            setBody();
            console.log("body part changed");
            handleDailyIncrement({
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
                updateCurrency});
        }, [])
    )

    return(
        <ImageBackground 
            source = {require("../imgs/backgrounds/background1.png")} 
            style = {homePage.background}>
                
            <View style = {styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Chat Page')} activeOpacity={0.9}>
                    <View style = {{}}>
                        <Image source = {bodyPart.head} style = {{height: 400, width: 400, marginTop: -550, left: 18}}/>
                        <Image source = {bodyPart.body} style = {{height: 400, width: 500, marginTop: -353}}/>
                        <Image source = {bodyPart.lowerBody} style = {{height: 400, width: 400, marginTop: -297, left: 35}}/>
                    </View>
                    
                </TouchableOpacity>
                
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: -830, paddingRight: 20, paddingLeft: 10, paddingTop:100, paddingBottom: 20}}>
                    <View style = {{alignItems: 'center', flexDirection: 'row'}}>
                        <Image 
                            source = {require("../imgs/honeycoin.png")}
                            style = {{width: 60, height: 50}}
                        />
                        <Text style = {{fontSize: 30, marginTop: 10}}>{currency}</Text>
                    </View>
                    {/* Positions the setting icon */}
                    <View style = {{}}>
                        <IconButton
                            onPress = {() => navigation.navigate("Settings Page")}
                            iconName = "settings"
                            iconComponent = {Feather}
                            size = {40}
                            color = "black"
                        />
                    </View>
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
                            size = {28}
                            color = "black"
                        />
                        <View style = {{marginTop: -5}}>
                            <IconButton
                                onPress = {() => navigation.navigate("Closet Page")}
                                iconName = "hanger"
                                iconComponent = {MaterialCommunityIcons}
                                size = {38}
                                color = "black"
                            />
                        </View>
                        
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

//used to created a new icon from the expo vector icons
export const IconButton = ({ onPress, iconName, iconComponent: IconComponent, size, color }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <IconComponent name={iconName} size={size} color={color} />
      </TouchableOpacity>
    );
  };
  
 