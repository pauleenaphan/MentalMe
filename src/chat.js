import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { getUserInfo } from './userInfo';

export const ChatPage = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [newUserStatus, setNewUserStatus] = useState(true);
    const [prevChoice, setPrevChoice] = useState('');
    const [userInputHolder, setUserInputHolder] = useState('');
    const { userName, setUserName } = getUserInfo();

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

    useEffect(() => {
        // Check if the previous choice was 'where to journal' and the current input is 'yes'
        console.log("this is prevchoice: ", prevChoice, "this is userINput: ", userInputHolder)
        if (prevChoice === 'where to journal' && userInputHolder === 'yes') {
            setUserInputHolder(''); // Reset userInputHolder
            navigation.navigate('Journal Home Page');
        } else if (prevChoice === 'where to journal' && userInputHolder === 'no') {
            setUserInputHolder('');
            console.log("this is going throughhhh")
            setMessages(previousMessages => [
                ...previousMessages,
               initializeChat("Okay! What else can Moobie help you with? \n Why journaling? \n What to journal about? \n Where to journal?")
            ]);
        }
    }, [prevChoice, userInputHolder]); // Trigger this effect whenever prevChoice changes

    const handleUserInput = (newMessages = []) => {
        // Process user input and generate bot response
        const userMessage = newMessages[0];

        // Update conversation state with user message
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

        // Generate bot response
        const botResponse = getBotResponse(userMessage.text);

        // Check if bot response is an array of messages
        if (Array.isArray(botResponse)) {
            // Append each message separately
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
            // Append single bot response message
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, [
                    {
                        _id: generateMessageId(),
                        text: botResponse,
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: 'ChatBot',
                            avatar: require('../imgs/moobie_head/head1.png'),
                        },
                    }
                ])
            );
        }
    };

    const getBotResponse = (userInput) => {
        // Retrieve predefined bot response based on user input
        // You can implement your logic here to select the appropriate response
        // For example, you might use a switch statement, if-else conditions, or a lookup table
        // For demonstration, let's assume you have an object with predefined responses
        const responses = {
            'journaling': ["Journaling is the main feature of this app! You will be able to write about your thoughts and feelings daily here!", "Got any questions? \n Why journaling? \n What to journal about? \n Where to journal?"],
            'why journaling?': ["Everyone gets super busy and forgets to take care of their mental health. Journaling can be a quick and effective activity that will help you unload your thoughts and stay in check of where you are at mentally.", "Any other questions? \n Why journaling? \n What to journal about? \n Where to journal?"],
            'what to journal about?': ["You can start by writing down how your day/week has been so far! The best thing to do is just write down whatever comes to mind and more specifically, venting thoughts that you want to process.", "Anything else you want to know about? \n Why journaling? \n What to journal about? \n Where to journal?"],
            'where to journal': ["You can journal by pressing on the journal tab in the homepage. Would you like me to take you there?"]
            // Add more predefined responses here as needed

        };
        setUserInputHolder(userInput)

        let response;
        if (newUserStatus) {
            setUserName(userInput);
            console.log("this user's name is: ", userInput);
            setNewUserStatus(false);
            console.log("this is wORKING");
            response = ["Nice to meet you " + userInput + ". To start, let me introduce a few things I can do for you! On our homepage you can journal, check your daily logs, buy clothes, and dress me up! Which feature would you like to learn more about?", "\n Journaling \n Daily Logs \n Shop \n Closet"];
        } else {
            response = responses[userInput.toLowerCase()];
        }
        if (userInput === 'where to journal') {
            setPrevChoice(userInput);
        }

        // Check if additional messages need to be sent
        if (response && Array.isArray(response)) {
            // Append multiple messages
            return response.map((text, index) => ({
                _id: generateMessageId(),
                text,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'ChatBot',
                    avatar: require('../imgs/moobie_head/head1.png'),
                },
            }));
        } else if (response) {
            // Single message response
            return response;
        } else if (userInput === 'yes') {
            return "Moobie will show you the way!";
        } else {
            // Default response for unknown input
            return "I'm sorry! Moobie does not understand.";
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
        />
    );
};
