import React, { useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button, Text } from 'react-native';
import { GiftedChat, Bubble, Day, InputToolbar } from 'react-native-gifted-chat';
import { setDoc, doc, getDoc} from '@firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { db } from '../firebase/index.js';
import { getUserInfo } from './userInfo';
import { getCurrEmail } from './account';
import { chatPage } from './styles.js';

export const ChatPage = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [newUserStatus, setNewUserStatus] = useState('true'); //used to track whether or not the user is new
    const {userName, setUserName} = getUserInfo();

    //generates a unique id so there is no conflict
    const generateMessageId = () => Math.round(Math.random() * 1000000);

    const initializeChat = (displayText) => {
        return [{
            //info about the message being sent
            _id: generateMessageId(),
            text: displayText,
            createdAt: new Date(),
            //describes who sent the message
            user: {
                _id: 2,
                name: 'Moobie',
                avatar: require('../imgs/moobie_head/head1.png'),
            },
        }];
    };

    //checks the user status in the firebase
    const checkStatus = async () => {
        try {
            let currentUserEmail = await getCurrEmail();
            //console.log("Current User Email:", currentUserEmail); 
            const userStatus = await getDoc(doc(db, currentUserEmail, "User Status"));
            //console.log("User Status Data:", userStatus.data().status); 
            setNewUserStatus(userStatus.data().status);
            return userStatus.data().status; //returns true or false
        } catch (error) {
            console.error("Error getting user status:", error);
            return false;
        }
    };

    //used to get the user status and name, so both values updates correctly
    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const status = await checkStatus();
                    //console.log("User Status:", status);
                    setNewUserStatus(status);

                    let currentUserEmail = await getCurrEmail();
                    const username = await getDoc(doc(db, currentUserEmail, "Username"));
                    //console.log(username.data().name);
                    setUserName(username.data().name);
                } catch (error) {
                    console.error("Error fetching user status:", error);
                }
            };
            fetchData();
        }, [])
    );
    
    //checks whether or not the user is new so we can display the correct chat prompt
    useFocusEffect(
        React.useCallback(() => {
            console.log("NEW USER STATUS: ", newUserStatus);
            if (newUserStatus == 'true' || newUserStatus == true) {
                const text = "Hi! I'm Moobie, your very own personal mental health buddy! My goal is to help you on your journey to improving your mental health! Before we begin, what should I call you, friend?";
                setMessages(initializeChat(text));
            } else if (newUserStatus === 'false' || newUserStatus === false) {
                //message for returning users
                const text = "Hi " + userName + ", I hope your day is going well! What can I help you with today?";
                setMessages(initializeChat(text));
            }
        }, [newUserStatus, userName])
    );

    //this function will handle the user input based on what they press for the options
    const handleUserInput = (newMessages = []) => {
        const userMessage = newMessages[0];
        //handle button press without adding it to the chat messages
        const botResponse = getBotResponse(userMessage.text);
        //loops through the response array because in our responses some of the text options can be in the form of an array to send two msgs in a row
        if (Array.isArray(botResponse)) {
            botResponse.forEach(message => {
                //adds on to the previous message
                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, [
                        {
                            _id: generateMessageId(),
                            ...message
                        }
                    ])
                );
            });
        } else {
            //if the msg is not in the form of an array then just add that single msg to the chat "from Moobie"
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [
                    {
                        _id: generateMessageId(),
                        text: botResponse,
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: 'Moobie',
                            avatar: require('../imgs/moobie_head/head1.png'),
                        },
                    }
                ])
            );
        }
        return; 
    };

    const getBotResponse = (userInput) => {
        //Moobie responses and the button options
        const responses = {
            //journal options
            'Journaling': ["Journaling is the main feature of this app! You will be able to write about your thoughts and feelings daily here! \n Got any questions about journaling?"],
            'Why should I journal': ["Everyone gets super busy and forgets to take care of their mental health. Journaling can be a quick and effective activity that will help you unload your thoughts and stay in check of where you are at mentally. \n Any other questions about journaling?"],
            'What should I journal about': ["You can start by writing down how your day/week has been so far! The best thing to do is just write down whatever comes to mind and more specifically, venting thoughts that you want to process. \n Anything else you want to know about journaling?"],
            'Where do I journal': ["You can start journaling by pressing on the journal tab in the homepage. Here, I can navigate you to the page if you would like"],
            'No thank you': ["What else can Moobie help you with journaling?"],
            'Take me to the journal page': ["Moobie will take you there!"],

            //daily log options
            'Daily Logs': ["Daily logs is a tab where you can see your progress on the app! It's important to be consistent, but it's also okay to miss a day sometimes. Just know that each time you login you will get a honey coin!"],
            'Tell me more about the daily logs': ["On the page you can find your weekly login progress and your all time statistics. You can see your total daily logins, consecutive logins, and your longest login streaks! Moobie can't wait to see your progress"],
            'Take me to the daily log page': ["Moobie will take you there!"],
            'Back to the main menu': ["What can Moobie help you with?"],

            //moobie options
            'Moobie': ["It's me! Moobie! While I am here to help you on your journey, I am also here to be here whenever you need me!"],
            'Tell me about Moobie': ["I'm a beaver bear that loves to eat honey. I could eat it all day! My favorite thing to do would have to be eating honey in my tree."],
            'Why are you so cool?': ["I'm cool because i'm Moobie, and Moobie is the best. "],
            'What kind of honey do you like?': ["My favorite honey would have to be the good kind!"],

            //store options
            'Shop': ["The store is where you can buy clothes for me using honey coins. P.S. my favorite item in there has to be the HILHIL (honey is love honey is life) shirt."],
            'What are honey coins?': ["Honey coins is our currency that can be used to buy clothes! To get these coins you can complete daily task like logging in and completing a journal. Just know that if you log in 7 days a week you get an extra coin!"],
            'Whats in the store?': ["There are all kinds of clothes and accessories in the store! There's stuff like hats, glasses, shirts, costumes, and slippers."],
            'Where do I equip the clothes I bought?': ["You can dress me up at the closet! That is where you find all the clothes you bought for me"],
            'Take me to the closet': ["Moobie will take you there!"],
            'Take me to the store page': ["Moobie will take you there!"],

            //account options
            'Account Information': ["You can find all of your account information in the settings! Here, Moobie can take you to the settings if you would like!"],
            'Take me to the settings page': ["Moobie will take you there!"],
        };
        
        {/* Key words are being called when even when the user presses on a button option. We only want these keywords to activate when the user manually
            types in the bar. Currently not working */}
    
        // const journalKeywords = ["journaling", "journal", "write", "entry"]
        // const dailyLogKeywords = ["daily logs", "logs", "progress", "check in"]
        // const moobieKeywords = ["moobie", "honey"] 
        // const storeKeywords = ["honey coins", "store", "shop", "clothes", "closet", "currency", "buy", "dress up"]
        // const accountKeywords = ["account", "settings", "password", "email", "change"]

        let response;
        //if this is a new user then prompt the dialogue where Moobie will ask for the user's name
        if(newUserStatus == 'true') {
            setUserName(userInput);
            //console.log("user name has been set ", userInput);
            setNewUserStatus('false');
            response = ["Nice to meet you " + userInput + ". To start, let me introduce a few things I can do for you! On our homepage you can journal, check your daily logs, buy clothes, and dress me up! Which feature would you like to learn more about?"];
            
            //set status to false, so the introductory message won't play again
            (async () => {
                try {
                    console.log("this status is being assigned");
                    let currentUserEmail = await getCurrEmail();
                    await setDoc(doc(db, currentUserEmail,'User Status'),{
                        status: false
                    });
                    await setDoc(doc(db, currentUserEmail, 'Username'), {
                        name: userInput
                    })
                    AsyncStorage.setItem("UserName", JSON.stringify(userInput));
                } catch(error) {
                    console.log("error", error);
                }
            })();
        }
        // }else if(journalKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
        //     response = responses['Journaling'];
        // }else if(dailyLogKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
        //     response = responses['Daily Logs'];
        // }else if(moobieKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
        //     response = responses['Moobie'];
        // }else if(storeKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
        //     response = responses['Shop'];
        // }else if(accountKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
        //     response = responses['Account Information'];
        // }
        else{
            response = responses[userInput];
        }
        
        //if the response is an array map thru and return everything
        if (response && Array.isArray(response)) {
            return response.map((text) => ({
                _id: generateMessageId(),
                text,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Moobie',
                    avatar: require('../imgs/moobie_head/head1.png'),
                },
            }));
        } else if (response) {
            return response;
        } else {
            return "I'm sorry! Moobie does not understand.";
        }
    };

    //used to style and create option button
    const OptionButton = ({title, onPress}) => (
        <View style={chatPage.btn}>
            <Button title={title} onPress={onPress} color = 'white' />
        </View>
    );

    //this will create the buttons that Moobie offers as options
    const renderBubble = (props) => {
        const { currentMessage } = props;
        
        let buttons = null;
        if(currentMessage.user._id === 2) {
            //Main menu page with the options for journaling, progress, shop, and closet
            if(currentMessage.text.includes("Nice to meet you") || currentMessage.text.includes("help you with")) {
                buttons = (
                    <View style = {chatPage.btnContainer}>
                        <OptionButton title="Journaling" onPress={() => handleButtonPress("Journaling")}/>
                        <OptionButton title="Daily Logs" onPress={() => handleButtonPress("Daily Logs")}/>
                        <OptionButton title="Moobie" onPress={() => handleButtonPress("Moobie")}/>
                        <OptionButton title="Shop" onPress={() => handleButtonPress("Shop")}/>
                        <OptionButton title="Account Information" onPress={() => handleButtonPress("Account Information")}/>
                    </View>
                );
            //journal options
            }else if(currentMessage.text.toLowerCase().includes("journaling")){
                if(currentMessage.text.toLowerCase().includes("navigate")){
                    buttons = (
                        <View style = {chatPage.btnContainer}>
                            <OptionButton title = "Take me to the journal page!" onPress = {() => {handleButtonPress("Take me to the journal page");}}/>
                            <OptionButton title = "No thank you" onPress = {() => handleButtonPress("No thank you")}/>
                        </View>
                    )
                }else{
                    buttons = (
                        <View style = {chatPage.btnContainer}>
                            <OptionButton title = "Why should I journal?" onPress = {() => handleButtonPress("Why should I journal")}/>
                            <OptionButton title = "What should I journal about?" onPress = {() => handleButtonPress("What should I journal about")}/>
                            <OptionButton title = "Where do I journal?" onPress = {() => handleButtonPress("Where do I journal")}/>
                            <OptionButton title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                        </View>
                    );
                }
            //daily login options 
            }else if(currentMessage.text.toLowerCase().includes("daily logs") || currentMessage.text.toLowerCase().includes("daily logins")){
                buttons = (
                    <View style = {chatPage.btnContainer}>
                        <OptionButton title = "Tell me more about the daily logs" onPress = {() => handleButtonPress("Tell me more about the daily logs")}/>
                        <OptionButton title = "Take me to the daily log page" onPress = {() => {handleButtonPress("Take me to the daily log page")}}/>
                        <OptionButton title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                    </View>
                )  
            //moobie options
            }else if(
                currentMessage.text.toLowerCase().includes("you need me") || 
                currentMessage.text.toLowerCase().includes("beaver bear") || 
                currentMessage.text.toLowerCase().includes("i'm cool") || 
                currentMessage.text.toLowerCase().includes("favorite honey")){
                buttons = (
                    <View style = {chatPage.btnContainer}>
                        <OptionButton title = "Tell me about Moobie" onPress = {() => handleButtonPress("Tell me about Moobie")}/>
                        <OptionButton title = "Why are you so cool?" onPress = {() => handleButtonPress("Why are you so cool?")}/>
                        <OptionButton title = "What kind of honey do you like?" onPress = {() => handleButtonPress("What kind of honey do you like?")}/>
                        <OptionButton title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                    </View>
                )
            //store options
            }else if(currentMessage.text.toLowerCase().includes("store") || currentMessage.text.toLowerCase().includes("honey coins") || currentMessage.text.toLowerCase().includes("clothes")){
                buttons = (
                    <View style = {chatPage.btnContainer}>
                        <OptionButton title = "What are honey coins?" onPress = {() => handleButtonPress("What are honey coins?")}/>
                        <OptionButton title = "Whats in the store?" onPress = {() => handleButtonPress("Whats in the store?")}/>
                        <OptionButton title = "Where do I equip the clothes I bought?" onPress = {() => handleButtonPress("Where do I equip the clothes I bought?")}/>
                        <OptionButton title = "Take me to the closet" onPress = {() => handleButtonPress("Take me to the closet")}/>
                        <OptionButton title = "Take me to the store page" onPress = {() => handleButtonPress("Take me to the store page")}/>
                        <OptionButton title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                    </View>
                )
            //account info options
            }else if(currentMessage.text.toLowerCase().includes("account information")){
                buttons = (
                    <View style = {chatPage.btnContainer}>
                        <OptionButton title = "Take me to the settings page" onPress = {() => handleButtonPress("Take me to the settings page")}/>
                        <OptionButton title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                    </View>
                )
            }
        }
    
        return (
            <View>
                <Bubble {...props} 
                    wrapperStyle={{
                        left: {
                            backgroundColor: 'white',
                            paddingTop: 5,
                            paddingLeft: 5,
                            paddingRight: 5,
                            width: '80%',
                        },
                        right: {
                            backgroundColor: '#DBE9D9',
                            paddingTop: 5,
                            paddingLeft: 5,
                            width: '80%',
                        },
                    }}
                    textStyle={{
                        left: {
                            color: 'black', 
                            fontSize: 17,
                            lineHeight: 20
                            
                        },
                        right: {
                            color: 'black', 
                            fontSize: 17,
                            lineHeight: 20
                        },
                    }}
                    
                />
                {buttons}
            </View>
        );
    };
    
    const handleButtonPress = (buttonTitle) => {
        // Add the pressed button title to the chat log
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [
                {
                    _id: generateMessageId(),
                    text: buttonTitle,
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: "User",
                    },
                },
            ])
        );
    
        //handles all of the button actions for navigation
        //checks for the specific navigation button or regular choice button
        if(buttonTitle === "Take me to the journal page") {
            navigation.navigate("Journal Home Page");
        }else if(buttonTitle === "Take me to the daily log page"){
            navigation.navigate("Progress Tracking");
        }else if(buttonTitle === "Take me to the store page"){
            navigation.navigate("Store Page");
        }else if(buttonTitle === "Take me to the closet"){
            navigation.navigate("Closet Page");
        }else if(buttonTitle === "Take me to the settings page"){
            navigation.navigate("Settings Page");
        }else{
            handleUserInput([{ text: buttonTitle, buttonPressed: true }]);
        }
    };
    
    renderDay = (props) => {
        return <Day {...props} textStyle={chatPage.day} />;
    }

    renderTime = (props) =>{
        return <Text style={chatPage.time}>{formatTime(props.currentMessage.createdAt)}</Text>
    }

    renderInputToolbar = (props) => {
        // Here you will return your custom InputToolbar component with your desired text input
        return (
            <InputToolbar
                {...props}
                //containerStyle={{}}
                textInputProps={{
                    fontSize: 18,
                    placeholder: "Send a message to Moobie",
                    paddingTop: 10, 
                    paddingLeft: 20      
                }}
            />
        );
    }

    return (
        <View style = {chatPage.userChatContainer}>
            {/* for the user */}
            <GiftedChat
                messages={messages}
                onSend={handleUserInput}
                user={{
                    _id: 1,
                    name: 'User',
                }}
                renderBubble={renderBubble}
                renderTime = {renderTime}
                renderDay = {renderDay}
                renderInputToolbar = {renderInputToolbar}
            />
        </View>      
    );
};

// Function to format time
const formatTime = (time) => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    const formattedMinute = minute < 10 ? `0${minute}` : minute; // Add leading zero if minute is less than 10
    return `${formattedHour}:${formattedMinute} ${ampm}`;
};
