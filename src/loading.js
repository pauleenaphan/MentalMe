import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles.js";


export const LoadingPage = ({navigation}) =>{
    return(
        <View style = {styles.container}>
            <Text>
                Moobie Loading Page
            </Text>
        </View>
    );
};