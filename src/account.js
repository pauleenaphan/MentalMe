import React, { createRef } from 'react'
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

import { auth } from '../firebase/index.js';
import { styles } from './styles.js'; 
import { getUserInfo } from './userInfo.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth1 = auth;
//Login and account creation uses firebase authentication
export const CreateAccPage = ({navigation}) => {
    // const [personalInfo, setPersonalInfo] = useState({
    //     email: ' ',
    //     password: ' ',
    // });

    // //while the user is inputting text it will update the current value of email to the value in the inputbox
    // const handleInfo = (titleValue, value) =>{
    //     setPersonalInfo({
    //         ...personalInfo,
    //         [titleValue]: value
    //     })
    // }
    const {userEmail, setUserEmail, userPassword, setUserPassword} = getUserInfo();

    //password should be at least 6 characters
    //has the check already that email is in use already
    const createAcc = async () =>{
        try{
            await createUserWithEmailAndPassword(auth1, userEmail, userPassword);
            console.log("success creating new account");
            return true;
        }catch(error){
            console.log("error " + error);
            return false;
        }
    }

    return(
    <View style = {styles.container}>
        <Text>
            Create Account
        </Text>
        <TextInput 
            placeholder = 'email'
            //gets user email from textinput and set the value to email
            onChangeText = {(text) => setUserEmail(text)}
        />

        <TextInput
            placeholder = "password"
            onChangeText = {(text) => setUserPassword(text)}
        />

        <Button
            title = "Submit (to create account)"
            onPress={async()=>{
                if(await createAcc()){
                    AsyncStorage.setItem("UserIsLoggedIn", JSON.stringify(true));
                    AsyncStorage.setItem("UserEmail", JSON.stringify(userEmail));
                    AsyncStorage.setItem("DailyLogins", JSON.stringify(0));
                    navigation.navigate('Home Page');
                }else{
                    console.log('account error');
                }
            }}
            // onPress = {showInfo}
        />

        <Button
            title = "Login (go to login page)"
            onPress = {() => navigation.navigate('Login Page')}
        />
    </View>
    );
};


export const LoginPage = ({navigation}) =>{
    // const [personalInfo, setPersonalInfo] = useState({
    //     email: ' ',
    //     password: ' ' 
    // });

    // const handleInfo = (name, text) =>{
    //     setPersonalInfo({
    //         ...personalInfo,
    //         [name]: text
    //     })
    // }
    const {userEmail, setUserEmail, userPassword, setUserPassword} = getUserInfo();

    const loginAcc = async () =>{
        try{
            await signInWithEmailAndPassword(auth, userEmail, userPassword);
            console.log("successfully logged in")
            return true;
        }catch(error){
            console.log("error" + error);
            return false;
        }
    }
    
    return(
        <View style={styles.container}>
            <Text>
                Login
            </Text>
            <TextInput
                placeholder = "email"
                onChangeText = {(text) => setUserEmail(text)}
            />
            <TextInput
                placeholder = "password"
                onChangeText = {(text) => setUserPassword(text)}
            />
            <Button
                title = "Login"
                onPress={async () =>{
                    if(await loginAcc()){
                        AsyncStorage.setItem("UserIsLoggedIn", JSON.stringify(true));
                        AsyncStorage.setItem("UserEmail", JSON.stringify(userEmail));
                        navigation.navigate('Home Page');
                    }else{
                        console.log('login info is not correct');
                    }
                }}
              />
            <Button
                title = "Create Account (go to create acc page)"
                onPress = {() => navigation.navigate('Create Account Page')}
            />
        </View>
    )
}

export const getCurrEmail = async () =>{
    try{
        const email = await AsyncStorage.getItem("UserEmail");
        console.log("email " + email);
        return email;
    }catch(error){
        console.log("error" + error);
        return null;
    }
}