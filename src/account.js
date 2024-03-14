import React, { createRef } from 'react'
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection, setDoc, doc} from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth, db } from '../firebase/index.js';
import { styles } from './styles.js'; 
import { getUserInfo } from './userInfo.js';


const auth1 = auth;

//Page where user can create an account
export const CreateAccPage = ({navigation}) => {
    const {userEmail, setUserEmail, userPassword, setUserPassword} = getUserInfo();
    const [confirmPass, setConfirmPass] = useState('');

    //password should be at least 6 characters
    //firebase already checks if user exists
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

    //create collection for user in the firebase
    //also adds a doc but it is empty
    const addUserToDb = async () =>{
        try{
            let currentUserEmail = await getCurrEmail();

            //creates the user collection with the current user email, then the document (User info doc), then adds a subcollection called Journal Entry
            await addDoc(collection(db, currentUserEmail, 'User Information Document', 'EmptyDoc'), {});
            console.log("user was addded to firecloud db");
        }catch(error){
            console.log("error " + error)
        }
    }

    //cchecks whether or not the confirm password matches the new user's password
    const checkConfirmPass = (text) =>{
        const passwordStatus = text == userPassword;
        setConfirmPass(text);
        return passwordStatus;
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
        <TextInput
            placeholder = "confirm password"
            onChangeText = {(text) => checkConfirmPass(text)}
        />
        <Button
            title = "Submit (to create account)"
            onPress={
                async()=>{
                    //if both new password matches then create the account
                    if(checkConfirmPass(confirmPass)){
                        if(await createAcc()){
                            AsyncStorage.setItem("UserIsLoggedIn", JSON.stringify(true));
                            AsyncStorage.setItem("UserEmail", JSON.stringify(userEmail));
                            AsyncStorage.setItem("UserPassword", JSON.stringify(userPassword));
                            AsyncStorage.setItem("DailyLogins", JSON.stringify(0));
                            addUserToDb();
                            navigation.navigate('Home Page');
                        }else{
                            console.log('account error');
                        }
                    }else{
                        console.log("passwords did not match");
                    }
                }}
        />

        <Button
            title = "Login (go to login page)"
            onPress = {() => navigation.navigate('Login Page')}
        />
    </View>
    );
};

//Page where user can login
export const LoginPage = ({navigation}) =>{
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
                        AsyncStorage.setItem("UserPassword", JSON.stringify(userPassword));
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

//Returns the current user's email
export const getCurrEmail = async () =>{
    try{
        return await AsyncStorage.getItem("UserEmail");
    }catch(error){
        console.log("error" + error);
        return null;
    }
}

export const getCurrPassword = async () =>{
    try{
        return await AsyncStorage.getItem("UserPassword");
    }catch(error){
        console.log("error" + error);
        return null;
    }
}