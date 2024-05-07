import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, ImageBackground } from "react-native";
import { Image } from 'expo-image'; //makes the imgs load faster
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Feather, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";

import { styles, homePage, userTaskPopup } from "./styles.js";
import { getMoobie } from "./moobie.js";
import { getCurrency } from "./currency.js";
import { getTaskInfo } from "./task.js";

import { dailyIncrement } from "./progress.js";
import { useDailyLogins } from './progress_files/dailyLoginsContext.js';
import { useConsecutiveLogins } from './progress_files/consecutiveLoginsContext.js';
import { useLongestStreak } from "./progress_files/longestStreakContext.js";
import { useSundayLogin, useMondayLogin, useTuesdayLogin, 
         useWednesdayLogin, useThursdayLogin, 
         useFridayLogin, useSaturdayLogin } from './progress_files/weeklyLoginContext.js';

import { useShowDailyNotification } from "./progress_files/showDailyNotificationContext.js";
import { useShowJournalNotification } from "./progress_files/showJournalNotificationContext.js";
import { useShowWeeklyNotification } from "./progress_files/showWeeklyNotificationContext.js";


//Main home page 
export const HomePage = ({navigation}) =>{
    const [taskPopup, setTaskPopup] = useState(false);
    const {bodyPart, handlePart} = getMoobie();
    const {currency, updateCurrency} = getCurrency();
    const {setJournalTask, setWeeklyLogin, journalTask, weeklyLogin} = getTaskInfo();

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

    const { showDailyNotification, setShowDailyNotification } = useShowDailyNotification();
    const { showJournalNotification, setShowJournalNotification } = useShowJournalNotification();
    const { showWeeklyNotification, setShowWeeklyNotification } = useShowWeeklyNotification();

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
        currency, updateCurrency,
        showDailyNotification, setShowDailyNotification,
        showWeeklyNotification, setShowWeeklyNotification,
        journalTask, setJournalTask,
        weeklyLogin, setWeeklyLogin}) => {
            try {
                await dailyIncrement({
                    setDailyLogins, setConsecutiveDLs, setLongestStreak,
                    setSundayLogin, setMondayLogin, setTuesdayLogin,
                    setWednesdayLogin, setThursdayLogin, setFridayLogin,
                    setSaturdayLogin, updateCurrency, setShowDailyNotification,
                    setShowWeeklyNotification, journalTask, setJournalTask, 
                    weeklyLogin, setWeeklyLogin
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
        setShowDailyNotification(!showDailyNotification);
    }

    const toggleWeeklyLoginPopUp = () =>{
        setShowWeeklyNotification(!showWeeklyNotification);
    }

    const toggleJournalLoginPopUp = () =>{
        setShowJournalNotification(!showJournalNotification);
    }

    useFocusEffect(
        React.useCallback(()=>{
            setBody();
            console.log("body part changed");
            handleDailyIncrement({
                setDailyLogins, setConsecutiveDLs, setLongestStreak, 
                setSundayLogin, setMondayLogin, setTuesdayLogin, 
                setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                setSaturdayLogin, updateCurrency, setShowDailyNotification,
                setShowWeeklyNotification, journalTask, setJournalTask, 
                weeklyLogin, setWeeklyLogin})
                // .then(() => {
                //     resetTask();
                // });
        }, [])
    )

    return(
        <ImageBackground 
            source = {require("../imgs/backgrounds/background1.png")} 
            style = {homePage.background}>
                
            <View style = {{height: "100%"}}>
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: "10%",}}>
                    <View style = {{alignItems: 'center', flexDirection: 'row', marginLeft: 10}}>
                        <Image 
                            source = {require("../imgs/honeycoin.png")}
                            style = {{width: 60, height: 50}}
                        />
                        <Text style = {{fontSize: 30, marginTop: 10}}>{currency}</Text>
                    </View>
                    {/* Positions the setting icon */}
                    <View style = {{marginRight: 10}}>
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
                <View style = {{marginRight: 'auto', marginLeft: 27, height: "5%"}}>
                    <IconButton
                        onPress = {() =>{ toggleTaskPopup() }}
                        iconName = "tasks"
                        iconComponent = {FontAwesome5}
                        size = {40}
                        color = "black"
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Chat Page')} activeOpacity={0.9}>
                    <View style = {{justifyContent: 'center', alignItems: 'center', height: "77%"}}>
                        <Image source = {bodyPart.head} style = {{position: "absolute", height: "100%", width: "100%", top: "11%", left:"-3%" }}/>
                        <Image source = {bodyPart.body} style = {{position: "absolute", height: "110%", width: "112%", top: "15%", left: "-1%", left: "-3%"}}/>
                        <Image source = {bodyPart.lowerBody} style = {{position: "absolute", height: "100%", width: "98%", top: "36%", left: "1%"}}/>
                    </View>
                </TouchableOpacity>
                <Modal
                    isVisible = {taskPopup}
                    animationIn = {'zoomIn'}
                    animationOut = {'zoomOut'}
                    onBackdropPress={() => toggleTaskPopup()}
                    backdropOpacity={.35}
                >
                    <View style = {{backgroundColor: '#B6D3B3', padding: 30, borderRadius: 10}}> 
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
                        <TouchableOpacity
                            onPress = {() => toggleTaskPopup()}
                        >
                            <Text style = {userTaskPopup.xBtn}> x </Text>
                        </TouchableOpacity>
                        <Text style = {userTaskPopup.title}> Daily Task </Text>
                        <Text style = {userTaskPopup.caption}> Moobie is counting on you! </Text>
                        <View style = {userTaskPopup.taskContainer}>
                            <View style = {userTaskPopup.taskNameContainer}>
                                <View>
                                    <Text style = {userTaskPopup.taskName}> Daily Login </Text>
                                    <Text> Login daily</Text>
                                </View>
                                <View>  
                                    <Text style = {userTaskPopup.taskName}> Journal Entry </Text>
                                    <Text> Write a journal entry today  </Text>
                                </View>
                                <View>
                                    <Text style = {userTaskPopup.taskName}> Weekly Login </Text>
                                    <Text> Login 7 days a week</Text> 
                                </View>
                            </View>
                            
                            <View style = {userTaskPopup.amtContainer}>
                                <View style = {userTaskPopup.amtPerContainer}>
                                    <Text style = {userTaskPopup.plusAmt}> +1 </Text>
                                    <Image source = {require("../imgs/honeycoin.png")} style = {userTaskPopup.honeyCoin}/>
                                </View>
                                <View style = {userTaskPopup.amtPerContainer}>
                                <Text style = {userTaskPopup.plusAmt}> +1 </Text>
                                    <Image source = {require("../imgs/honeycoin.png")} style = {userTaskPopup.honeyCoin}/>
                                </View>
                                <View style = {userTaskPopup.amtPerContainer}>
                                    <Text style = {userTaskPopup.plusAmt}> +3 </Text>
                                    <Image source = {require("../imgs/honeycoin.png")} style = {userTaskPopup.honeyCoin}/>
                                </View>
                            </View>
                            
                            <View style = {userTaskPopup.taskStatusContainer}>
                                <Image
                                    style = {userTaskPopup.taskStatus}
                                    source = {require("../imgs/checked.png")}
                                />
                                <Image
                                    style = {userTaskPopup.taskStatus}
                                    source = {(journalTask == "true") ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                                />
                                <Image
                                    style = {userTaskPopup.taskStatus}
                                    source = {(weeklyLogin == "true") ? require("../imgs/checked.png") : require("../imgs/squareCheckbox.png")}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                
                <Modal
                    isVisible = { showDailyNotification } // taskPopup for testing and comment out ^^^
                    animationIn = {'zoomIn'}
                    animationOut = {'zoomOut'}
                    onBackdropPress={() => toggleDailyLoginPopUp()} // toggleTaskPopup() for testing
                    backdropOpacity={.35}
                >
                    <View style = {{backgroundColor: '#B6D3B3', padding: 20}}>
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
                            <Text style={{fontWeight: 'bold', fontSize: 30}}>Task Completed!</Text>
                            <Text style={{marginTop: 5, fontSize: 20}}>Daily Login ✅</Text>
                            <Text style={{marginTop: 5, fontSize: 20}}>Reward: +1 Honey Coin!</Text>
                        </View>
                    </View>
                </Modal>

                {/* <Modal
                    isVisible = { showJournalNotification } // taskPopup for testing and comment out ^^^
                    animationIn = {'zoomIn'}
                    animationOut = {'zoomOut'}
                    onBackdropPress={() => toggleJournalLoginPopUp()} // toggleTaskPopup() for testing
                    backdropOpacity={.35}
                >
                    <View style = {{backgroundColor: '#B6D3B3', padding: 20}}>
                        <View style = {{alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Task Completed!</Text>
                            <Text style={{marginTop: 5}}>Daily Journaling ✅</Text>
                            <Text>Reward: +1 Honey Coin</Text>
                        </View>
                    </View>
                </Modal> */}

                <Modal
                    isVisible = { showWeeklyNotification }
                    animationIn = {'zoomIn'}
                    animationOut = {'zoomOut'}
                    onBackdropPress={() => toggleWeeklyLoginPopUp()}
                    backdropOpacity={.35}
                >
                    <View style = {{backgroundColor: '#B6D3B3', padding: 20}}>
                        <View style = {{alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 30}}>Task Completed!</Text>
                            <Text style={{marginTop: 5, fontSize: 20}}>Weekly Login ✅</Text>
                            <Text style={{marginTop: 5, fontSize: 20}}>Reward: +2 Honey Coin!</Text>
                        </View>
                    </View>
                </Modal>

                {/* All icons on the bottom bar */}
                {/* <View style = {homePage.iconBarContainer}> */}
                <View style = {{}}>
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