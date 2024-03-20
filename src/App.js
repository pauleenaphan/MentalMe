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
import { AccountSettingsPage, SettingsPage, AccountChangePassword } from './settings.js';
import { StorePage, ViewItemPage } from './store.js';
import { MoobieProvider } from './moobie.js';
import { UserCurrencyProvider } from './currency.js';
import { ClosetPage } from './closet.js';


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
      <UserCurrencyProvider>
        <MoobieProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                name = "Cover Page"
                options = {{
                  headerShown: false,
                }}>
                {/* don't need component since we are passing down a child prop instead */}
                {props => <CoverPage {...props} isLogged={isLogged} />}
              </Stack.Screen>
              <Stack.Screen 
                name = "Login Page" 
                component = {LoginPage} 
                //animation removes the screen to slide from left to right
                //gesture disables the user to allow from moving to the previous screen on swipe
                options = {{
                  headerBackVisible: false, 
                  animation: 'none', 
                  gestureEnabled: false,
                  headerShown: false 
                }}>
              </Stack.Screen>
              <Stack.Screen 
                name = "Create Account Page" 
                component = {CreateAccPage} 
                options = {{
                  headerBackVisible: false, 
                  animation: 'none',
                  gestureEnabled: false,
                  headerShown: false 
                }}>
              </Stack.Screen>
              <Stack.Screen 
                name = "Loading Page" 
                component = {LoadingPage}
                options = {{
                  headerBackVisible: true, 
                  animation: 'none', 
                  gestureEnabled: false,
                  headerShown: false 
                }}>
              </Stack.Screen>
              <Stack.Screen 
                name = "Home Page" 
                component = {HomePage}
                options = {{
                  headerBackVisible: false, 
                  animation: 'none', 
                  gestureEnabled: false, 
                  headerShown: false 
                }}>
              </Stack.Screen>

              <Stack.Screen name = "Settings Page" component = {SettingsPage}></Stack.Screen>
              <Stack.Screen name = "Account Settings Page" component = {AccountSettingsPage}></Stack.Screen>
              <Stack.Screen name = "Change Password Page" component = {AccountChangePassword}></Stack.Screen>

              <Stack.Screen name = "Journal Home Page" component = {JournalHomePage}></Stack.Screen>
              <Stack.Screen name = "Journal New Entry Page" component = {AddJournalEntryPage}></Stack.Screen>
              <Stack.Screen name = "Journal Entry Page" component = {ViewJournalEntry}></Stack.Screen>
              
              <Stack.Screen name = "Progress Tracking" component = {ProgressTracker}></Stack.Screen>

              <Stack.Screen name = "Store Page" component = {StorePage}></Stack.Screen>
              <Stack.Screen name = "Closet Page" component = {ClosetPage}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </MoobieProvider>
      </UserCurrencyProvider>
    </UserInfoProvider>
  );
}

