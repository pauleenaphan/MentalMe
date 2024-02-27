import React from 'react'
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { createUser, showUsers, clearTable, checkExistingUser} from './database.js';
import { styles } from './styles.js'; 

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
                onPress={() => createUser(personalInfo)}
                // onPress = {showInfo}
            />

            <Button
                title = "console table"
                onPress = {showUsers}
            />

            <Button
                title = "clear table"
                onPress = {clearTable}
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
                onPress = { async() =>{
                    try{
                        const loggedIn = await checkExistingUser(personalInfo);
                        if(loggedIn){
                            console.log("user is login successful");
                            navigation.navigate('Loading Page');
                        }else{
                            console.log("Login failed")
                        }
                    }catch(error){
                        console.log("Error" + error)
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