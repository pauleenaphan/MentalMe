import React, { useEffect, useState, useFocusEffect } from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";

import { storeImgs, styles } from "./styles.js";


const Tab = createBottomTabNavigator();

//Main home page 
export const StorePage = () =>{
    //popup view for the item confirmation
    const [isPopupVisible, setPopup] = useState(false);
    const [confirmPopupVisible, setConfirmPopup] = useState(false);
    const [headAcc, setHeadAcc] = useState({
        itemName: '',
        image: ''
    });

    const handleHeadAcc = (itemName, itemImg) =>{
        setHeadAcc({
            itemName: itemName,
            image: itemImg
        })

    }

    //toggles the itempopup
    const toggleItemPopup = () =>{
        setPopup(!isPopupVisible);
    }

    //toggle the confirm popup
    const toggleConfirmPopup = () =>{
        setConfirmPopup(!confirmPopupVisible);
    }

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
                        <View key = {img.name}>
                            <Image source = {img.image} style = {storeImgs.item}/>
                            <Button
                                title = {img.name}
                                onPress = {()=>{
                                    toggleItemPopup();
                                    handleHeadAcc(img.name, img.image);
                                }}
                            /> 
                        </View>
                    ))}
                    {/* This modal was not working correctly disabled for now */}
                    {/* <Modal isVisible = {confirmPopupVisible}>
                        <View style = {styles.container}>
                            <Button
                                title = "Confirm Purchase"
                            />
                            <Button
                                title = "Cancel Purchase"
                                onPress = {toggleConfirmPopup}
                            />
                        </View>
                    </Modal> */}

                    <Modal isVisible = {isPopupVisible}>
                        <View style = {styles.container}>
                            <Text> This is the popup</Text>
                            <Text> {headAcc.itemName} </Text>
                            <Image source = {headAcc.image} style = {storeImgs.item}/>
                            <Button
                                title = "return to store page"
                                onPress = {toggleItemPopup}
                            />
                            <Button
                                title = "Buy Item"
                                onPress = {() =>{
                                    console.log("user bought item");
                                    toggleItemPopup();
                                }}
                            />
                        </View>
                    </Modal>
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
                        <View key = {img.name}>
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

    //tab for shoe accessory items
    const ShoeAccTab = ({navigation}) =>{
        const lowerBodyImgs = [
            {name: 'Pink Bunny Slippers', image: require('../imgs/moobie_feet/feet2.png')},
        ]
        
        return(
            <ScrollView>
                <View style = {styles.container}>
                {/* maps through the headimgs instead of printing them all out here */}
                    {lowerBodyImgs.map((img) =>(
                        <View key = {img.name}>
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

    return(
        <Tab.Navigator>
            <Tab.Screen name = "Head Tab" component = {HeadAccTab}/>
            <Tab.Screen name = "Body Tab" component = {BodyAccTab}/>
            <Tab.Screen name = "Shoe Tab" component = {ShoeAccTab}/> 
        </Tab.Navigator>
    );
};