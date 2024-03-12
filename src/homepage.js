import React, { useCallback, useEffect } from "react";
import { View, Text, Button, Image } from "react-native"

import { styles } from "./styles.js";
import { getMoobie } from "./moobie.js";
import { useFocusEffect } from "@react-navigation/native";

//Main home page 
export const HomePage = ({navigation}) =>{
    const {bodyPart, handlePart} = getMoobie();

    useFocusEffect(
        React.useCallback(()=>{
            console.log("body part changed");
        }, [bodyPart])
    )
    
    return(
        <View style = {styles.container}>
            <Text>
                homepage
            </Text>
            <Image source = {bodyPart.head} style = {styles.moobie_head}/>
            <Image source = {bodyPart.body} style = {styles.moobie_body}/>
            <Image source = {bodyPart.feet} style = {styles.moobie_feet}/>
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
                title = "go to settings page (temp)"
                onPress = {() => navigation.navigate("Settings Page")}
            />
        </View>
    );
};