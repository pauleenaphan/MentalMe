import React from "react";
import { View, Text, Button } from "react-native";

import { styles } from "./styles.js";
import { getUserInfo } from "./userInfo.js";


export const LoadingPage = ({navigation, personalInfo}) =>{
    const { userEmail } = getUserInfo();
    return(
        <View style = {styles.container}>
            <Text>
                Moobie loading page
            </Text>
            <Button
                title = "print user email"
                onPress = {() => {
                    console.log(userEmail);
                }}
            />
        </View>
    );
};