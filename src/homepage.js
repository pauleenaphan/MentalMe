import React from "react";
import { View, Text, Button } from "react-native"

import { styles } from "./styles.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "./userInfo.js";
import { getCurrEmail } from "./account.js";


export const HomePage = ({navigation, personalInfo}) =>{

    //logs the user out
    const logOut = () =>{
        //set the status and token to empty strings to remove the users from the storage
        AsyncStorage.setItem("UserIsLoggedIn", "");
        AsyncStorage.setItem("token", "");
        navigation.navigate('Login Page');
    }

    return(
        <View style = {styles.container}>
            <Text>
                homepage
            </Text>
            <Button
                title = "logout"
                onPress = {()=>{
                    console.log("logging out");
                    logOut();
                }}
            />
            <Button
                title = "go to main journal page (temp)"
                onPress = {() => navigation.navigate('Journal Home Page')}
            />
            <Button
                title = "print user email"
                onPress = {async () => {
                    try{
                        const email = await getCurrEmail()
                    }catch(error){
                        console.log("error " + error);
                    }
                }}
            />
        </View>
    );
};