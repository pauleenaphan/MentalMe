import React, { useEffect } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import { Image } from "expo-image";
import { coverPage } from "./styles";

export const CoverPage = ({navigation, isLogged}) =>{
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(isLogged){
                navigation.navigate("Home Page");
            }else{
                navigation.navigate("Login Page");
            }
            
        }, 5000)
        return () => clearTimeout(timer);
    })

    return(
        <View style = {coverPage.container}>
            <Image
                source = {require("../imgs/logo.png")}
                style = {coverPage.logo}
            />
            <Text style = {coverPage.caption}> Your journey starts today! </Text>
            <Image
                source = {require("../imgs/loading.gif")}
                style = {coverPage.loadingGif}
            />
        </View>
    )
}
