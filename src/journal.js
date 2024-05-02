import React, { useState} from "react";
import { View, Text, Button, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { collection, addDoc, doc, getDocs, deleteDoc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import { journalPage, entryPage, newEntryPage } from "./styles.js";
import { getCurrEmail } from "./account.js";
import { db } from "../firebase/index.js";
import { IconButton } from "./homepage.js";
import { getCurrency } from "./currency.js";
import { getTaskInfo } from "./task.js";

import { useShowJournalNotification } from "./progress_files/showJournalNotificationContext.js";
import Modal from "react-native-modal";

//Return's today's date
export const getDate = () =>{
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

//Main Journal Homepage
export const JournalHomePage = ({navigation}) =>{
    const [entries, setEntries] = useState([]);
    const { showJournalNotification, setShowJournalNotification } = useShowJournalNotification();

    //shows all entries in journal
    useFocusEffect(
        React.useCallback(() => {
            console.log('Showing new Entries');
            console.log("DATE FORMAT", getDate());
            getEntries();
        }, [entries])
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

    const toggleJournalLoginPopUp = () =>{
        setShowJournalNotification(!showJournalNotification);
    }
    
    return(
        <View style = {journalPage.fullPageContainer}>
            <View style = {journalPage.homePageContainer}>
                <View style = {journalPage.homePage}>
                    <View style = {journalPage.headerContainer}>
                        <Text style = {journalPage.title}>
                            Journal Entries
                        </Text>
                    </View>
                    <Text> View your entry by clicking on your entries below! </Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* maps out the entries in our db  */}
                    {entries.map(entry =>(
                        <TouchableOpacity
                            key = {entry.id}
                            onPress = {() =>{
                                console.log(entry.title, entry.date, entry.description);
                                navigation.navigate('Journal Entry Page', {
                                    entryId: entry.id,
                                    entryTitle: entry.title,
                                    entryDate: entry.date,
                                    entryDescription: entry.description
                                });
                            }}
                            activeOpacity={0.7}
                        >
                            <View key = {entry.id} style = {journalPage.entry}>
                                <Text style = {journalPage.entryTitle}> {entry.title} </Text>
                                <Text style = {journalPage.entryDate}> {entry.date} </Text>
                            </View>
                        </TouchableOpacity>
                        
                    ))}
                </ScrollView>
                <TouchableOpacity
                    onPress = {() => navigation.navigate('Journal New Entry Page')}
                    style = {journalPage.addEntryBtnBoxContainer}
                    activeOpacity={0.8} // Set activeOpacity to 1 to prevent opacity change on press
                >
                    <View style = {journalPage.addEntryContainer}>
                        <IconButton
                            iconName = "pencil-plus-outline"
                            iconComponent = {MaterialCommunityIcons}
                            size = {40}
                            color = "black"
                            // try this color #848D84
                            onPress = {() => navigation.navigate('Journal New Entry Page')}
                        /> 
                        <Text style = {journalPage.addEntryText}> Add new entry </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                isVisible = { showJournalNotification } // taskPopup for testing and comment out ^^^
                animationIn = {'zoomIn'}
                animationOut = {'zoomOut'}
                onBackdropPress={() => toggleJournalLoginPopUp()} // toggleTaskPopup() for testing
                backdropOpacity={.35}
            >
                <View style = {{backgroundColor: '#B6D3B3', padding: 20}}>
                    <View style = {{alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 30}}>Task Completed!</Text>
                        <Text style={{marginTop: 5, fontSize: 20}}>Daily Journaling ✅</Text>
                        <Text style={{marginTop: 5, fontSize: 20}}>Reward: +1 Honey Coin!</Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

//Adds journal entry
export const AddJournalEntryPage = ({navigation}) =>{
    const {setJournalTask} = getTaskInfo();
    const {currency, updateCurrency} = getCurrency();
    const {showJournalNotification, setShowJournalNotification} = useShowJournalNotification();
    
    const handlePressOutside = () => {
        //brings the keyboard down
        Keyboard.dismiss(); 
    };

    const[journalInfo, setJournalInfo] = useState({
        title: '[BLANK]',
        description: '[BLANK]'
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
            
            //checks the current date for whether or not the user has journaled today
            let currDate = getDate();
            const lastDate = await getDoc(doc(db, currentUserEmail, "Journal Date"));
            if(lastDate.data().date == currDate){
                console.log("user has journaled today already")
            }else{
                //updates the date and give the user a coin
                await setDoc(doc(db, currentUserEmail, "Journal Date"),{
                    date: currDate
                })
                updateCurrency(parseInt(currency) + 1);
                //updates the doc for the user journal task
                await updateDoc(doc(db, currentUserEmail, "User Task"), {
                    journalTask: "true"
                })
                setJournalTask("true");
                setShowJournalNotification(true);
            }
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
                <TouchableOpacity
                    onPress={()=>{
                        addEntry();
                        navigation.navigate("Journal Home Page");
                    }}
                    style={{
                        alignSelf: 'center',
                        marginTop: 80,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#568258',
                        padding: 10,
                        borderRadius: 10
                    }}
                    activeOpacity={0.8}
                    > 
                    <IconButton
                        iconName="check"
                        iconComponent={Feather}
                        size={30}
                        color="black"
                        onPress={()=>{
                            addEntry();
                            navigation.goBack();
                        }}
                    />
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}> Submit Entry </Text>
                </TouchableOpacity>
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
            <Text style = {entryPage.entryDate}> {entryDate} </Text>
            <View style = {entryPage.headerContainer}>
                <Text style = {entryPage.title} numberOfLines={2}>{entryTitle}</Text>
            </View>      
            {/* <ScrollView style = {{maxHeight: 500}}> */}
            <Text style = {entryPage.description}> {entryDescription} </Text>  
            {/* </ScrollView> */}
            <TouchableOpacity
                onPress={() => {
                    removeEntry();
                    navigation.navigate('Journal Home Page');
                }}
                style={{
                    bottom: -40,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#568258',
                    borderRadius: 10,
                    padding: 10
                }}
                activeOpacity={0.8} // Set activeOpacity to 1 to prevent opacity change on press
            >
                <IconButton
                    iconName = "trash"
                    iconComponent = {Ionicons}
                    size = {30}
                    color = "black"
                    onPress={() => {
                        removeEntry();
                        navigation.navigate('Journal Home Page');
                    }}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Remove Entry </Text>
            </TouchableOpacity>
        </View>
    )
}
    

