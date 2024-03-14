import React, { createRef } from 'react'
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection, setDoc, doc, getDoc} from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth, db } from '../firebase/index.js';
import { styles } from './styles.js'; 
import { getUserInfo } from './userInfo.js';
import { getMoobie } from './moobie.js';
import { images } from './images.js';

const auth1 = auth;

//Page where user can create an account
export const CreateAccPage = ({navigation}) => {
    const {userEmail, setUserEmail, userPassword, setUserPassword} = getUserInfo();
    const [confirmPass, setConfirmPass] = useState('');
    const {bodyPart, handlePart} = getMoobie();

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

    //gives user the free honeycomb ears 
    const giveUserDefaultItems = async () =>{
        try{
            let currentUserEmail = await getCurrEmail();
            
            const itemsToAdd = [
                "HoneyComb Ears",
                "Default Head",
                "Default Body",
                "Default Lower Body"
            ];
    
            // Create and add each item to its own document
            for (const itemName of itemsToAdd) {
                await addDoc(collection(db, currentUserEmail, "User Information Document", "Moobie's Closet"), {
                    itemName: itemName,
                });
            }
        }catch(error){
            console.log("error " + error)
        }
    }

    //gives user the default moobie doc in firebase db
    const addDefaultMoobie = async () =>{
        try{
            let currentUserEmail = await getCurrEmail();

            console.log("adding to closet: ");
            await setDoc(doc(db, currentUserEmail, "Moobie's Current Clothes"),{
                head: "Default Head",
                body: "Default Body",
                lowerBody: "Default Lower Body"
            });

            handlePart('head', require('../imgs/moobie_head/head1.png'))
            handlePart('body', require('../imgs/moobie_body/body1.png'))
            handlePart('lowerBody', require('../imgs/moobie_feet/feet1.png'))

            console.log("User has default Moobie");
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
                            giveUserDefaultItems();
                            addDefaultMoobie();
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
    const {bodyPart, handlePart} = getMoobie();

    //Logins the user
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

    const getValueFromAsyncStorage = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
            return null;
        }
    };

    //set the current moobie for users that have logged in already
    const setCurrentMoobie = async () =>{
        try{
            const currentUserEmail = await getCurrEmail();
            const currClothesDoc = doc(collection(db, currentUserEmail), "Moobie's Current Clothes");
            const clothesDoc = await getDoc(currClothesDoc);
    
            const closetData = clothesDoc.data();
            console.log("this is the current closet ", closetData);

            const allImgs = [
                ...images.defaultImgs,
                ...images.headImgs,
                ...images.bodyImgs,
                ...images.lowerBodyImgs
            ];

            //Update moobie's model
            // handlePart('head', allImgs.find(item => item.name === closetData.head).image);
            // handlePart('body', allImgs.find(item => item.name === closetData.body).image);
            // handlePart('lowerBody', allImgs.find(item => item.name === closetData.lowerBody).image);
            console.log("this is the current body part: " + bodyPart.head);
            console.log(await getValueFromAsyncStorage("moobie_head"));
            console.log("this is the current value in our doc" + allImgs.find(item => item.name === closetData.head).image);
            AsyncStorage.setItem("moobie_head", JSON.stringify(allImgs.find(item => item.name === closetData.head).image))
            AsyncStorage.setItem("moobie_body", JSON.stringify(allImgs.find(item => item.name === closetData.body).image))
            AsyncStorage.setItem("moobie_lowerBody", JSON.stringify(allImgs.find(item => item.name === closetData.lowerBody).image))



        }catch(error) {
            console.log("error " + error);
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
                        setCurrentMoobie();
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

//Returns the current user password
export const getCurrPassword = async () =>{
    try{
        return await AsyncStorage.getItem("UserPassword");
    }catch(error){
        console.log("error" + error);
        return null;
    }
}