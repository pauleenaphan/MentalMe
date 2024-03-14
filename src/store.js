import React, { useEffect, useState, useFocusEffect } from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";
import { doc, setDoc, addDoc, collection } from "@firebase/firestore";

import { db } from "../firebase/index.js";
import { getCurrEmail } from "./account.js";
import { clothesImg, styles } from "./styles.js";
import { images } from "./images.js";



const Tab = createBottomTabNavigator();

//Main home page 
export const StorePage = () =>{
    const [isPopupVisible, setPopup] = useState(false);
    const [boughtItem, setBoughtItem] = useState({
        itemName: '',
        image: '',
    })

    const handleBoughtItem = (itemName, itemImg)=>{
        setBoughtItem({
            itemName: itemName,
            image: itemImg,
        })
    }
    //toggles the itempopup
    const toggleItemPopup = () =>{
        setPopup(!isPopupVisible);
    }

    const HeadAccTab = () =>{
        return(
            <ScrollView>
                <View style = {styles.container}>
                    
                    {/* maps through the headimgs instead of printing them all out here */}
                    {images.headImgs.map((img) =>(
                        <View key = {img.name}>
                            <Image source = {img.image} style = {clothesImg.store}/>
                            <Button
                                title = {img.name}
                                onPress = {()=>{
                                    handleBoughtItem(img.name, img.image);
                                    toggleItemPopup();
                                }}
                            /> 
                        </View>
                    ))}

                    <Modal isVisible = {isPopupVisible}>
                        <View style = {styles.container}>
                            <Text> This is the popup</Text>
                            <Text> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {clothesImg.store}/>
                            <Button
                                title = "return to store page"
                                onPress = {toggleItemPopup}
                            />
                            <Button
                                title = "Buy Item"
                                onPress = {() =>{
                                    console.log("user bought item: " + boughtItem.itemName);
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
        return(
            <ScrollView>
                <View style = {styles.container}>
                    {/* maps through the headimgs instead of printing them all out here */}
                    {images.bodyImgs.map((img) =>(
                        <View key = {img.name}>
                            <Image source = {img.image} style = {clothesImg.store}/>
                            <Button
                                title = {img.name}
                                onPress = {()=>{
                                    handleBoughtItem(img.name, img.image);
                                    toggleItemPopup();
                                }}
                            /> 
                        </View>
                    ))}

                    <Modal isVisible = {isPopupVisible}>
                        <View style = {styles.container}>
                            <Text> This is the popup</Text>
                            <Text> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {clothesImg.store}/>
                            <Button
                                title = "return to store page"
                                onPress = {toggleItemPopup}
                            />
                            <Button
                                title = "Buy Item"
                                onPress = {() =>{
                                    console.log("user bought item: " + boughtItem.itemName);
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

    //tab for shoe accessory items
    const ShoeAccTab = () =>{
        return(
            <ScrollView>
                <View style = {styles.container}>
                    
                    {/* maps through the headimgs instead of printing them all out here */}
                    {images.lowerBodyImgs.map((img) =>(
                        <View key = {img.name}>
                            <Image source = {img.image} style = {clothesImg.store}/>
                            <Button
                                title = {img.name}
                                onPress = {()=>{
                                    handleBoughtItem(img.name, img.image);
                                    toggleItemPopup();
                                }}
                            /> 
                        </View>
                    ))}

                    <Modal isVisible = {isPopupVisible}>
                        <View style = {styles.container}>
                            <Text> This is the popup</Text>
                            <Text> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {clothesImg.store}/>
                            <Button
                                title = "return to store page"
                                onPress = {toggleItemPopup}
                            />
                            <Button
                                title = "Buy Item"
                                onPress = {() =>{
                                    console.log("user bought item: " + boughtItem.itemName);
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

    const addToCloset = async () =>{
        try{
            let currentUserEmail = await getCurrEmail();
            console.log("adding to closet: " + boughtItem.itemName);
            //creates a subcollection in User Information Document called Journal Entries
            await addDoc(collection(db, currentUserEmail, "User Information Document", "Moobie's Closet"),{
                itemName: boughtItem.itemName
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

