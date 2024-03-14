import React, {useState} from "react";
import { View, Text, Button, Image } from "react-native";
import { collection, addDoc, doc, getDocs, deleteDoc, getDoc } from "firebase/firestore"; 

import { styles, closetPageMoobie, clothesImg } from "./styles.js";
import { getMoobie } from "./moobie.js";


export const ClosetPage = ({navigation}) =>{
    const {bodyPart, handlePart} = getMoobie();
    const [closet, setCloset] = useState([]);

    //gets the items that the user has bought
    const getCloset = async () => {
        try {
            const currentUserEmail = await getCurrEmail();
            //gets entries from subcollection called moobie's closet
            const closet = await getDocs(collection(db, currentUserEmail, "User Information Document", "Moobie's Closet"));
            const closetReceived = closet.docs.map(doc => ({
                itemName: doc.itemName,
                itemImgSrc: doc.itemImgSrc
            }));
            setCloset(closetReceived);
        } catch (error) {
            console.log("error getting entries", error);
        }
    };



    return(
        <View style = {styles.container}>
            {/* <Image source = {bodyPart.head} style = {closetPageMoobie.moobie_head}/>
            <Image source = {bodyPart.body} style = {closetPageMoobie.moobie_body}/>
            <Image source = {bodyPart.feet} style = {closetPageMoobie.moobie_feet}/> */}

            {closet.map(item =>(
                <View key = {item.itemName}>
                    <Image source = {item.itemImgSrc} style = {clothesImg.closet}/>
                    <Button
                        title = {item.itemName}
                    />
                </View>
            ))}
        </View>
    );
};