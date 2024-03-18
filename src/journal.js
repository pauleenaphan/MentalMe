import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { collection, addDoc, doc, getDocs, deleteDoc, getDoc } from "firebase/firestore"; 
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./styles.js";
import { getCurrEmail } from "./account.js";
import { db } from "../firebase/index.js";

//Return's today's date
function getDate(){
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

//Main Journal Homepage
export const JournalHomePage = ({navigation}) =>{
    const [entries, setEntries] = useState([]);

    //shows all entries in journal
    useFocusEffect(
        React.useCallback(() => {
            getEntries();
        }, [])
    );

    const getEntries = async () => {
        try {
            const currentUserEmail = await getCurrEmail();
            //gets entries from subcollection called Journal Entries
            const entries = await getDocs(collection(db, currentUserEmail, "User Information Document", "Journal Entries"));
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
            <Text>
                Entries:
            </Text>
            {/* maps out the entries in our db  */}
            {entries.map(entry =>(
                <View key = {entry.id}>
                    <Button 
                        title = {entry.title}
                        onPress = {() =>{
                            console.log(entry.title, entry.date, entry.description);
                            navigation.navigate('Journal Entry Page', {
                                entryId: entry.id,
                                entryTitle: entry.title,
                                entryDate: entry.date,
                                entryDescription: entry.description
                            });

                        }}
                    /> 
                    <Text> {entry.date} </Text>
                </View>
            ))}
        </View>
    )
}

//Adds journal entry
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
    //should add the entry to an array and display the array, but what if the user logsout?
    //can make the array asyncstorage and update it everytime
    const addEntry = async () =>{
        console.log("JOURNAL CONSOLE:" + journalInfo.title);
        try{
            let currentUserEmail = await getCurrEmail();
            //creates a subcollection in User Information Document called Journal Entries
            const entry = await addDoc(collection(db, currentUserEmail, "User Information Document", "Journal Entries"),{
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
                    navigation.navigate('Journal Home Page');
                }}
            />
            <Button
                title = "print user email"
            />
        </View>
    )
}

//Shows the journal entry in the page
export const ViewJournalEntry = ({route, navigation}) =>{
    const {entryId, entryTitle, entryDate, entryDescription} = route.params

    //removes journal entry 
    const removeEntry = async () =>{
        try{
            const currentUserEmail = await getCurrEmail();
            await deleteDoc(doc(db, currentUserEmail, "User Information Document", "Journal Entries", entryId));
            console.log('entry was successfully removed');
        }catch(error){
            console.log("error " + error)
        }
    }

    return(
        //Prints the journal entry that the user pressed on 
        <View style = {styles.container}>
            <Text> {entryTitle} </Text>
            <Text> {entryDate} </Text>
            <Text> {entryDescription} </Text>
            <Button
                title = "Remove Entry"
                onPress={()=>{
                    removeEntry();
                    navigation.navigate('Journal Home Page');
                }}
            />
        </View>
    )
}
    

