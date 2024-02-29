import React from "react";
import { View, Text, Button } from "react-native";

import { styles } from "./styles.js";


export const LoadingPage = ({navigation, personalInfo}) =>{
    return(
        <View style = {styles.container}>
            <Text>
                Moobie loading page
            </Text>
            <Button
                title = "print user email"
                onPress = {()=>{
                    console.log(personalInfo.email)
                }}
            />
        </View>
    );
};