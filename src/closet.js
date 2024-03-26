import React, {useState} from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { collection, setDoc, doc, getDocs, deleteDoc, getDoc, updateDoc} from "firebase/firestore"; 
import { db } from "../firebase";
import { useFocusEffect } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { getCurrEmail } from "./account.js";
import { styles, closetPage, closetContainer } from "./styles.js";
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

    //Gets the items that the user has bought
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

    //Updates the doc on what moobie is currently wearing
    const addToMoobie = async (itemType, currItemName) =>{
        try{
            let currentUserEmail = await getCurrEmail();
            await updateDoc(doc(db, currentUserEmail, "Moobie's Current Clothes"),{
                [itemType]: currItemName
            });
            console.log("Moobie is wearing this: " + currItemName);
        }catch(error){
            console.log("error " + error)
        }
    }

    //combines all img arrays so we can loop through everything at once
    const allImgs = [
        ...images.defaultImgs,
        ...images.headImgs,
        ...images.bodyImgs,
        ...images.lowerBodyImgs
    ];

    return(
        // <View style = {closetPage.pageContainer}>
        <View style = {{flex: 1}}>
            {/* Displays Moobie in the closet */}
            <View style = {{height: 500, backgroundColor: '#B6D3B3'}}>
                <Image source = {bodyPart.head} style = {closetPage.moobie_head}/>
                <Image source = {bodyPart.body} style = {closetPage.moobie_body}/>
                <Image source = {bodyPart.lowerBody} style = {closetPage.moobie_feet}/>
            </View>

            <View style = {{flex: 1}}>
                <ScrollView horizontal = {true} showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ width: `${200 * 7}px`, justifyContent: 'flex-end' }}
                >
                    {/* <View style = {closetPage.closetContainer}> */}
                    <View style = {{flexDirection: 'row', backgroundColor: '#81A282', alignItems: 'flex-end', }}>
                        {/* Maps through the closet in order to display all the clothes the user has bought */}
                        {closet.map(item =>(
                            // <View key = {item.itemName} style = {closetPage.clothesContainer}>
                            <View key = {item.itemName} style = {{backgroundColor: '#568258', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: 40, marginLeft: 5, marginRight: 5, marginBottom: 40, alignItems: 'center', justifyContent: 'center'}}>
                                {allImgs.map((img)=>{
                                    if(img.name === item.itemName){
                                        // return <Image source = {img.image} style = {closetPage.clothesImg}/>
                                        return <Image source = {img.image} style = {{width: 200, height: 200, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}/>
                                    }
                                })}
                                <Button
                                    color = "white"
                                    //FUTURE TO DO: CHANGE MAP TO SOME OR A DIFFERENT ITERATION TO 
                                    //when the user wants to change moobie's clothes it will loop through the item arr
                                    title = {item.itemName}
                                    onPress = {() =>{
                                        //We need this check to see if the item is a head, body, or lower body clothing item
                                        //so here we are first looping thru the head array
                                        {images.headImgs.map((currItem)=>{
                                            //if it is a head item then change the head to that item, else check if it's abody or lower body
                                            if(currItem.name == item.itemName){
                                                //set the current mooobie head in the homepaage and everywhere else
                                                handlePart("head", currItem.image);
                                                console.log("What is this showing" + currItem.image);
                                                //keep it in async so when the user leaves, the head will stay the same
                                                AsyncStorage.setItem("moobie_head", JSON.stringify(currItem.image));
                                                console.log("this is a head item: " + currItem.name);
                                                addToMoobie("head", currItem.name);
                                            }
                                        })}
                                        {images.bodyImgs.map((currItem)=>{
                                            if(currItem.name == item.itemName){
                                                //set the current mooobie head in the homepaage and everywhere else
                                                handlePart("body", currItem.image);
                                                //keep it in async so when the user leaves, the head will stay the same
                                                AsyncStorage.setItem("moobie_body", JSON.stringify(currItem.image));
                                                console.log("this is a body item: " + currItem.name);
                                                addToMoobie("body", currItem.name);
                                            }
                                        })}
                                        {images.lowerBodyImgs.map((currItem)=>{
                                            if(currItem.name == item.itemName){
                                                //set the current mooobie head in the homepaage and everywhere else
                                                handlePart("lowerBody", currItem.image);
                                                //keep it in async so when the user leaves, the head will stay the same
                                                AsyncStorage.setItem("moobie_lowerBody", JSON.stringify(currItem.image));
                                                console.log("this is a lower body item: " + currItem.name);
                                                addToMoobie("lowerBody", currItem.name);
                                            }
                                        })}
                                        {images.defaultImgs.map((currItem)=>{
                                            if(currItem.name === item.itemName && item.itemName === "Default Head"){
                                                handlePart("head", currItem.image);
                                                AsyncStorage.setItem("moobie_head", JSON.stringify(currItem.image));
                                                console.log("this is a head item: " + currItem.name);
                                                addToMoobie("head", currItem.name);
                                            }else if(currItem.name === item.itemName && item.itemName === "Default Body"){
                                                handlePart("body", currItem.image);
                                                AsyncStorage.setItem("moobie_body", JSON.stringify(currItem.image));
                                                console.log("this is a body item: " + currItem.name);
                                                addToMoobie("body", currItem.name);
                                            }else if(currItem.name === item.itemName && item.itemName === "Default Lower Body"){
                                                handlePart("lowerBody", currItem.image);
                                                AsyncStorage.setItem("moobie_lowerBody", JSON.stringify(currItem.image));
                                                console.log("this is a lower body item: " + currItem.name);
                                                addToMoobie("lowerBody", currItem.name);
                                            }
                                        })}

                                    }}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>

    );
};