import React, {useEffect, useState} from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles.js";
import { getCurrEmail, getCurrPassword } from "./account.js";
import { getUserInfo } from "./userInfo.js";
import { updatePassword, getAuth } from "@firebase/auth";

//to get user information from the firecloud db
const auth = getAuth();

//main home page of setting
export const SettingsPage = ({navigation}) =>{

    //logs the user out
    const logOut = () =>{
        //set the status and token to empty strings to remove the users from the storage
        AsyncStorage.setItem("UserIsLoggedIn", "");
        AsyncStorage.setItem("token", "");
        navigation.navigate('Login Page');
    }

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
        // console.log(isCorrect ? "passwords match" : "passwords don't match");
        return passwordStatus;
    }

    //checks if the password does not match the current password
    //set new password 
    const checkNewPassword = (text) => {
        const passwordStatus = text !== userPassword.slice(1, -1);
        // console.log(isDifferent ? "passwords is not the same" : "password is the same as old one");
        setNewPass(text);
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
                placeholder="current password"
                // sets to the user input of the old password
                onChangeText={(text) => setCurrentPass(text)}
            />
            <TextInput
                placeholder="new password"
                onChangeText={(text) => checkNewPassword(text)}
            />
            <Button
                title="Confirm Password Change"
                onPress={() => {
                    //then we check the old password based on the user input
                    //also check the new password from user input to see if it is different from the old one
                    if (checkOldPassword(currentPass) && checkNewPassword(newPass)) {
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