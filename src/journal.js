import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { collection, addDoc, doc, getDocs } from "firebase/firestore"; 
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles.js";
import { getCurrEmail } from "./account.js";
import { db } from "../firebase/index.js";

function getDate(){
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

export const JournalHomePage = ({navigation}) =>{
    const [entries, setEntries] = useState([]);

    //shows all entries in journal
    useFocusEffect(
        React.useCallback(() => {
            const getEntries = async () => {
                try {
                    const email = await getCurrEmail();
                    const currentUser = email;
                    const entries = await getDocs(collection(db, currentUser));
                    const entriesReceived = entries.docs.map(doc => ({
                        id: doc.id, 
                        title: doc.data().title, 
                        description: doc.data().description,
                        date: doc.data().date
                    }));
                    setEntries(entriesReceived);
                } catch (error) {
                    console.log("error getting entries", error);
                }
            };
            getEntries();
        }, [])
    );
    

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
            />
            {/* <Button
                title = "view entries"
                onPress = {()=>{
                    getEntries;
                }}
            /> */}
            <Text>
                Entries:
            </Text>
            {/* maps out the entries in our db  */}
            {entries.map(entry =>(
                <View key = {entry.id}>
                    <Text> Title: {entry.title} </Text>
                    {/* <Text> Description: {entry.description} </Text> */}
                    <Text> Date: {entry.date} </Text>
                </View>
            ))}
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

    //adds entry to journal
    const addEntry = async () =>{
        console.log("JOURNAL CONSOLE:" + journalInfo.title);
        try{
            const email = await getCurrEmail();
            let currentUser = email;
            const entry = await addDoc(collection(db, currentUser),{
                title: journalInfo.title.toString(),
                description: journalInfo.description.toString(),
                date: getDate().toString()
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
                onChangeText = {(text) => handleInfo('title', text)}
            />
            <TextInput
                placeholder = "Log Description"
                onChangeText = {(text) => handleInfo('description', text)}
            />
            <Button
                title = "submit log"
                onPress={()=>{
                    addEntry();
                    navigation.navigate('Journal Home Page')
                }}
            />
            <Button
                title = "print user email"
            />
        </View>
    )
}

// TODO: Need to delete journal, view journal in single page