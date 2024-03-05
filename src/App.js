import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; //global storage in react, data will stay even when the app is closed

import { CreateAccPage, LoginPage } from './account.js';
import { LoadingPage } from './loading.js';
import { CoverPage } from './cover.js';
import { AddJournalEntryPage, JournalHomePage, ViewJournalEntry } from './journal.js';
import { HomePage } from './homepage.js';
import { ProgressTracker } from "./progress.js";
import { UserInfoProvider} from './userInfo.js';


const Stack = createNativeStackNavigator();

export default function App() {
  //initial value is false
  const [isLogged, setLogged] = useState(false);

  const getUserStatus = async () =>{
    try{
      const status = await AsyncStorage.getItem("UserIsLoggedIn");
      console.log("status " + status);
      setLogged(status);
    }catch(error){
      console.log("error " + error);
    }
  }

  //everytime the app opens and renders we check is the user is logged in
  useEffect(()=>{
    getUserStatus();
  })

  return (
    <UserInfoProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Cover Page">
            {/* don't need component since we are passing down a child prop instead */}
            {props => <CoverPage {...props} isLogged={isLogged} />}
          </Stack.Screen>
          <Stack.Screen 
            name = "Login Page" 
            component = {LoginPage} 
            //animation removes the screen to slide from left to right
            //gesture disables the user to allow from moving to the previous screen on swipe
            options = {{headerBackVisible: false, animation: 'none', gestureEnabled: false }}>
          </Stack.Screen>
          <Stack.Screen 
            name = "Create Account Page" 
            component = {CreateAccPage} 
            options = {{headerBackVisible: false, animation: 'none', gestureEnabled: false}}>
          </Stack.Screen>
          <Stack.Screen 
            name = "Loading Page" 
            component = {LoadingPage}
            options = {{headerBackVisible: true, animation: 'none', gestureEnabled: false}}>
          </Stack.Screen>
          <Stack.Screen name = "Journal Home Page" component = {JournalHomePage}></Stack.Screen>
          <Stack.Screen name = "Journal New Entry Page" component = {AddJournalEntryPage}></Stack.Screen>
          <Stack.Screen name = "Journal Entry Page" component = {ViewJournalEntry}></Stack.Screen>
          <Stack.Screen name = "Home Page" component = {HomePage}></Stack.Screen>
          <Stack.Screen name = "Progress Tracking" component = {ProgressTracker}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </UserInfoProvider>
  );
}

