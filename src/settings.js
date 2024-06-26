import React, {useEffect, useState} from "react";
import { View, Text, Button, TextInput, Alert, Platform } from "react-native";
import { Image } from 'expo-image';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePassword, getAuth } from "@firebase/auth";
import { doc, getDoc } from '@firebase/firestore';
import { Feather } from '@expo/vector-icons'; //used for icons

import { settingsPage } from "./styles.js";
import { getCurrEmail, getCurrPassword } from "./account.js";
import { getUserInfo } from "./userInfo.js";
import { db } from '../firebase/index.js';

//to get user information from the firecloud db
const auth = getAuth();

//main home page of setting
export const SettingsPage = ({navigation}) =>{

    //logs the user out
    const logOut = () =>{
        //set the status and token to empty strings to remove the users from the storage
        AsyncStorage.setItem("UserIsLoggedIn", "");
        AsyncStorage.setItem("token", "");
        removeItemFromStorage('moobie_head');
        removeItemFromStorage('moobie_body');
        removeItemFromStorage('moobie_lowerBody');
        removeItemFromStorage("userCurrency");
        removeItemFromStorage('dailyLogins');
        removeItemFromStorage('latestDate');
        removeItemFromStorage('consecutiveDLs');
        removeItemFromStorage('longestStreak');
        removeItemFromStorage('sundayLogin');
        removeItemFromStorage('mondayLogin');
        removeItemFromStorage('tuesdayLogin');
        removeItemFromStorage('wednesdayLogin');
        removeItemFromStorage('thursdayLogin');
        removeItemFromStorage('fridayLogin');
        removeItemFromStorage('saturdayLogin');
        navigation.navigate('Login Page');
    }

    // Remove item from AsyncStorage
    const removeItemFromStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            // console.log(`Item with key ${key} removed from AsyncStorage.`);
        } catch (error) {
            console.error(`Error removing item with key ${key} from AsyncStorage:`, error);
        }
    };

    return(
        <View style = {settingsPage.pageContainer}>
            <Text style = {settingsPage.pageTitle}> Settings </Text> 
        
            <View>
                {/* <Text style = {settingsPage.headerTitle}> In App </Text>
                <View style = {settingsPage.optionsContainer}>
                    <Button
                        color = "black"
                        title = "Sound"
                    />
                    <Button 
                        color = "black"
                        title = "Notification"
                    />
                </View> */}

                <Text style = {settingsPage.headerTitle}> Account </Text>

                <View style = {settingsPage.optionsContainer}>
                    <Button
                        color = {Platform.OS === "android" ? "transparent" : "black"}
                        title = "Account Information"
                        onPress = {()=>{
                            navigation.navigate('Account Settings Page');
                        }}
                    />
                </View>
            </View>
            
            
            <View style = {settingsPage.logOutBtn}>
                <Button
                    color = {Platform.OS === "android" ? "#568258" : "white"}
                    title = "Log Out"
                    onPress = {() => {
                        logOut();
                        navigation.navigate('Login Page');
                    }}
                />
            </View>
        </View>
    );
};

//shows the user email and ask for password change
export const AccountSettingsPage = ({navigation}) =>{
    const {userEmail, setUserEmail, userName, setUserName} = getUserInfo();

    //will run when the userEmail is changed, or on render
    //gets useremail from async storage then sets it to the usestate email value
    useEffect(()=>{
        const returnEmail = async () =>{
            try{
                setUserEmail(await getCurrEmail());
            }catch(error){
                console.log("error " + error);
        }};
        returnEmail();
    }, [userEmail])

    //gets the username from the db when the page is rendered
    useEffect(()=>{
        const returnName = async () =>{
            try{
                let currentUserEmail = await getCurrEmail();
                const username = await getDoc(doc(db, currentUserEmail, "Username"));
                setUserName(username.data().name);
            }catch(error){
                console.log("error " + error);
        }};
        returnName();
    }, [userName])
    

    return (
        <View style = {settingsPage.pageContainer}>
            <Text style = {settingsPage.pageTitle}> Account Information </Text>
            <View>
                <View style = {settingsPage.userNameContainer}>
                    <Image source = {require( "../imgs/moobie_head/head1.png")} style = {settingsPage.avatarIcon}/>
                    <Text style = {settingsPage.userName}> {userName} </Text>
                </View>
                
                <Text style = {settingsPage.emailTitle}> Email </Text>
                {/* Removes quotes from the string */}
                <Text style = {settingsPage.userEmail}> {userEmail.trim().replace(/['"]+/g, '')} </Text> 

                <Text style = {settingsPage.passTitle}> Password </Text>
                <View style = {settingsPage.changePassContainer}>
                    <Button 
                        color = {Platform.OS === "android" ? "transparent" : "black"}
                        title = "Change Password"
                        onPress = {()=>{
                            navigation.navigate('Change Password Page');
                        }}
                    />
                </View> 
            </View>
        </View>
    ) 
}

//changes the user password
export const AccountChangePassword = ({navigation}) => {
    const {userPassword, setUserPassword} = getUserInfo();
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const user = auth.currentUser;

    useEffect(() => {
        const returnPassword = async () => {
            try {
                setUserPassword(await getCurrPassword());
            } catch (error) {
                console.log("error " + error);
            }
        };
        returnPassword();
    }, [userPassword]);

    const toggleShowPass = () =>{
        setShowPassword(!showPassword);
    }

    //alert when passwords dont match
    const unmatchPassAlert = () =>{
        Alert.alert(
            "Invalid Passwords", "Your new passwords do not match",
            [
                {text: "Back to Page", onPress: () =>(console.log("user passwords dont match"))}
            ]
        )
    }

    //alerts when old password is not correct
    const invalidOldPass = () =>{
        Alert.alert(
            "Invalid Password", "Your old password is not correct",
            [
                {text: "Back to Page", onPress: ()=>(console.log("user old password is not correct"))}
            ]
        )
    }

    const invalidNewPass = () =>{
        Alert.alert(
            "Invalid New Password", "Your new password cannot be the same as your old one",
            [
                {text: "Back to Page"}
            ]
        )
    }

    //alerts when password is changed
    const validNewPass = () =>{
        Alert.alert(
            "Your password has been changed", "",
            [
                {text: "Back to Page"}
            ]
        )
    }

    //checks if the user enter their current password correctly
    const checkOldPassword = (text) => {
        const passwordStatus = text === userPassword.slice(1, -1);
        console.log(passwordStatus ? "your current password is correct" : "your current password is wrong");
        return passwordStatus;
    }

    //checks if the password does not match the current password
    //set new password 
    const checkNewPassword = (text) => {
        const passwordStatus = text !== userPassword.slice(1, -1);
        console.log(passwordStatus ? "passwords is new" : "password is the same as old one");
        setNewPass(text);
        return passwordStatus;
    }

    //checks if the new passowrd and confirm password matches
    const checkConfirmPassword = (text) =>{
        const passwordStatus = text == newPass;
        console.log(passwordStatus ? "your confirm password matches" : "confirm password does not match");
        setConfirmPass(text);
        return passwordStatus;
    }

    //changes user passwords 
    const changePassword = () => {
        setUserPassword(newPass);
        //upates the async storage and firebase authentication password for
        AsyncStorage.setItem("UserPassword", JSON.stringify(newPass));
        updatePassword(user, newPass);
        console.log(newPass);
    }

    return (
        <View style={settingsPage.changePassPageContainer}>
            <Text style = {settingsPage.changePassTitle}> Change Password </Text>
            <View style = {settingsPage.showPassContainer}>
                <View style = {settingsPage.passContainer}>
                    <TextInput
                        style = {settingsPage.inputPass}
                        placeholder = "Current Password"
                        secureTextEntry = {!showPassword}
                        value = {currentPass}
                        // sets to the user input of the old password
                        onChangeText = {(text) => setCurrentPass(text)}
                    />
                    <Feather 
                        name={showPassword ? 'eye-off' : 'eye'} 
                        size={23} 
                        style={{ marginLeft: -20}} 
                        onPress={toggleShowPass} 
                    /> 
                </View>
                <View  style = {settingsPage.passContainer2}>
                    <TextInput
                        style = {settingsPage.inputPass}
                        placeholder = "New password"
                        secureTextEntry = {!showPassword}
                        value = {newPass}
                        onChangeText={(text) => checkNewPassword(text)}
                    />
                    <Feather 
                        name={showPassword ? 'eye-off' : 'eye'} 
                        size={23} 
                        style={{ marginLeft: -20}} 
                        onPress={toggleShowPass} 
                    /> 
                </View>
                <View  style = {settingsPage.passContainer}>
                    <TextInput
                        style = {settingsPage.inputPass}
                        placeholder = "Confirm new password"
                        secureTextEntry = {!showPassword}
                        value = {confirmPass}
                        onChangeText = {(text) => checkConfirmPassword(text)}
                    />
                    <Feather 
                        name={showPassword ? 'eye-off' : 'eye'} 
                        size={23} 
                        style={{marginLeft: -20}} 
                        onPress={toggleShowPass} 
                    /> 
                </View>
            </View>
            <View style = {settingsPage.confirmPassBtn}>
                <Button
                    color = {Platform.OS === "android" ? "#568258" : "white"}
                    title="Confirm Change"
                    onPress={() => {
                        //check if the old password is the user's current password
                        //check if the new password is not the same as the old password
                        //check that both new passwords are the same
                        //changes password is all of these pass, else send out the alert
                        if(!checkOldPassword(currentPass)){
                            invalidOldPass();
                        }else if(!checkNewPassword(newPass)){
                            invalidNewPass();
                        }else if(!checkConfirmPassword(confirmPass)){
                            unmatchPassAlert();
                        }else if(checkOldPassword(currentPass) && checkNewPassword(newPass) && checkConfirmPassword(confirmPass)){
                            changePassword();
                            validNewPass();
                        }
                    }}
                />
            </View>
        </View>
    )
}