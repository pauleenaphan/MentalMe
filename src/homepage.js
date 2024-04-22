import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, ImageBackground } from "react-native";
import { Image } from 'expo-image'; //makes the imgs load faster
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Feather, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase/index.js";
import { collection, addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 

import { homePageMoobie, styles, homePage, notifStyle, userTaskPopup } from "./styles.js";
import { getMoobie } from "./moobie.js";
import { getCurrency } from "./currency.js";
import { getCurrEmail } from "./account.js";
import { getDate } from "./journal.js";
import { getTaskInfo } from "./task.js";

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

    //resets the task if the user has not logged in today
    // const resetTask = async () =>{
    //     try{
    //         const currUserEmail = await getCurrEmail(); 

    //         console.log("WeeklyLogin: " + weeklyLogin);

    //         //gets the last login date
    //         const loginDate = await getDoc(doc(db, currUserEmail, "ProgressTrackingDoc"));
    //         console.log("LAST LOGIN ", loginDate.data().userLastLogin);
     
    //         console.log("THIS IS TODAYS DATE", getDate());
    //         //compares today's date and the last date the user logged in
    //         //if the dates are the same then do nothing, keep the current task
    //         //else reset all of the task
    //         if(loginDate.data().userLastLogin == getDate()){
    //             const taskDoc = await getDoc(doc(db, currUserEmail, "User Task"));
    //             setJournalTask(taskDoc.data().journalTask);
    //             // setLoginTask(taskDoc.data().loginTask);
    //             setWeeklyLogin(taskDoc.data().weeklyLogin);
    //         } else if (weeklyLogin === 'true' && loginDate.data().userLastLogin === getDate()) { 
    //             await updateDoc(doc(db, currUserEmail, "User Task"), {
    //                 journalTask: journalTask,
    //                 weeklyLogin: "true"
    //             })
    //         } else {
    //             await updateDoc(doc(db, currUserEmail, "User Task"), {
    //                 // loginTask: "false",
    //                 journalTask: "false",
    //                 weeklyLogin: "false"
    //             })
    //             // setLoginTask('false');
    //             setJournalTask('false');
    //             setWeeklyLogin('false');
    //             console.log("Cleared task data.");
    //         }
    //     }catch(error){
    //         console.log("Error ", error);
    //     }
    // }


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
        showNotification, setShowNotification,
        // loginTask, setLoginTask,
        journalTask, setJournalTask,
        weeklyLogin, setWeeklyLogin}) => {
            try {
                await dailyIncrement({
                    setDailyLogins, setConsecutiveDLs, setLongestStreak,
                    setSundayLogin, setMondayLogin, setTuesdayLogin,
                    setWednesdayLogin, setThursdayLogin, setFridayLogin,
                    setSaturdayLogin, updateCurrency, setShowNotification,
                    journalTask, setJournalTask, weeklyLogin, setWeeklyLogin
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
                setDailyLogins, setConsecutiveDLs, setLongestStreak, 
                setSundayLogin, setMondayLogin, setTuesdayLogin, 
                setWednesdayLogin, setThursdayLogin, setFridayLogin, 
                setSaturdayLogin, updateCurrency, setShowNotification,
                journalTask, setJournalTask, weeklyLogin, setWeeklyLogin})
                // .then(() => {
                //     resetTask();
                // });
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
  
 