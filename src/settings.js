import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles.js";
import { getCurrEmail } from "./account.js";


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

export const AccountSettingsPage = () =>{

    const email = getCurrEmail();
    return (
        <View style = {styles.container}>
            <Text> Email </Text>
            <Text> {userEmail} </Text>
        </View>
    ) 
}