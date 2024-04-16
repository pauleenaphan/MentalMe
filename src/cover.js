import React, { useEffect } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import { Image } from "expo-image";
import { withSpring } from 'react-native-reanimated';

export const CoverPage = ({navigation, isLogged}) =>{
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigation.navigate("Home Page");
        }, 3000)
        return () => clearTimeout(timer);
    })

    return(
        <View style = {{backgroundColor: "#B6D3B3", flex: 1, alignItems: 'center', paddingTop: 200}}>
            {/* <Text style = {{fontSize: 50, marginBottom: 20}}> Welcome to </Text> */}
            <Image
                source = {require("../imgs/logo.png")}
                style = {{width: '120%', height: '40%', marginBottom: -140, marginLeft: 20
                }}
            />
            <Text style = {{textAlign: 'right', width: '80%', fontSize: 20, fontWeight: 'bold'}}> Your journey starts today! </Text>
            <Image
                source = {require("../imgs/loading.gif")}
                style = {{width: '130%',  height: 200, marginTop: 100, marginLeft: 50}}
            />
        </View>
    )
}