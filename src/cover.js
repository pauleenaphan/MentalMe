import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

export const CoverPage = ({navigation}) =>{
    // useEffect(()=>{
    //     navigation.navigate('Create Account Page');
    // }, [])//empty arr means run this once instead of every render
    return(
        <View style = {styles.container}>
            <TouchableOpacity style = {{flex: 1, justifyContent: "center"}} onPress = {()=>{
                navigation.navigate('Create Account Page');
            }}>
                <Text>
                    Welcome to Mental Me
                </Text>
            </TouchableOpacity>
        </View>
    )
}