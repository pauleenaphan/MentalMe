import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { getUserInfo } from './userInfo';

export const ChatPage = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [newUserStatus, setNewUserStatus] = useState(true);
    const [prevChoice, setPrevChoice] = useState('');
    const [userInputHolder, setUserInputHolder] = useState('');
    const {userName, setUserName} = getUserInfo();

    const generateMessageId = () => Math.round(Math.random() * 1000000);

    const initializeChat = (displayText) => {
        return [{
            _id: generateMessageId(),
            text: displayText,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Moobie',
                avatar: require('../imgs/moobie_head/head1.png'),
            },
        }];
    };

    useEffect(() => {
        console.log("NEW USER STATUS: ", newUserStatus);
        if (newUserStatus) {
            const text = "Hi! I'm Moobie, your very own personal mental health buddy! My goal is to help you on your journey to improving your mental health! Before we begin, what should I call you, friend?";
            setMessages(initializeChat(text));
        }
    }, []);

    const handleUserInput = (newMessages = []) => {
        const userMessage = newMessages[0];
        
        // Check if the message is triggered by a button press
        if (userMessage.buttonPressed) {
            // Handle button press without adding it to the chat messages
            const botResponse = getBotResponse(userMessage.text);
            if (Array.isArray(botResponse)) {
                botResponse.forEach(message => {
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
            return; // Exit the function after handling the button press
        }
    
        // If the message is not triggered by a button press, add it to the chat messages
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [
                {
                    _id: generateMessageId(),
                    text: userMessage.text,
                    createdAt: new Date(),
                    user: userMessage.user,
                }
            ])
        );
        
        const botResponse = getBotResponse(userMessage.text);
        if (Array.isArray(botResponse)) {
            botResponse.forEach(message => {
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
    };
    
    

    const getBotResponse = (userInput) => {
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
        const journalKeywords = ["journaling", "journal", "write", "entry"]
        const dailyLogKeywords = ["daily logs", "logs", "progress", "check in"]
        const moobieKeywords = ["moobie", "honey"] 
        const storeKeywords = ["honey coins", "store", "shop", "clothes", "closet", "currency", "buy", "dress up"]
        const accountKeywords = ["account", "settings", "password", "email", "change"]

        setUserInputHolder(userInput);
        let response;
        if(newUserStatus) {
            setUserName(userInput);
            setNewUserStatus(false);
            response = ["Nice to meet you " + userInput + ". To start, let me introduce a few things I can do for you! On our homepage you can journal, check your daily logs, buy clothes, and dress me up! Which feature would you like to learn more about?"];
        }else if(journalKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
            response = responses['Journaling'];
        }else if(dailyLogKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
            response = responses['Daily Logs'];
        }else if(moobieKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
            response = responses['Moobie'];
        }else if(storeKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
            response = responses['Shop'];
        }else if(accountKeywords.some(keyword => userInput.toLowerCase().includes(keyword))){
            response = responses['Account Information'];
        }
        else{
            response = responses[userInput];
        }
        
        if (response && Array.isArray(response)) {
            return response.map((text, index) => ({
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

    const renderBubble = (props) => {
        const { currentMessage } = props;
        
        let buttons = null;
        // console.log("Hi! I'm Moobie", currentMessage.text);
        if(currentMessage.user._id === 2) {
            //Main menu page with the options for journaling, progress, shop, and closet
            if(currentMessage.text.includes("Nice to meet you") || currentMessage.text.includes("What can Moobie help you with?")) {
                buttons = (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Button title="Journaling" onPress={() => handleButtonPress("Journaling")} />
                        <Button title="Daily Logs" onPress={() => handleButtonPress("Daily Logs")} />
                        <Button title="Moobie" onPress={() => handleButtonPress("Moobie")} />
                        <Button title="Shop" onPress={() => handleButtonPress("Shop")} />
                        <Button title="Account Information" onPress={() => handleButtonPress("Account Information")} />
                    </View>
                );
            //journal options
            }else if(currentMessage.text.toLowerCase().includes("journaling") || userInputHolder.includes("journal")){
                if(currentMessage.text.toLowerCase().includes("navigate")){
                    buttons = (
                        <View>
                            <Button title = "Take me to the journal page!" onPress = {() => {handleButtonPress("Take me to the journal page");}}/>
                            <Button title = "No thank you" onPress = {() => handleButtonPress("No thank you")}/>
                        </View>
                    )
                }else{
                    buttons = (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Button title = "Why should I journal?" onPress = {() => handleButtonPress("Why should I journal")}/>
                            <Button title = "What should I journal about?" onPress = {() => handleButtonPress("What should I journal about")}/>
                            <Button title = "Where do I journal?" onPress = {() => handleButtonPress("Where do I journal")}/>
                            <Button title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                        </View>
                    );
                }
            //daily login options 
            }else if(currentMessage.text.toLowerCase().includes("daily logs") || currentMessage.text.toLowerCase().includes("daily logins")){
                buttons = (
                    <View>
                        <Button title = "Tell me more about the daily logs" onPress = {() => handleButtonPress("Tell me more about the daily logs")}/>
                        <Button title = "Take me to the daily log page" onPress = {() => {handleButtonPress("Take me to the daily log page")}}/>
                        <Button title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                    </View>
                )  
            //moobie options
            }else if(
                currentMessage.text.toLowerCase().includes("you need me") || 
                currentMessage.text.toLowerCase().includes("beaver bear") || 
                currentMessage.text.toLowerCase().includes("i'm cool") || 
                currentMessage.text.toLowerCase().includes("favorite honey")){
                buttons = (
                    <View>
                        <Button title = "Tell me about Moobie" onPress = {() => handleButtonPress("Tell me about Moobie")}/>
                        <Button title = "Why are you so cool?" onPress = {() => handleButtonPress("Why are you so cool?")}/>
                        <Button title = "What kind of honey do you like?" onPress = {() => handleButtonPress("What kind of honey do you like?")}/>
                        <Button title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                    </View>
                )
            //store options
            }else if(currentMessage.text.toLowerCase().includes("store") || currentMessage.text.toLowerCase().includes("honey coins") || currentMessage.text.toLowerCase().includes("clothes")){
                buttons = (
                    <View>
                        <Button title = "What are honey coins?" onPress = {() => handleButtonPress("What are honey coins?")}/>
                        <Button title = "Whats in the store?" onPress = {() => handleButtonPress("Whats in the store?")}/>
                        <Button title = "Where do I equip the clothes I bought?" onPress = {() => handleButtonPress("Where do I equip the clothes I bought?")}/>
                        <Button title = "Take me to the closet" onPress = {() => handleButtonPress("Take me to the closet")}/>
                        <Button title = "Take me to the store page" onPress = {() => handleButtonPress("Take me to the store page")}/>
                        <Button title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                    </View>
                )
            //account info options
            }else if(currentMessage.text.toLowerCase().includes("account information")){
                buttons = (
                    <View>
                        <Button title = "Take me to the settings page" onPress = {() => handleButtonPress("Take me to the settings page")}/>
                        <Button title = "Back to the main menu" onPress = {()=> handleButtonPress("Back to the main menu")}/>
                    </View>
                )
            }
        }
    
        return (
            <View>
                <Bubble {...props} />
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
    
        //handles all of the button actions
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

    return (
        <GiftedChat
            messages={messages}
            onSend={handleUserInput}
            user={{
                _id: 1,
                name: 'User',
            }}
            renderBubble={renderBubble}
        />
    );
};
