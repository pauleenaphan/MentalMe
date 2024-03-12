import React, { useEffect } from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { storeImgs, styles } from "./styles.js";

//tab for head accessory items
const HeadAccTab = () =>{
    const headImgs = [
        {name: 'Detective Hat', image: require('../imgs/moobie_head/head2.png')},
        {name: 'Wicked Glasses', image: require('../imgs/moobie_head/head3.png')},
        {name: 'Shades', image: require('../imgs/moobie_head/head4.png')},
    ]

    return(
        <ScrollView>
            <View style = {styles.container}>
            {/* maps through the headimgs instead of printing them all out here */}
                {headImgs.map((img) =>(
                    <View key = {img}>
                        <Image source = {img.image} style = {storeImgs.item}/>
                        <Button
                            title = {img.name}
                        /> 
                    </View>
                ))}
            </View>
        </ScrollView>  
    )
}

//tab for body accessory items
const BodyAccTab = () =>{
    const bodyImgs = [
        {name: 'Gold Chain', image: require('../imgs/moobie_body/body2.png')},
    ]
    
    return(
        <ScrollView>
            <View style = {styles.container}>
            {/* maps through the headimgs instead of printing them all out here */}
                {bodyImgs.map((img) =>(
                    <View key = {img}>
                        <Image source = {img.image} style = {storeImgs.item}/>
                        <Button
                            title = {img.name}
                        /> 
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const ShoeAccTab = ({navigation}) =>{
    const lowerBodyImgs = [
        {name: 'Pink Bunny Slippers', image: require('../imgs/moobie_feet/feet2.png')},
    ]
    
    return(
        <ScrollView>
            <View style = {styles.container}>
            {/* maps through the headimgs instead of printing them all out here */}
                {lowerBodyImgs.map((img) =>(
                    <View key = {img}>
                        <Image source = {img.image} style = {storeImgs.item}/>
                        <Button
                            title = {img.name}
                            onPress = {()=>{
                                viewItemPage('body', '../imgs/moobie_feet/feet2.png');
                                navigation.navigate('View Item Page');
                            }}
                        /> 
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const Tab = createBottomTabNavigator();

//Main home page 
export const StorePage = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name = "Head Tab" component = {HeadAccTab}/>
            <Tab.Screen name = "Body Tab" component = {BodyAccTab}/>
            <Tab.Screen name = "Shoe Tab" component = {ShoeAccTab}/> 
        </Tab.Navigator>
    );
};

export const ViewItemPage = ({itemName, itemImage}) =>{
    return(
        <View style = {styles.container}>
            <Text> {itemName} </Text>
            <Image source = {itemImage}/>
        </View>
    )
}