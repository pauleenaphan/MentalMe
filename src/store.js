import React, { useEffect, useState} from "react";
import { View, Text, Button, Image, ScrollView, AlertIOS, Alert } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";
import { doc, setDoc, addDoc, collection, getDocs } from "@firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { db } from "../firebase/index.js";
import { getCurrEmail } from "./account.js";
import { clothesImg, honeyCoin, styles } from "./styles.js";
import { images } from "./images.js";
import { getCurrency } from "./currency.js";

const Tab = createBottomTabNavigator();

//Main home page 
export const StorePage = () =>{
    const [isPopupVisible, setPopup] = useState(false);
    const [boughtItem, setBoughtItem] = useState({
        itemName: '',
        image: '',
        price: '',
    })
    const [closet, setCloset] = useState([]);
    const {currency, updateCurrency} = getCurrency();

    useFocusEffect(
        React.useCallback(()=>{
            printValueInAsync();
        }, [])
    )

    const printValueInAsync = async () =>{
        try{
            const curr = await AsyncStorage.getItem("userCurrency");
            console.log("this is the currency value in async: ", curr);
            const val = parseInt(JSON.parse(curr), 10); // Parse the JSON string before parsing it into an integer
            console.log("this is val: ", val);
            updateCurrency(val);
        }catch(error){
            console.log("error: ", error)
        }
    }


    const handleBoughtItem = (itemName, itemImg, itemPrice)=>{
        setBoughtItem({
            itemName: itemName,
            image: itemImg,
            price: itemPrice
        })
    }

    //toggles the itempopup that the user wants to buy
    const toggleItemPopup = () =>{
        setPopup(!isPopupVisible);
    }

    //shows the alert when the user is trying to buy an item they own already
    const showItemOwnAlert = () =>{
        Alert.alert(
            //title of alert, then caption
            "You already own this item: ", boughtItem.itemName,
            [
                {text: "Back to Store Page", onPress: () => (console.log("user popup: item owned"))}
            ]
        )
    }

    //show the alert when the user does not have enough coins to buy an item
    const showInsufficientFundsAlert = () =>{
        Alert.alert(
            "You do not have enough honey coins for: ", boughtItem.itemName,
            [
                {text: "Back to Store Page", onPress: () => {console.log("user popup: not enough funds")}}
            ]
        )
    }
    
    //tab for head accessories
    const HeadAccTab = () =>{
        return(
            <ScrollView>
                <View style = {styles.container}>
                    <Button
                        title = "add currency (testing)"
                        onPress = {() =>{
                            console.log(typeof currency);
                            updateCurrency(parseInt(currency) + 1);
                        }}
                    />
                    {/* amount of coins that the user owns */}
                    <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 20}}> Honey Coins: {currency} </Text>
                        <Image source = {require("../imgs/honeycoin.png")} style = {honeyCoin.storePage}/>
                    </View>
                    
                    {/* maps through the headimgs instead of printing them all out here */}
                    {images.headImgs.map((img) =>(
                        <View key = {img.name}>
                            <Image source = {img.image} style = {clothesImg.store}/>
                            <Button
                                title = {img.name}
                                onPress = {()=>{
                                    handleBoughtItem(img.name, img.image, img.price);
                                    toggleItemPopup();
                                }}
                            /> 
                            {/* Shows the price of the item */}
                            <Text> {img.price} </Text>
                        </View>
                    ))}

                    <Modal isVisible = {isPopupVisible}>
                        <View style = {styles.container}>
                            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style = {{fontSize: 20}}> Price: {boughtItem.price} </Text>
                                <Image source = {require("../imgs/honeycoin.png")} style = {honeyCoin.storePage}/>
                            </View>
                            <Text> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {clothesImg.store}/>
                            <Button
                                title = "return to store page"
                                onPress = {toggleItemPopup}
                            />
                            <Button
                                title = "Buy Item"
                                onPress = {async () =>{
                                    //first checks to see if the user owns the item already
                                    //if user does not own the item then check if the user has enought to buy the item
                                    try{
                                        console.log("user wants this item: " + boughtItem.itemName);
                                        const itemFound = await checkForItem();
                                        if(itemFound){
                                            showItemOwnAlert();
                                            console.log("user has this item already: ", boughtItem.itemName);
                                        }else{
                                            canBuy();
                                            addToCloset();
                                        }
                                    }catch(error){
                                        console.log("error: ", error);
                                    }

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
                    <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 20}}> Honey Coins: {currency} </Text>
                        <Image source = {require("../imgs/honeycoin.png")} style = {honeyCoin.storePage}/>
                    </View>
                    {/* maps through the headimgs instead of printing them all out here */}
                    {images.bodyImgs.map((img) =>(
                        <View key = {img.name}>
                            <Image source = {img.image} style = {clothesImg.store}/>
                            <Button
                                title = {img.name}
                                onPress = {()=>{
                                    handleBoughtItem(img.name, img.image, img.price);
                                    toggleItemPopup();
                                }}
                            /> 
                        </View>
                    ))}

                    <Modal isVisible = {isPopupVisible}>
                        <View style = {styles.container}>
                            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style = {{fontSize: 20}}> Price: {boughtItem.price} </Text>
                                <Image source = {require("../imgs/honeycoin.png")} style = {honeyCoin.storePage}/>
                            </View>
                            <Text> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {clothesImg.store}/>
                            <Button
                                title = "return to store page"
                                onPress = {toggleItemPopup}
                            />
                            <Button
                                title = "Buy Item"
                                onPress = {async () =>{
                                    try{
                                        console.log("user wants this item: " + boughtItem.itemName);
                                        const itemFound = await checkForItem();
                                        if(itemFound){
                                            showItemOwnAlert();
                                            console.log("user has this item already: ", boughtItem.itemName);
                                        }else{
                                            canBuy();
                                            addToCloset();
                                        }
                                    }catch(error){
                                        console.log("error: ", error);
                                    }

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
                    <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 20}}> Honey Coins: {currency} </Text>
                        <Image source = {require("../imgs/honeycoin.png")} style = {honeyCoin.storePage}/>
                    </View>
                    {/* maps through the headimgs instead of printing them all out here */}
                    {images.lowerBodyImgs.map((img) =>(
                        <View key = {img.name}>
                            <Image source = {img.image} style = {clothesImg.store}/>
                            <Button
                                title = {img.name}
                                onPress = {()=>{
                                    handleBoughtItem(img.name, img.image, img.price);
                                    toggleItemPopup();
                                }}
                            /> 
                        </View>
                    ))}

                    <Modal isVisible = {isPopupVisible}>
                        <View style = {styles.container}>
                            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style = {{fontSize: 20}}> Price: {boughtItem.price} </Text>
                                <Image source = {require("../imgs/honeycoin.png")} style = {honeyCoin.storePage}/>
                            </View>
                            <Text> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {clothesImg.store}/>
                            <Button
                                title = "return to store page"
                                onPress = {toggleItemPopup}
                            />
                            <Button
                                title = "Buy Item"
                                onPress = {async () =>{
                                    try{
                                        console.log("user wants this item: " + boughtItem.itemName);
                                        const itemFound = await checkForItem();
                                        if(itemFound){
                                            showItemOwnAlert();
                                            console.log("user has this item already: ", boughtItem.itemName);
                                        }else{
                                            canBuy();
                                            addToCloset();
                                            
                                        }
                                    }catch(error){
                                        console.log("error: ", error);
                                    }

                                    toggleItemPopup();
                                }}
                            />
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        )
    }

    //adds new item to the user's closet
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

    //checks to see if the user owns the item
    const checkForItem = async () =>{
        try {
            console.log("CHECK ITEM FUNCTION IS RUNNING")
            const currentUserEmail = await getCurrEmail();
            //Gets entries from subcollection called moobie's closet
            const closet = await getDocs(collection(db, currentUserEmail, "User Information Document", "Moobie's Closet"));
            const closetReceived = closet.docs.map(doc => ({
                itemName: doc.data().itemName,
            }));
            console.log("this is the user's closet: ", closetReceived);
            setCloset(closetReceived);
    
            //Use the return value of some to determine if the item is found
            const itemFound = closetReceived.some(item => {
                if (item.itemName === boughtItem.itemName) {
                    console.log("user already owns this item: " + item.itemName);
                    return true;
                }
                return false;
            });
    
            //If the item is found return true, else false
            if (itemFound) {
                console.log("User owns this item: ", boughtItem.itemName);
                return true;
            } else {
                console.log("User does not own this item: ", boughtItem.itemName);
                return false;
            }
        } catch (error) {
            console.log("error getting entries", error);
        }
    }

    //checks if the user has enough currency to buy a certain item
    const canBuy = () =>{
        //get the user's currency
        console.log("this is the user's currency: ", currency);

        //if the user's currency > item price, then allow the user to buy
        if(currency >= boughtItem.price){
            console.log("user has enough to buy this item: ", boughtItem.itemName);
            updateCurrency(currency - boughtItem.price);
        }else{
            console.log("user does not have enough to buy this item");
            showInsufficientFundsAlert();
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

