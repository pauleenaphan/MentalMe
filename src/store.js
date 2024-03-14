import React, { useEffect, useState, useFocusEffect } from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";
import { doc, setDoc, addDoc, collection } from "@firebase/firestore";

import { db } from "../firebase/index.js";
import { getCurrEmail } from "./account.js";
import { clothesImg, styles } from "./styles.js";



const Tab = createBottomTabNavigator();

//Main home page 
export const StorePage = () =>{
    //popup view for the item confirmation
    const [isPopupVisible, setPopup] = useState(false);
    const [confirmPopupVisible, setConfirmPopup] = useState(false);
    const [boughtItem, setBoughtItem] = useState({
        itemName: '',
        image: ''
    })

    const [headAcc, setHeadAcc] = useState({
        itemName: '',
        image: '',
        imageSrc: ''
    });

    const handleBoughtItem = (itemName, itemImg)=>{
        setBoughtItem({
            itemName: itemName,
            image: itemImg
        })
    }

    const handleHeadAcc = (itemName, itemImg, itemSrc) =>{
        setHeadAcc({
            itemName: itemName,
            image: itemImg,
            imageSrc: itemSrc
        })
    }

    //toggles the itempopup
    const toggleItemPopup = () =>{
        setPopup(!isPopupVisible);
    }

    const HeadAccTab = () =>{
        const headImgs = [
            {name: 'Detective Hat', image: require('../imgs/moobie_head/head2.png'), imageP: ('../imgs/moobie_head/head2.png'),},
            {name: 'Wicked Glasses', image: require('../imgs/moobie_head/head3.png'), imageP: ('../imgs/moobie_head/head3.png')},
            {name: 'Shades', image: require('../imgs/moobie_head/head4.png'), imageP: ('../imgs/moobie_head/head4.png')},
        ]

        return(
            <ScrollView>
                <View style = {styles.container}>
                    
                    {/* maps through the headimgs instead of printing them all out here */}
                    {headImgs.map((img) =>(
                        <View key = {img.name}>
                            <Image source = {img.image} style = {clothesImg.store}/>
                            <Button
                                title = {img.name}
                                onPress = {()=>{
                                    toggleItemPopup();
                                    //After pressing on an item, set that item to the current head item
                                    handleHeadAcc(img.name, img.image, img.imageP);
                                    console.log("Thsi is img.image path" + img.imageP);
                                }}
                            /> 
                        </View>
                    ))}

                    <Modal isVisible = {isPopupVisible}>
                        <View style = {styles.container}>
                            <Text> This is the popup</Text>
                            <Text> {headAcc.itemName} </Text>
                            <Image source = {headAcc.image} style = {clothesImg.store}/>
                            <Button
                                title = "return to store page"
                                onPress = {toggleItemPopup}
                            />
                            <Button
                                title = "Buy Item"
                                onPress = {() =>{
                                    console.log("user bought item");
                                    console.log("headacc values" + headAcc.itemName + headAcc.imageSrc);
                                    handleBoughtItem(headAcc.itemName, headAcc.imageSrc);
                                    addToCloset();
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
                            <Image source = {img.image} style = {clothesImg.store}/>
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
                            <Image source = {img.image} style = {clothesImg.store}/>
                            <Button
                                title = {img.name}
                            /> 
                        </View>
                    ))}
                </View>
            </ScrollView>
        )
    }

    const addToCloset = async () =>{
        try{
            let currentUserEmail = await getCurrEmail();
            //creates a subcollection in User Information Document called Journal Entries
            await addDoc(collection(db, currentUserEmail, "User Information Document", "Moobie's Closet"),{
                itemName: boughtItem.itemName,
                itemImageSrc: boughtItem.image
            });
            console.log("item was added to the user's closet: " + boughtItem.itemName);
        }catch(error){
            console.log("error " + error)
        }
    }

    return(
        <Tab.Navigator>
            <Tab.Screen name = "Head Tab" component = {HeadAccTab}/>
            <Tab.Screen name = "Body Tab" component = {BodyAccTab}/>
            <Tab.Screen name = "Shoe Tab" component = {ShoeAccTab}/> 
        </Tab.Navigator>
    );
};

