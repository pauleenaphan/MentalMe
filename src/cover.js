import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

export const CoverPage = ({navigation, isLogged}) =>{

    return(
        <View style = {styles.container}>
            <TouchableOpacity style = {{flex: 1, justifyContent: "center"}} onPress = {()=>{
                if(isLogged){
                    navigation.navigate('Home Page');
                }else{
                    console.log("not logged in yet")
                    navigation.navigate('Login Page');
                }
                
            }}>
            <Text>
                Welcome to Mental Me
            </Text>
            </TouchableOpacity>
        </View>
    )
}