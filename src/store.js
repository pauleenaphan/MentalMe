import React, { useEffect, useState} from "react";
import { View, Text, Button, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";
import { doc, setDoc, addDoc, collection, getDocs } from "@firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { db } from "../firebase/index.js";
import { getCurrEmail } from "./account.js";
import { storeItemOwnPopup, storePage, storePopup, storePurchasedPopup } from "./styles.js";
import { images } from "./images.js";
import { getCurrency } from "./currency.js";

const Tab = createBottomTabNavigator();

//Main home page 
export const StorePage = () =>{
    const [isPopupVisible, setPopup] = useState(false);
    const [boughtItemPopup, setBoughtItemPopup] = useState(false);
    const [itemOwnPopup, setItemOwnPopup] = useState(false);
    const [invalidPurchasePopup, setInvalidPurchasePopup] = useState(false);
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

    //toggles the popup after a user buys an item
    const toggleBoughtPopup = () =>{
        setBoughtItemPopup(!boughtItemPopup);

        //if the popup is visible, close it after 5 seconds
        if (!boughtItemPopup) {
            setTimeout(() => {
                setBoughtItemPopup(false); 
            }, 4000); 
        }
    }

    //toggles the popup that the user has an item already
    const toggleItemOwnPopup = () =>{
        setItemOwnPopup(!itemOwnPopup);

        if (!itemOwnPopup) {
            setTimeout(() => {
                setItemOwnPopup(false); 
            }, 4000); 
        }
    }

    //toggles the popup that the user does not have enough money
    const toggleInvalidPopup = () =>{
        setInvalidPurchasePopup(!invalidPurchasePopup);

        if (!invalidPurchasePopup) {
            setTimeout(() => {
                setInvalidPurchasePopup(false); 
            }, 4000); 
        }
    }

    //tab for head accessories
    const HeadAccTab = ({navigation}) =>{
        return(
            <View style = {storePage.pageContainer}>
                <Button
                    title = "add currency (testing)"
                    onPress = {() =>{
                        console.log(typeof currency);
                        updateCurrency(parseInt(currency) + 100);
                    }}
                />
                {/* amount of coins that the user owns */}
                <View style = {storePage.headingContainer}>
                    <View style = {storePage.headingContainer2}>
                        <View style = {storePage.currencyContainer}>
                            <Text style = {storePage.honeyCoinTitle}> Honey Coins: {currency} </Text>
                            <Image source = {require("../imgs/honeycoin.png")} style = {storePage.honeyCoinTitleImg}/>
                        </View>
                        <Text> Click on an item name to view and purchase the item! </Text>
                    </View>
                </View>
                
                <ScrollView showsVerticalScrollIndicator = {false} horizontal = {false}>
                    {/* maps through the headimgs instead of printing them all out here */}
                    <View style = {storePage.storeItemContainer}>
                        {images.headImgs.map((img) => (
                            <TouchableOpacity
                            
                                key={img.name}
                                onPress={() => {
                                    handleBoughtItem(img.name, img.image, img.price);
                                    toggleItemPopup();
                                }}
                                style = {storePage.itemDisplayContainer}
                            >
                                <View style={storePage.priceContainer}>
                                    <Text style={storePage.price}>{img.price}</Text>
                                    <Image source={require("../imgs/honeycoin.png")} style={storePage.priceCoin} />
                                </View>
                                <Image source={img.image} style = {storePage.itemImgHead} />
                                
                                <View style={storePage.titleOfItem}>
                                    <Text style={storePage.itemTitle}>{img.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Popup for the item the user plans to buy */}
                    <Modal 
                        isVisible = {isPopupVisible}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {() => toggleItemPopup()}

                    >
                        <View style = {storePopup.popupContainer}>
                            <View style = {storePopup.priceContainer}>
                                <Text style = {storePopup.priceTitle}> Price: {boughtItem.price} </Text>
                                <Image source = {require("../imgs/honeycoin.png")} style = {storePopup.honeyCoinImg}/>
                            </View>
                            <Text style = {storePopup.itemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storePopup.headItemImg}/>
                            <View style = {storePopup.buyBtn}>
                                <Button
                                    color = 'white'
                                    title = "Buy Item"
                                    onPress = {async () =>{
                                        //first checks to see if the user owns the item already
                                        //if user does not own the item then check if the user has enought to buy the item
                                        try{
                                            console.log("user wants this item: " + boughtItem.itemName);
                                            const itemFound = await checkForItem();
                                            if(itemFound){
                                                console.log("user has this item already: ", boughtItem.itemName);
                                                toggleItemPopup();
                                                setTimeout(()=>{
                                                    toggleItemOwnPopup();
                                                }, 1);

                                            }else{
                                                if(canBuy() == false){
                                                    toggleItemPopup();
                                                    setTimeout(() => {
                                                        toggleInvalidPopup();
                                                    }, 1); 
                                                }else{
                                                    addToCloset();
                                                    toggleItemPopup();
                                                    //this popup will be executued after the item popup is toggled off 
                                                    setTimeout(() => {
                                                        toggleBoughtPopup();
                                                    }, 1); 
                                                } 
                                            }
                                        }catch(error){
                                            console.log("error: ", error);
                                        } 
                                    }}
                                />
                            </View>
                            <Button
                                color = 'black'
                                title = "Return to store page"
                                onPress = {toggleItemPopup}
                                
                            />
                        </View>
                    </Modal>
                    {/* Popup after a user buys an item */}
                    <Modal
                        isVisible = {boughtItemPopup}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {() => toggleBoughtPopup()}
                        style = {storePurchasedPopup.modal}
                        backdropOpacity = {0}
                    >
                        <View style = {storePurchasedPopup.container}>
                            <Text style = {storePurchasedPopup.title}> Purchased </Text>
                            <Text> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storePurchasedPopup.itemImg}/>
                        </View>
                    </Modal>

                    {/* Popup when a user tries to buy an item they own already */}
                    <Modal
                        isVisible = {itemOwnPopup}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {()=> toggleItemOwnPopup()}
                        style = {storePurchasedPopup.modal}
                        backdropOpacity = {0}
                    >
                        <View style = {storeItemOwnPopup.container}>
                            <Text style = {storeItemOwnPopup.title}> Purchase Failed </Text>
                            <Text> You already own this item </Text>
                            <Text style = {storeItemOwnPopup.itemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storeItemOwnPopup.itemImg}/>
                        </View>
                    </Modal>

                    {/* Popup for when a user does not have enough honey coins */}
                    <Modal
                        isVisible = {invalidPurchasePopup}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {()=> toggleInvalidPopup()}
                        style = {storePurchasedPopup.modal}
                        backdropOpacity = {0}
                    >
                        <View style = {storeItemOwnPopup.container}>
                            <Text style = {storeItemOwnPopup.title}> Purchase Failed </Text>
                            <Text> You do not have enough honey coins to buy this item </Text>
                            <Text style = {storeItemOwnPopup.itemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storeItemOwnPopup.itemImg}/>
                        </View>

                    </Modal>
                </ScrollView>
            </View>
        )
    }
    
    //tab for body accessory items
    const BodyAccTab = ({navigation}) =>{
        return(
            <View style = {storePage.pageContainer}>
                {/* amount of coins that the user owns */}
                <View style = {storePage.headingContainer}>
                    <View style = {storePage.headingContainer2}>
                        <View style = {storePage.currencyContainer}>
                            <Text style = {storePage.honeyCoinTitle}> Honey Coins: {currency} </Text>
                            <Image source = {require("../imgs/honeycoin.png")} style = {storePage.honeyCoinTitleImg}/>
                        </View>
                        <Text> Click on an item name to view and purchase the item! </Text>
                    </View>
                </View>
                
                <ScrollView showsVerticalScrollIndicator = {false} horizontal = {false}>
                    {/* maps through the headimgs instead of printing them all out here */}
                    <View style = {storePage.storeItemContainer}>
                        {images.bodyImgs.map((img) => (
                            <TouchableOpacity
                            
                                key={img.name}
                                onPress={() => {
                                    handleBoughtItem(img.name, img.image, img.price);
                                    toggleItemPopup();
                                }}
                                style = {storePage.itemDisplayContainer}
                            >
                                <View style={storePage.priceContainer}>
                                    <Text style={storePage.price}>{img.price}</Text>
                                    <Image source={require("../imgs/honeycoin.png")} style={storePage.priceCoin} />
                                </View>
                                <Image source={img.image} style = {storePage.itemImgBody} />
                                
                                <View style={storePage.titleOfItem}>
                                    <Text style={storePage.itemTitle}>{img.name}</Text>
                                </View>
                            
                            </TouchableOpacity>
                        ))}
                    </View>


                    <Modal 
                        isVisible = {isPopupVisible}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {() => toggleItemPopup()}
                    >
                        <View style = {storePopup.popupContainer}>
                            <View style = {storePopup.priceContainer}>
                                <Text style = {storePopup.priceTitle}> Price: {boughtItem.price} </Text>
                                <Image source = {require("../imgs/honeycoin.png")} style = {storePopup.honeyCoinImg}/>
                            </View>
                            <Text style = {storePopup.itemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storePopup.bodyItemImg}/>
                            <View style = {storePopup.buyBtn}>
                                <Button
                                    color = 'white'
                                    title = "Buy Item"
                                    onPress = {async () =>{
                                        //first checks to see if the user owns the item already
                                        //if user does not own the item then check if the user has enought to buy the item
                                        try{
                                            console.log("user wants this item: " + boughtItem.itemName);
                                            const itemFound = await checkForItem();
                                            if(itemFound){
                                                toggleItemPopup();
                                                setTimeout(()=>{
                                                    toggleItemOwnPopup();
                                                }, 1);
                                            }else{
                                                if(canBuy() == false){
                                                    toggleItemPopup();
                                                    setTimeout(() => {
                                                        toggleInvalidPopup();
                                                    }, 1); 
                                                }else{
                                                    toggleItemPopup();
                                                    setTimeout(() => {
                                                        toggleBoughtPopup();
                                                    }, 1); 
                                                }
                                            }
                                        }catch(error){
                                            console.log("error: ", error);
                                        }

                                        
                                    }}
                                />
                            </View>
                            <Button
                                color = 'black'
                                title = "Return to store page"
                                onPress = {toggleItemPopup}
                            />
                        </View>
                    </Modal>
                    <Modal
                        isVisible = {boughtItemPopup}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {() => toggleBoughtPopup()}
                        style = {storePurchasedPopup.modal}
                        backdropOpacity = {0}
                    >
                        <View style = {storePurchasedPopup.container}>
                            <Text style = {storePurchasedPopup.title}> Purchased </Text>
                            <Text style = {storePurchasedPopup.bodyItemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storePurchasedPopup.itemImg}/>
                        </View>
                    </Modal>
                    <Modal
                        isVisible = {itemOwnPopup}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {()=> toggleItemOwnPopup()}
                        style = {storePurchasedPopup.modal}
                        backdropOpacity = {0}
                    >
                        <View style = {storeItemOwnPopup.container}>
                            <Text style = {storeItemOwnPopup.title}> Purchase Failed </Text>
                            <Text> You already own this item </Text>
                            <Text style = {storeItemOwnPopup.bodyItemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storeItemOwnPopup.itemImg}/>
                        </View>
                    </Modal>
                    <Modal
                        isVisible = {invalidPurchasePopup}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {()=> toggleInvalidPopup()}
                        style = {storePurchasedPopup.modal}
                        backdropOpacity = {0}
                    >
                        <View style = {storeItemOwnPopup.container}>
                            <Text style = {storeItemOwnPopup.title}> Purchase Failed </Text>
                            <Text> You do not have enough honey coins to buy this item </Text>
                            <Text style = {storeItemOwnPopup.bodyItemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storeItemOwnPopup.itemImg}/>
                        </View>

                    </Modal>
                </ScrollView>
            </View>
        )
    }

    //tab for shoe accessory items
    const ShoeAccTab = ({navigation}) =>{
        return(
            <View style = {storePage.pageContainer}>
                {/* amount of coins that the user owns */}
                <View style = {storePage.headingContainer}>
                    <View style = {storePage.headingContainer2}>
                        <View style = {storePage.currencyContainer}>
                            <Text style = {storePage.honeyCoinTitle}> Honey Coins: {currency} </Text>
                            <Image source = {require("../imgs/honeycoin.png")} style = {storePage.honeyCoinTitleImg}/>
                        </View>
                        <Text> Click on an item name to view and purchase the item! </Text>
                    </View>
                </View>
                
                <ScrollView showsVerticalScrollIndicator = {false} horizontal = {false}>
                    {/* maps through the headimgs instead of printing them all out here */}
                    <View style = {storePage.storeItemContainer}>
                        {images.lowerBodyImgs.map((img) => (
                            <TouchableOpacity
                            
                                key={img.name}
                                onPress={() => {
                                    handleBoughtItem(img.name, img.image, img.price);
                                    toggleItemPopup();
                                }}
                                style = {storePage.itemDisplayContainer}
                            >
                                <View style={storePage.priceContainer}>
                                    <Text style={storePage.price}>{img.price}</Text>
                                    <Image source={require("../imgs/honeycoin.png")} style={storePage.priceCoin} />
                                </View>
                                <Image source={img.image} style = {storePage.itemImgLowerFeet} />
                                
                                <View style={storePage.titleOfItem}>
                                    <Text style={storePage.itemTitle}>{img.name}</Text>
                                </View>
                            
                            </TouchableOpacity>
                        ))}
                    </View>


                    <Modal 
                        isVisible = {isPopupVisible}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {() => toggleItemPopup()}
                    >
                        <View style = {storePopup.popupContainer}>
                            <View style = {storePopup.priceContainer}>
                                <Text style = {storePopup.priceTitle}> Price: {boughtItem.price} </Text>
                                <Image source = {require("../imgs/honeycoin.png")} style = {storePopup.honeyCoinImg}/>
                            </View>
                            <Text style = {storePopup.itemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storePopup.lowerBodyItemImg}/>
                            <View style = {storePopup.buyBtn}>
                                <Button
                                    color = 'white'
                                    title = "Buy Item"
                                    onPress = {async () =>{
                                        //first checks to see if the user owns the item already
                                        //if user does not own the item then check if the user has enought to buy the item
                                        try{
                                            console.log("user wants this item: " + boughtItem.itemName);
                                            const itemFound = await checkForItem();
                                            if(itemFound){
                                                toggleItemPopup();
                                                setTimeout(()=>{
                                                    toggleItemOwnPopup();
                                                }, 1);
                                            }else{
                                                if(canBuy() == false){
                                                    toggleItemPopup();
                                                    setTimeout(() => {
                                                        toggleInvalidPopup();
                                                    }, 1); 
                                                }else{
                                                    toggleItemPopup();
                                                    setTimeout(() => {
                                                        toggleBoughtPopup();
                                                    }, 1); 
                                                }
                                            }
                                        }catch(error){
                                            console.log("error: ", error);
                                        }    
                                    }}
                                />
                            </View>
                            <Button
                                color = 'black'
                                title = "Return to store page"
                                onPress = {toggleItemPopup}
                            />
                        </View>
                    </Modal>
                    <Modal
                        isVisible = {boughtItemPopup}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {() => toggleBoughtPopup()}
                        style = {storePurchasedPopup.modal}
                        backdropOpacity = {0}
                    >
                        <View style = {storePurchasedPopup.container}>
                            <Text style = {storePurchasedPopup.title}> Purchased </Text>
                            <Text style = {storePurchasedPopup.lowerItemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storePurchasedPopup.itemImg}/>
                        </View>
                    </Modal>
                    <Modal
                        isVisible = {itemOwnPopup}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {()=> toggleItemOwnPopup()}
                        style = {storePurchasedPopup.modal}
                        backdropOpacity = {0}
                    >
                        <View style = {storeItemOwnPopup.container}>
                            <Text style = {storeItemOwnPopup.title}> Purchase Failed </Text>
                            <Text> You already own this item </Text>
                            <Text style = {storeItemOwnPopup.lowerBodyItemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storeItemOwnPopup.itemImg}/>
                        </View>
                    </Modal>
                    <Modal
                        isVisible = {invalidPurchasePopup}
                        animationIn = {'zoomIn'}
                        animationOut = {'zoomOut'}
                        onBackdropPress = {()=> toggleInvalidPopup()}
                        style = {storePurchasedPopup.modal}
                        backdropOpacity = {0}
                    >
                        <View style = {storeItemOwnPopup.container}>
                            <Text style = {storeItemOwnPopup.title}> Purchase Failed </Text>
                            <Text> You do not have enough honey coins to buy this item </Text>
                            <Text style = {storeItemOwnPopup.lowerBodyItemName}> {boughtItem.itemName} </Text>
                            <Image source = {boughtItem.image} style = {storeItemOwnPopup.itemImg}/>
                        </View>

                    </Modal>
                </ScrollView>
            </View>
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
            return true;
        }else{
            console.log("user does not have enough to buy this item");
            return false;
        }
    }

    return(
        <Tab.Navigator>
            <Tab.Screen 
                name = "Head Acessories"
                component = {HeadAccTab}
                options = {{
                    headerStyle:{
                        backgroundColor: '#B6D3B3',
                    },
                    headerShadowVisible: false,
                    headerTitleContainerStyle:{
                        marginTop: -30
                    },
                    headerTitleStyle:{
                        fontSize: 15,
                    },
                    tabBarLabel: ' ',
                    tabBarStyle:{
                        backgroundColor: '#568258',
                    },
                    tabBarIcon: () => ( // Pass color and size as props
                        <FontAwesome5 name = "redhat" size = {40} color = "black" style = {{marginBottom: -25}}/> // Set size and color
                    ),
                }}
            />
            <Tab.Screen 
                component = {BodyAccTab}
                name = "Body Accessories"
                options = {{
                    headerStyle:{
                        backgroundColor: '#B6D3B3',
                    },
                    headerShadowVisible: false,
                    headerTitleContainerStyle:{
                        marginTop: -30
                    },
                    headerTitleStyle:{
                        fontSize: 15,
                    },
                    tabBarLabel: ' ',
                    tabBarStyle:{
                        backgroundColor: '#568258',
                    },
                    tabBarIcon: () => ( // Pass color and size as props
                        <Ionicons name = "shirt" size = {35} color = "black" style = {{marginBottom: -25}}/>
                    ),
                }}
            />
            <Tab.Screen 
                name = "Shoe/Leg Accessories" 
                component = {ShoeAccTab}
                options = {{
                    headerStyle:{
                        backgroundColor: '#B6D3B3',
                    },
                    headerShadowVisible: false,
                    headerTitleContainerStyle:{
                        marginTop: -30
                    },
                    headerTitleStyle:{
                        fontSize: 15,
                    },
                    tabBarLabel: ' ',
                    tabBarStyle:{
                        backgroundColor: '#568258',
                    },
                    tabBarIcon: () => ( // Pass color and size as props
                        <MaterialCommunityIcons name = "shoe-sneaker" size = {55} color = "black"  style = {{marginBottom: -25}}/>
                    ),
                }}
            /> 
        </Tab.Navigator>
    );
};