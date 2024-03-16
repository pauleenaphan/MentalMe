import React, { useCallback, useEffect } from "react";
import { View, Text, Button, Image } from "react-native"

import { homePageMoobie, styles } from "./styles.js";
import { getMoobie } from "./moobie.js";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Main home page 
export const HomePage = ({navigation}) =>{
    const {bodyPart, handlePart} = getMoobie();

    const setBody = async () => {
        try {
            const [currHead, currBody, currLowerBody] = await Promise.all([
                AsyncStorage.getItem("moobie_head"),
                AsyncStorage.getItem("moobie_body"),
                AsyncStorage.getItem("moobie_lowerBody")
            ]);
    
            console.log("This is the current head in async storage: ", currHead);
            handlePart("head", JSON.parse(currHead));
            console.log("Current body head: ", bodyPart.head);
    
            handlePart("body", JSON.parse(currBody)); 
            handlePart("lowerBody", JSON.parse(currLowerBody)); 
        } catch (error) {
            console.error("Error in setBody:", error);
        }
    };

    useFocusEffect(
        React.useCallback(()=>{
            setBody();
            console.log("body part changed");
        }, [])
    )
    
    useEffect(() => {
        console.log("Updated body head: ", bodyPart.head);
    }, [bodyPart.head]);
    
    return(
        <View style = {styles.container}>
            <Text>
                homepage
            </Text>
            <Image source = {bodyPart.head} style = {homePageMoobie.moobie_head}/>
            <Image source = {bodyPart.body} style = {homePageMoobie.moobie_body}/>
            <Image source = {bodyPart.lowerBody} style = {homePageMoobie.moobie_feet}/>
            <Button
                title = "go to main journal page (temp)"
                onPress = {() => navigation.navigate('Journal Home Page')}
            />
            <Button
                title = "progress tracking (temp)"
                onPress = {() => navigation.navigate("Progress Tracking")}
            />
            <Button
                title = "store (temp)"
                onPress = {() => navigation.navigate("Store Page")}
            />
            <Button
                title = "Closet (temp)"
                onPress = {() => navigation.navigate("Closet Page")}
            />
            <Button
                title = "go to settings page (temp)"
                onPress = {() => navigation.navigate("Settings Page")}
            />
        </View>
    );
};