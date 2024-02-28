import React from 'react'
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase/index.js';
// import { createUser, showUsers, clearTable, checkExistingUser} from './database.js';
import { styles } from './styles.js'; 
const auth1 = auth;

export const CreateAccPage = ({navigation}) => {
    const [personalInfo, setPersonalInfo] = useState({
        email: ' ',
        password: ' ' 
    });

    
    //while the user is inputting text it will update the current value of email to the value in the inputbox
    const handleInfo = (name, text) =>{
        setPersonalInfo({
            ...personalInfo,
            [name]: text
        })
    }

    //password should be at least 6 characters
    //has the check already that email is in use already
    const createAcc = async () =>{
        try{
            await createUserWithEmailAndPassword(auth1, personalInfo.email, personalInfo.password);
            console.log("success creating new account");
        }catch(error){
            console.log("error " + error);
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
                onChangeText = {(text) => handleInfo('email', text)}
            />

            <TextInput
                placeholder = "password"
                onChangeText = {(text) => handleInfo('password', text)}
            />

            <Button
                title = "Submit (to create account)"
                onPress={createAcc}
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
    const [personalInfo, setPersonalInfo] = useState({
        email: ' ',
        password: ' ' 
    });

    const handleInfo = (name, text) =>{
        setPersonalInfo({
            ...personalInfo,
            [name]: text
        })
    }

    const loginAcc = async () =>{
        try{
            await signInWithEmailAndPassword(auth, personalInfo.email, personalInfo.password);
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
                onChangeText = {(text) => handleInfo('email', text)}
            />
            <TextInput
                placeholder = "password"
                onChangeText = {(text) => handleInfo('password', text)}
            />
            <Button
                title = "Login"
                onPress={async () =>{
                    if(await loginAcc()){
                        navigation.navigate('Loading Page');
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