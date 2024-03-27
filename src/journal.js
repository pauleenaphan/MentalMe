import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, TextInput, ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { collection, addDoc, doc, getDocs, deleteDoc, getDoc } from "firebase/firestore"; 
import { useFocusEffect } from "@react-navigation/native";

import { backButton, journalPage, entryPage, styles, newEntryPage } from "./styles.js";
import { getCurrEmail } from "./account.js";
import { db } from "../firebase/index.js";
import { IconButton } from "./homepage.js";
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome6, Feather } from "@expo/vector-icons";
import { Background } from "@react-navigation/elements";
import { disableErrorHandling } from "expo";


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
            console.log('Showing new Entries');
            getEntries();
            return () => {
              // Cleanup logic (if any)
            };
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
        <View style = {journalPage.fullPageContainer}>
            <View style = {{position: 'absolute', top: 0, left: 0, marginTop: 55, marginLeft: 30, marginRight: 30}}>
                <IconButton
                    onPress = {() => navigation.goBack()}
                    iconName = "arrow-back"
                    iconComponent = {Ionicons}
                    size = {30}
                    color = "black"
                />
            </View>
            <View style = {journalPage.homePageContainer}>
                <View style = {journalPage.homePage}>
                    <View style = {{flexDirection: 'row', alignContent: 'center', justifyContent: "space-around" }}>
                       <Text style = {journalPage.title}>
                            Journal Entries
                        </Text>
                    </View>
                    <Text> View your entry by clicking on the journal entry name! </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* maps out the entries in our db  */}
                    {entries.map(entry =>(
                        <View key = {entry.id} style = {journalPage.entry}>
                            <Button 
                                color = "black"
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
                            <Text style = {journalPage.entryDate}> {entry.date} </Text>
                        </View>
                    ))}
                </ScrollView>
                <View style = {journalPage.addEntryBtnBoxContainer}>
                    <View style = {journalPage.addEntryContainer}>
                        <IconButton
                            onPress = {() => navigation.navigate('Journal New Entry Page')}
                            iconName = "pencil-plus-outline"
                            iconComponent = {MaterialCommunityIcons}
                            size = {40}
                            color = "black"
                            // try this color #848D84
                        /> 
                        <Text style = {journalPage.addEntryText}> Add new entry </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

//Adds journal entry
export const AddJournalEntryPage = ({navigation}) =>{
    const handlePressOutside = () => {
        //brings the keyboard down
        Keyboard.dismiss(); 
    };

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
    
    return (
        //touchablewithoutfeedback allows us to pick up screen touches without showing any visuals that the screen was touched
        //when the screen is touched anywhere that is not a textinput we call the function to put the keyboard down
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={newEntryPage.pageContainer}>
                <View style={{position: 'absolute', top: 0, left: 0, marginTop: 55, marginLeft: 30, marginRight: 30}}>
                    <IconButton
                        onPress={() => navigation.goBack()}
                        iconName="arrow-back"
                        iconComponent={Ionicons}
                        size={30}
                        color="black"
                    />
                </View>
                <View style={newEntryPage.titleDescContainer}>
                    <TextInput
                        style = {newEntryPage.title}
                        placeholder="Entry Title"
                        onChangeText={(text) => handleInfo('title', text)}
                    />
                    <Text style = {{marginBottom: 10}}> {getDate().toString()} </Text>
                    <View style={newEntryPage.descriptionContainer}>
                        <TextInput
                            style = {newEntryPage.description}
                            placeholder="Write your thoughts down"
                            onChangeText={(text) => handleInfo('description', text)}
                            multiline={true}
                        />
                    </View>
                </View>
                <View style={{alignSelf: 'center', marginTop: 50}}>
                    <IconButton
                        onPress={()=>{
                            addEntry();
                            navigation.goBack();
                        }}
                        iconName="check"
                        iconComponent={Feather}
                        size={30}
                        color="black"
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

//Shows the journal entry in the page
export const ViewJournalEntry = ({route, navigation}) =>{
    const {entryId, entryTitle, entryDate, entryDescription} = route.params

    //removes journal entry 
    const removeEntry = async () =>{
        try{
            const currentUserEmail = await getCurrEmail();
            await deleteDoc(doc(db, currentUserEmail, 'User Information Document', 'Journal Entries', entryId));
            console.log('entry was successfully removed');
        }catch(error){
            console.log("error " + error)
        }
    }

    return(
        //Prints the journal entry that the user pressed on 
        <View style = {entryPage.pageContainer}>
            <View style = {{position: 'absolute', top: 0, left: 0, marginTop: 55, marginLeft: 30, marginRight: 30}}>
                <IconButton
                    onPress = {() => navigation.goBack()}
                    iconName = "arrow-back"
                    iconComponent = {Ionicons}
                    size = {30}
                    color = "black"
                />
            </View>
            <Text style = {entryPage.entryDate}> {entryDate} </Text>
            <View style = {entryPage.headerContainer}>
                <Text style = {entryPage.title} numberOfLines={2}>{entryTitle}</Text>
            </View>      
            {/* <ScrollView style = {{maxHeight: 500}}> */}
            <Text style = {entryPage.description}> {entryDescription} </Text>  
            {/* </ScrollView> */}
            <View style = {{bottom: -40, alignSelf: 'center'}}>
                <IconButton
                    onPress={()=>{
                        removeEntry();
                        navigation.navigate('Journal Home Page');
                    }}
                    iconName = "trash"
                    iconComponent = {Ionicons}
                    size = {30}
                    color = "black"
                />
            </View>
        </View>
    )
}
    

