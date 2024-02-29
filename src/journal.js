import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { collection, addDoc, doc } from "firebase/firestore"; 
import { styles } from "./styles.js";
import { getUserEmail } from "./account.js";
import { db } from "../firebase/index.js";

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

    const addEntry = async () =>{
        try{
        const entry = await addDoc(doc(collection(db, "testing"), (journalInfo.title).toString()),{
            description: journalInfo.description
        });
        console.log("entry was created " + entry.id);
        }catch(error){
            console.log("error " + error)
        }
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
                onPress={addEntry}
            />
            <Button
                title = "print user email"
                onPress = {() => {
                    // console.log(getUserEmail);
                    // console.log("testing");
                }}
            />
        </View>
    )
}

