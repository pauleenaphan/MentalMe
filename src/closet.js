import React, {useState} from "react";
import { View, Text, Button, Image } from "react-native";
import { collection, addDoc, doc, getDocs, deleteDoc, getDoc} from "firebase/firestore"; 
import { db } from "../firebase";
import { useFocusEffect } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { getCurrEmail } from "./account.js";
import { styles, closetPageMoobie, clothesImg } from "./styles.js";
import { getMoobie } from "./moobie.js";
import { images } from "./images.js";



export const ClosetPage = () =>{
    const {bodyPart, handlePart} = getMoobie();
    const [closet, setCloset] = useState([]);


    useFocusEffect(
        React.useCallback(()=>{
            getCloset();
        }, [])
    );

    //gets the items that the user has bought
    const getCloset = async () => {
        try {
            const currentUserEmail = await getCurrEmail();
            //gets entries from subcollection called moobie's closet
            const closet = await getDocs(collection(db, currentUserEmail, "User Information Document", "Moobie's Closet"));
            const closetReceived = closet.docs.map(doc => ({
                itemName: doc.data().itemName,
            }));
            console.log("closet is done: ", closetReceived);
            setCloset(closetReceived);
        } catch (error) {
            console.log("error getting entries", error);
        }
    };

    //combines all img arrays so we can loop through everything at once
    const allImgs = [...images.headImgs, ...images.bodyImgs, ...images.lowerBodyImgs]

    return(
        <View style = {styles.container}>
            <Image source = {bodyPart.head} style = {closetPageMoobie.moobie_head}/>
            <Image source = {bodyPart.body} style = {closetPageMoobie.moobie_body}/>
            <Image source = {bodyPart.feet} style = {closetPageMoobie.moobie_feet}/>

            {closet.map(item =>(
                <View key = {item.itemName}>
                    {allImgs.map((img)=>{
                        if(img.name === item.itemName){
                            return <Image source = {img.image} style = {clothesImg.closet}/>
                        }
                    })}
                    <Button
                        //when the user wants to change moobie's clothes it will loop through the item arr
                        title = {item.itemName}
                        onPress = {() =>{
                            //We need this check to see if the item is a head ,body, or lower body clothing item
                            //so here we are first looping thru the head array
                            {images.headImgs.map((currItem)=>{
                                //if it is a head item then change the head to that item, else check if it's abody or lower body
                                if(currItem.name == item.itemName){
                                    handlePart("head", currItem.image);
                                    AsyncStorage.setItem("moobie_head", JSON.stringify(currItem.image))
                                    console.log("this is a head item: " + currItem.name);
                                }
                            })}
                        }}
                    />
                </View>
            ))}
        </View>
    );
};