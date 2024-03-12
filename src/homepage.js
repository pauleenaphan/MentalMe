import React, { useEffect } from "react";
import { View, Text, Button, Image } from "react-native"

import { styles } from "./styles.js";

//Main home page 
export const HomePage = ({navigation}) =>{
    return(
        <View style = {styles.container}>
            <Text>
                homepage
            </Text>
            <Button
                title = "go to main journal page (temp)"
                onPress = {() => navigation.navigate('Journal Home Page')}
            />
            <Button
                title = "progress tracking (temp)"
                onPress = {() => navigation.navigate("Progress Tracking")}
            />
            <Button
                title = "go to settings page (temp)"
                onPress = {() => navigation.navigate("Settings Page")}
            />
        </View>
    );
};