import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { styles } from "./styles.js";
import { getUserEmail } from "./account.js";

export const JournalHomePage = ({navigation}) =>{

    return(
        <View style = {styles.container}>
            <Text>
                Journal
            </Text>
            <Button
                title = "Add new Entry"
                onPress = {() => navigation.navigate('Journal New Entry Page')}
            />
            <Button
                title = "trash can picture"
                onPress = {()=>{
                    console.log(getUserEmail);
                }}
            />


        </View>
    )
}

//TODO: add journal entry logs 
export const AddJournalEntryPage = ({navigation}) =>{
    const currentUser = firestore().collection('Users');

    const[journalInfo, setJournalInfo] = useState({
        title: '',
        description: ''
    });

    const handleInfo = (titleValue, value) =>{
        setJournalInfo({
            ...journalInfo,
            [titleValue]: value
        })
    }
    return(
        <View style = {styles.container}>
            <TextInput
                placeholder = "Log Title"
                onChange = {(text) => handleInfo('title', text)}
            />
            <TextInput
                placeholder = "Log Description"
                onChange = {(text) => handleInfo('description', text)}
            />
            <Button
                title = "submit log"
            />
        </View>
    )
}

