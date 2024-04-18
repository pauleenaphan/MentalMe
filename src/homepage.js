import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, ImageBackground } from "react-native";
import { Image } from 'expo-image'; //makes the imgs load faster
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Feather, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase/index.js";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore"; 

import { homePageMoobie, styles, homePage, notifStyle } from "./styles.js";
import { getMoobie } from "./moobie.js";
import { getCurrency } from "./currency.js";
import { getCurrEmail } from "./account.js";
import { getDate } from "./journal.js";

import { dailyIncrement } from "./progress.js";
import { useDailyLogins } from './progress_files/dailyLoginsContext.js';
import { useConsecutiveLogins } from './progress_files/consecutiveLoginsContext.js';
import { useLongestStreak } from "./progress_files/longestStreakContext.js";
import { useSundayLogin, useMondayLogin, useTuesdayLogin, 
         useWednesdayLogin, useThursdayLogin, 
         useFridayLogin, useSaturdayLogin } from './progress_files/weeklyLoginContext.js';

import { useShowNotification } from "./progress_files/showNotificationContext.js";


//Main home page 
export const HomePage = ({navigation}) =>{
    const [taskPopup, setTaskPopup] = useState(false);
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

    const { showNotification, setShowNotification } = useShowNotification();

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

    const resetTask = async () =>{
        try{
            const currUserEmail = await getCurrEmail();
            const loginDate = await getDoc(doc(db, currUserEmail, "ProgressTrackingDoc"));
            console.log("LAST LOGIN ", loginDate.data().userLastLogin);
            console.log("THIS IS TODAYS DATE", getDate());
            if(loginDate == getDate()){
                console.log("same date as last login");
            }

        }catch(error){
            console.log("Error ", error);
        }
    }


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
        currency, updateCurrency,
        showNotification, setShowNotification}) => {
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
                    updateCurrency,
                    setShowNotification
                });
                console.log("Daily incrementation successful");
            } catch (error) {
                console.log("Error with daily incrementation: " + error);
            }
    };

    const toggleTaskPopup = () =>{
        setTaskPopup(!taskPopup);
    }

    const toggleDailyLoginPopUp = () =>{
        setShowNotification(!showNotification);
    }

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
                updateCurrency,
                setShowNotification});
            resetTask();
                
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
                {/* Icon for the daily task */}
                <View style = {{marginRight: 'auto', marginLeft: 30}}>
                    <IconButton
                        onPress = {() =>{ toggleTaskPopup() }}
                        iconName = "tasks"
                        iconComponent = {FontAwesome5}
                        size = {40}
                        color = "black"
                    />
                </View>
                <Modal
                    isVisible = {taskPopup}
                    animationIn = {'zoomIn'}
                    animationOut = {'zoomOut'}
                    onBackdropPress={() => toggleTaskPopup()}
                    backdropOpacity={.35}
                >
                    <View style = {{backgroundColor: 'white', padding: 20}}> 
                        {/* <IconButton
                            onPress={() => {
                                navigation.navigate("Home Page")
                                toggleTaskPopup();
                            }}
                            iconName="arrow-back"
                            iconComponent={Ionicons}
                            size={30}
                            color="black"
                        /> */}
                        <Text> Daily Task </Text>
                        <Text> Daily Login: </Text>
                        <Text> Completed Journal Entry: </Text>
                        <Text> Weekly Login: </Text>
                    </View>
                    
                </Modal>
                
                <Modal
                    isVisible = { showNotification } // taskPopup for testing and comment out ^^^
                    animationIn = {'zoomIn'}
                    animationOut = {'zoomOut'}
                    onBackdropPress={() => toggleDailyLoginPopUp()} // toggleTaskPopup() for testing
                    backdropOpacity={.35}
                >
                    <View style = {{backgroundColor: 'white', padding: 20}}>
                        {/* <IconButton
                            onPress={() => {
                                navigation.navigate("Home Page")
                                toggleDailyLoginPopUp();
                            }}
                            iconName="arrow-back"
                            iconComponent={Ionicons}
                            size={30}
                            color="black"
                        /> */}
                        <View style = {{alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Task Completed!</Text>
                            <Text style={{marginTop: 5}}>Daily Login ✅</Text>
                            <Text>Reward: +1 Honey Coin</Text>
                        </View>
                    </View>
                </Modal>

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
  
 