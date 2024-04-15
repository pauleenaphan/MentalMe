import React from 'react'
import { useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection, setDoc, doc, getDoc} from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Feather, AntDesign, Fontisto } from '@expo/vector-icons'; //used for icons


import { auth, db } from '../firebase/index.js';
import { styles, loginPage } from './styles.js'; 
import { getUserInfo } from './userInfo.js';
import { getMoobie } from './moobie.js';
import { getCurrency } from './currency.js';
import { images } from './images.js';

const auth1 = auth;

//Page where user can create an account
export const CreateAccPage = ({navigation}) => {
    const {userEmail, setUserEmail, userPassword, setUserPassword} = getUserInfo();
    const [confirmPass, setConfirmPass] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const {bodyPart, handlePart} = getMoobie();
    const {currency, updateCurrency} = getCurrency();

    //resets the values in the textinput when the page is displayed
    useFocusEffect(
        React.useCallback(() => {
            console.log("clearing create acc")
            setUserEmail("");
            setUserPassword("");
            setConfirmPass("");
        }, [])
    );

    //alert for when user is trying to create an account with an email that has an account already
    const emailExistAlert = () =>{
        Alert.alert(
            "Account Exist", "This email already has an account Please try logging in",
            [
                {text: "Back to Sign Up Page", onPress: () =>{console.log("user has an account already")}}
            ]
        )
    }

    //alert for when users enters a email that is not valid
    const emailInvalidAlert = () =>{
        Alert.alert(
            "Invalid Email", "Please enter a valid email",
            [
                {text: "Back to Sign Up Page", onPress: () =>{console.log("user enter invalid email")}}
            ]
        )
    }

    //alert when password is not at least 6 characters
    const shortPassAlert = () =>{
        Alert.alert(
            "Invalid Password", "Your password must be more than 6 characters",
            [
                {text: "Back to Sign Up Page", onPress: () =>{console.log("user has entered an invalid password")}}
            ]
        )
    }

    //alert when passwords dont match
    const unmatchPassAlert = () =>{
        Alert.alert(
            "Invalid Passwords", "Your passwords do not match",
            [
                {text: "Back to Sign Up Page", onPress: () =>(console.log("user passwords dont match"))}
            ]
        )
    }

    //password should be at least 6 characters
    //firebase already checks if user exists
    const createAcc = async () =>{
        try{
            await createUserWithEmailAndPassword(auth1, userEmail, userPassword);
            console.log("success creating new account");
            return true;
        }catch(error){
            console.log("error " + error.code);
            if(error.code === "auth/invalid-email"){
                emailInvalidAlert();
            }else if(error.code === "auth/email-already-in-use"){
                emailExistAlert();
            }else if(error.code === "auth/weak-password"){
                shortPassAlert();
            }
            return false;
        }
    }

    const toggleShowPass = () =>{
        setShowPassword(!showPassword);
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
            
            //default items that every new user will get
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
            //adds the doc to the firebase db with moobie's default clothes
            await setDoc(doc(db, currentUserEmail, "Moobie's Current Clothes"),{
                head: "Default Head",
                body: "Default Body",
                lowerBody: "Default Lower Body"
            });

            //set the part then add it to the async storage
            handlePart('head', require('../imgs/moobie_head/head1.png'));
            AsyncStorage.setItem("moobie_head", JSON.stringify(require('../imgs/moobie_head/head1.png')));
            handlePart('body', require('../imgs/moobie_body/body1.png'));
            AsyncStorage.setItem("moobie_body", JSON.stringify(require('../imgs/moobie_body/body1.png')));
            handlePart('lowerBody', require('../imgs/moobie_feet/feet1.png'));
            AsyncStorage.setItem("moobie_lowerBody", JSON.stringify(require('../imgs/moobie_feet/feet1.png')));

            console.log("User has default Moobie");
        }catch(error){
            console.log("error " + error);
        }
    }

    //gives user their currency amount when creating an acc
    const addDefaultCurrency = async () =>{
        console.log("ADD DEFAULT CURRENCY FUNCTION IS RUNNING");
        try{
            let currentUserEmail = await getCurrEmail();
            //creates a new doc for user currency and set it to 0
            console.log("created new user currency doc");
            await setDoc(doc(db, currentUserEmail, "User Currency Document"),{
                honeyCoins: 0,
            })

            //sets currency and adds it to the async storage
            updateCurrency(0);
            AsyncStorage.setItem("userCurrency", JSON.stringify(0));
        }catch(error){
            console.log("error: " + error);
        }
    }

    const setUserStatus = async () => {
        console.log("SET USER STATUS FUNCTIONNNNNN ");
        try {
            let currentUserEmail = await getCurrEmail();
            // console.log("current user emailLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO ", currentUserEmail)
            await setDoc(doc(db, currentUserEmail, "User Status"), {
                status: "true"
            })
            await setDoc(doc(db, currentUserEmail, "Username"), {
                name: "name"
            })
            // AsyncStorage.setItem("newUserStatus", JSON.stringify(true));
            console.log("User Status Document has been created");
        } catch (error) {
            console.error("Error setting user status:", error);
        }


    };

    //checks whether or not the confirm password matches the new user's password
    const checkConfirmPass = (text) =>{
        const passwordStatus = text == userPassword;
        setConfirmPass(text);
        return passwordStatus;
    }

    return(
    <View style = {loginPage.container}>
        <Text style = {loginPage.title}>
            Create Account
        </Text>
        <Text> Sign up to get started! </Text>
        <View style = {loginPage.textInputContainer}>

            <View style = {loginPage.textContainer}>
                <Feather name = "user" size = {28} color = "black"/>
                <TextInput 
                    style = {loginPage.textInputCreate}
                    placeholder = 'Email'
                    //gets user email from textinput and set the value to email
                    onChangeText = {(text) => setUserEmail(text)}
                />
            </View> 
            
            <View style = {loginPage.textContainer}>
                <AntDesign name="lock1" size={30} color="black" />
                <TextInput
                    style = {loginPage.textInputCreate}
                    secureTextEntry = {!showPassword}
                    placeholder = "Password"
                    onChangeText = {(text) => setUserPassword(text)}
                />
                <Feather 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={23} 
                    style={loginPage.icon} 
                    onPress={toggleShowPass} 
                /> 
            </View>

            <View style = {loginPage.textContainer}>
                <AntDesign name="lock1" size={30} color="black" />
                <TextInput
                    style = {loginPage.textInputCreate}
                    secureTextEntry = {!showPassword}
                    placeholder = "Confirm Password"
                    onChangeText = {(text) => checkConfirmPass(text)}
                />
                <Feather 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={23} 
                    style={loginPage.icon} 
                    onPress={toggleShowPass} 
                /> 
            </View>

        </View>
        <View style = {{flexDirection:'row', alignItems:'center', justifyContent: 'space-between', marginTop: -10}}>
            <View style = {loginPage.button}>
                <Button
                    color = "white"
                    title = "Sign Up"
                    onPress={
                        async () =>{
                            //if both new password matches then create the account
                            if(checkConfirmPass(confirmPass)){
                                if(await createAcc()){
                                    AsyncStorage.setItem("UserIsLoggedIn", JSON.stringify(true));
                                    AsyncStorage.setItem("UserEmail", JSON.stringify(userEmail));
                                    AsyncStorage.setItem("UserPassword", JSON.stringify(userPassword));
                                    AsyncStorage.setItem("dailyLogins", JSON.stringify(0));
                                    addUserToDb();
                                    giveUserDefaultItems();
                                    addDefaultMoobie();
                                    addDefaultCurrency();
                                    setUserStatus();
                                    navigation.navigate('Home Page');
                                }else{
                                    console.log('account error');
                                }
                            }else{
                                unmatchPassAlert();
                                console.log("passwords did not match");
                            }
                        }}
                />
            </View>
            <Button
                color = "black"
                title = "Login"
                onPress = {() => navigation.navigate('Login Page')}
            />
        </View>
    </View>
    );
};

//Page where user can login
export const LoginPage = ({navigation}) =>{
    const {userEmail, setUserEmail, userPassword, setUserPassword} = getUserInfo();
    const {bodyPart, handlePart} = getMoobie();
    const {currency, updateCurrency} = getCurrency();
    const [showPassword, setShowPassword] = useState(false);

    //resets value in the text input when the page is being displayed
    useFocusEffect(
        React.useCallback(() => {
            console.log("clearing sign in")
            setUserEmail("");
            setUserPassword("");
        }, [])
    );


    const showLoginFailAlert = ()=>{
        Alert.alert(
            "Invalid Login", "Your email or password is incorrect",
            [
                {text: "Back to Login Page", onPress: () =>(console.log("user has failed login"))}
            ]
        )
    }

    //Logins the user
    const loginAcc = async () =>{
        try{
            await signInWithEmailAndPassword(auth, userEmail, userPassword);
            console.log("successfully logged in")
            return true;
        }catch(error){
            showLoginFailAlert();
            console.log("error" + error);
            return false;
        }
    }

    const toggleShowPass = () =>{
        setShowPassword(!showPassword);
    }

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
            console.log("moobie was wearing this: " + closetData.head)
            console.log("This is the old body part: " + bodyPart.head)

            //Update moobie's model
            allImgs.map(item=>{
                if(item.name == closetData.lowerBody){
                    handlePart("lowerBody", item.image);
                    AsyncStorage.setItem("moobie_lowerBody", JSON.stringify(item.image));
                }else if(item.name == closetData.body){
                    handlePart("body", item.image);
                    AsyncStorage.setItem("moobie_body", JSON.stringify(item.image));
                }else if(item.name == closetData.head){
                    console.log("this is itemname: ", item.name, "this is closet Data: ", closetData.head);
                    handlePart("head", item.image);
                    AsyncStorage.setItem("moobie_head", JSON.stringify(item.image));
                    console.log("this is the new new", bodyPart.head);
                }
            })
        }catch(error) {
            console.log("error " + error);
        }
    }

    //sets the user currency when they login 
    const setUserCurrency = async () =>{
        try{
            console.log("SET USER CURRENCY FUNCTION IS RUNNING");
            const currentUserEmail = await getCurrEmail();
            const currencyDoc = await getDoc(doc(collection(db, currentUserEmail), "User Currency Document"));
            const honeyCoins = currencyDoc.data().honeyCoins;

            console.log("honeycomb is a: ", typeof honeyCoins);

            //sets the current currency to our usestate and asyncstorage
            console.log("User has this much coins upon login: ", honeyCoins);
            updateCurrency(honeyCoins);
            // AsyncStorage.setItem("userCurrency", JSON.stringify(honeyCoins));

        }catch(error){
            console.log("error: ", error);
        }
    }
    
    return(
        <View style={loginPage.container}>
            <Text style = {loginPage.title}>
                Login
            </Text>
            <Text> Welcome Back! </Text>
            <View style = {loginPage.textInputContainer}>
                <View style = {loginPage.textContainer}>
                    {/* User icons */}
                    <Feather name="user" size={30} color="black" />
                    <TextInput 
                        style = {loginPage.textInputLogin}
                        placeholder = "Email"
                        value = {userEmail}
                        onChangeText = {(text) => setUserEmail(text)}
                    />
                </View>
                <View style = {loginPage.textContainer}>
                    <AntDesign name="lock1" size={30} color="black" />
                    <TextInput
                        style = {loginPage.textInputLogin}
                        secureTextEntry = {!showPassword}
                        value = {userPassword}
                        placeholder = "Password"
                        onChangeText = {(text) => setUserPassword(text)}
                    />
                    {/* adds icon for show or hide the */}
                    <Feather 
                        name={showPassword ? 'eye-off' : 'eye'} 
                        size={23} 
                        style={loginPage.icon} 
                        onPress={toggleShowPass} 
                    /> 
                </View>
            </View>
            <View style = {loginPage.button}>
                <Button
                    color = 'white'
                    title = "LOGIN"
                    onPress={async () =>{
                        if(await loginAcc()){
                            AsyncStorage.setItem("UserIsLoggedIn", JSON.stringify(true));
                            AsyncStorage.setItem("UserEmail", JSON.stringify(userEmail));
                            AsyncStorage.setItem("UserPassword", JSON.stringify(userPassword));
                            setUserPassword("");
                            setCurrentMoobie();
                            setUserCurrency();
                            navigation.navigate('Home Page');
                        }else{
                            console.log('login info is not correct');
                        }
                    }}
                />
            </View>
            <Button
                color = 'black'
                title = "Create Account"
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