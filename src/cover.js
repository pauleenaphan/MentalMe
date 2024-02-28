import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

export const CoverPage = ({navigation}) =>{
    useEffect(()=>{
        navigation.navigate('Create Account Page');
    }, [])//empty arr means run this once instead of every render
    return(
        <View style = {styles.container}>
            <Text>
                Welcome to Mental Me
            </Text>
        </View>
    )
}