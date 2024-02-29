import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { collection, addDoc, doc, getDocs } from "firebase/firestore"; 
import { styles } from "./styles.js";
import { getUserEmail } from "./account.js";
import { db } from "../firebase/index.js";

function getDate(){
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    return currentDate = (month + date + year);
}

export const JournalHomePage = ({navigation}) =>{
    const [entries, setEntries] = useState([]);

    //shows all entries in journal
    useEffect(() =>{
        const getEntries = async () =>{
            try{
                // const docData = doc.data();
                const entries = await getDocs(collection(db, "paul"));
                const entriesReceived = entries.docs.map(doc => ({
                    id: doc.id, 
                    title:doc.data().title, 
                    description: doc.data().description ,
                    date: doc.data().date
                }));
                setEntries(entriesReceived);
            }catch(error){
                console.log("error getting entries" + error);
            }
        }
        getEntries();
    }, [])
    

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
            const entry = await addDoc(collection(db, "paul"),{
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
                onPress={addEntry}
            />
            <Button
                title = "print user email"
                onPress = {() => {
                    console.log(getUserEmail);
                }}
            />
        </View>
    )
}

