import React, {useEffect, useState} from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updatePassword, getAuth } from "@firebase/auth";

import { styles } from "./styles.js";
import { getCurrEmail, getCurrPassword } from "./account.js";
import { getUserInfo } from "./userInfo.js";
import { getMoobie } from "./moobie.js";


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
        navigation.navigate('Login Page');
    }

    // Remove item from AsyncStorage
    const removeItemFromStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log(`Item with key ${key} removed from AsyncStorage.`);
        } catch (error) {
            console.error(`Error removing item with key ${key} from AsyncStorage:`, error);
        }
    };

    return(
        <View style = {styles.container}>
            <Text> Settings </Text>
            <Button
                title = "Account Information"
                onPress = {()=>{
                    navigation.navigate('Account Settings Page');
                }}
            />
            <Button
                title = "Log Out"
                onPress = {() => {
                    logOut();
                    navigation.navigate('Login Page');
                }}
            />
        </View>
    );
};

//shows the user email and ask for password change
export const AccountSettingsPage = ({navigation}) =>{
    const {userEmail, setUserEmail, userPassword, setUserPassword} = getUserInfo();

    //will run when the userEmail is changed, or on render
    useEffect(()=>{
        const returnEmail = async () =>{
            try{
                setUserEmail(await getCurrEmail());
            }catch(error){
                console.log("error " + error);
        }};
        returnEmail();
    }, [userEmail])
    

    return (
        <View style = {styles.container}>
            <Text> Email </Text>
            <Text> {userEmail} </Text>
            <Text> Password </Text>
            <Button 
                title = "Change Password"
                onPress = {()=>{
                    navigation.navigate('Change Password Page');
                }}
            />
        </View>
    ) 
}

//changes the user password
export const AccountChangePassword = () => {
    const {userPassword, setUserPassword} = getUserInfo();
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

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
        <View style={styles.container}>
            <Text> Change Password </Text>
            <TextInput
                placeholder = "current password"
                // sets to the user input of the old password
                onChangeText = {(text) => setCurrentPass(text)}
            />
            <TextInput
                placeholder = "new password"
                onChangeText={(text) => checkNewPassword(text)}
            />
            <TextInput
                placeholder = "confirm new password"
                onChangeText = {(text) => checkConfirmPassword(text)}
            />
            <Button
                title="Confirm Password Change"
                onPress={() => {
                    //then we check the old password based on the user input
                    //also check the new password from user input to see if it is different from the old one
                    if (checkOldPassword(currentPass) && checkNewPassword(newPass) && checkConfirmPassword(confirmPass)) {
                        changePassword();
                        console.log("password has been changed");
                    }else{
                        console.log("password has not been changed");
                    }
                }}
            />
        </View>
    )
}