import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; //global storage in react, data will stay even when the app is closed

import { CreateAccPage, LoginPage } from './src/account.js';
import { LoadingPage } from './src/loading.js';
import { CoverPage } from './src/cover.js';
import { AddJournalEntryPage, JournalHomePage, ViewJournalEntry } from './src/journal.js';
import { HomePage } from './src/homepage.js';
import { ProgressTracker } from "./src/progress.js";
import { UserInfoProvider} from './src/userInfo.js';
import { AccountSettingsPage, SettingsPage, AccountChangePassword } from './src/settings.js';
import { StorePage, ViewItemPage } from './src/store.js';
import { MoobieProvider } from './src/moobie.js';
import { UserCurrencyProvider } from './src/currency.js';
import { ClosetPage } from './src/closet.js';
import { DailyLoginsProvider } from './src/progress_files/dailyLoginsContext.js';
import { ConsecutiveLoginsProvider } from './src/progress_files/consecutiveLoginsContext.js';
import { LongestStreakProvider } from './src/progress_files/longestStreakContext.js';
import { SundayLoginProvider, MondayLoginProvider, TuesdayLoginProvider, 
         WednesdayLoginProvider, ThursdayLoginProvider, 
         FridayLoginProvider, SaturdayLoginProvider } from './src/progress_files/weeklyLoginContext.js';
import { ChatPage } from './src/chat.js';
import { IconButton } from './src/homepage.js';
import { Ionicons } from "@expo/vector-icons";
import { TaskContextProvider } from './src/task.js';
import { ShowDailyNotificationProvider } from './src/progress_files/showDailyNotificationContext.js';
import { ShowJournalNotificationProvider } from './src/progress_files/showJournalNotificationContext.js';
import { ShowWeeklyNotificationProvider } from './src/progress_files/showWeeklyNotificationContext.js';


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
      <TaskContextProvider>
      <ShowDailyNotificationProvider>
      <ShowJournalNotificationProvider>
      <ShowWeeklyNotificationProvider>
      <DailyLoginsProvider>
        <ConsecutiveLoginsProvider>
          <LongestStreakProvider>
          <SundayLoginProvider>
          <MondayLoginProvider>
          <TuesdayLoginProvider>
          <WednesdayLoginProvider>
          <ThursdayLoginProvider>
          <FridayLoginProvider>
          <SaturdayLoginProvider>
              <UserCurrencyProvider>
                <MoobieProvider>
                  <NavigationContainer>
                    <Stack.Navigator>
                      <Stack.Screen 
                        name = "Cover Page"
                        options = {{
                          headerShown: false,
                          animation: 'fade'
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
                      <Stack.Screen
                        name="Chat Page"
                        component={ChatPage}
                        options={({navigation}) => ({
                          animation: 'fade',
                          gestureEnabled: false,
                          headerTitle: "Chat with Moobie",
                          headerStyle: {
                            backgroundColor: "#B6D3B3",
                          },
                          headerShadowVisible: false,
                          headerTintColor: "black",
                          headerLeft: () => (
                            <IconButton
                              onPress={() => navigation.navigate("Home Page")}
                              iconName="arrow-back"
                              iconComponent={Ionicons}
                              size={30}
                              color="black"
                            />
                          ),
                        })}
                      />
                      <Stack.Screen name = "Settings Page" 
                        component = {SettingsPage}
                        options={({navigation}) => ({
                          gestureEnabled: false,
                          headerTitle: " ",
                          headerStyle: {
                            backgroundColor: "#B6D3B3",
                          },
                          headerShadowVisible: false,
                          headerLeft: () => (
                            <IconButton
                              onPress={() => navigation.navigate("Home Page")}
                              iconName="arrow-back"
                              iconComponent={Ionicons}
                              size={30}
                              color="black"
                            />
                          ),
                        })}>
                      </Stack.Screen>
                      <Stack.Screen 
                        name = "Account Settings Page" 
                        component = {AccountSettingsPage}
                        options={({navigation}) => ({
                          gestureEnabled: false,
                          headerTitle: " ",
                          headerStyle: {
                            backgroundColor: "#B6D3B3",
                          },
                          headerShadowVisible: false,
                          headerLeft: () => (
                            <IconButton
                              onPress={() => navigation.navigate("Settings Page")}
                              iconName="arrow-back"
                              iconComponent={Ionicons}
                              size={30}
                              color="black"
                            />
                          ),
                        })}>
                      </Stack.Screen>
                      <Stack.Screen 
                        name = "Change Password Page" 
                          component = {AccountChangePassword}
                          options={({navigation}) => ({
                            gestureEnabled: false,
                            headerTitle: " ",
                            headerStyle: {
                              backgroundColor: "#B6D3B3",
                            },
                            headerShadowVisible: false,
                            headerLeft: () => (
                              <IconButton
                                onPress={() => navigation.navigate("Account Settings Page")}
                                iconName="arrow-back"
                                iconComponent={Ionicons}
                                size={30}
                                color="black"
                              />
                            ),
                          })}>
                        </Stack.Screen>

                      <Stack.Screen 
                        name = "Journal Home Page" 
                        component = {JournalHomePage}
                        options={({navigation}) =>({
                          animation: 'slide_from_bottom',
                          gestureEnabled: false,
                          headerTitle: "",
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: "#B6D3B3",
                          },
                          
                          headerLeft: () => (
                            <IconButton
                              onPress={() => navigation.navigate("Home Page")}
                              iconName="arrow-back"
                              iconComponent={Ionicons}
                              size={30}
                              color="black"
                            />
                          ),
                        })}>
                      </Stack.Screen>
                      <Stack.Screen 
                        name = "Journal New Entry Page" 
                        component = {AddJournalEntryPage}
                        options={({navigation}) =>({
                          animation: 'slide',
                          gestureEnabled: false,
                          headerTitle: "",
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: "#B6D3B3",
                          },
                          headerLeft: () => (
                            <IconButton
                              onPress={() => navigation.navigate("Journal Home Page")}
                              iconName="arrow-back"
                              iconComponent={Ionicons}
                              size={30}
                              color="black"
                            />
                          ),
                        })}>
                      </Stack.Screen>
                      <Stack.Screen 
                        name = "Journal Entry Page" 
                        component = {ViewJournalEntry}
                        options={({navigation}) =>({
                          animation: 'fade',
                          gestureEnabled: false,
                          headerTitle: "",
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: "#B6D3B3",
                          },
                          headerLeft: () => (
                            <IconButton
                              onPress={() => navigation.navigate("Journal Home Page")}
                              iconName="arrow-back"
                              iconComponent={Ionicons}
                              size={30}
                              color="black"
                            />
                          ),
                        })}>
                      </Stack.Screen>
                      
                      <Stack.Screen 
                        name = "Progress Tracking" 
                        component = {ProgressTracker}
                        options={({navigation}) =>({
                          animation: 'slide_from_bottom',
                          gestureEnabled: false,
                          headerTitle: "",
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: "#B6D3B3",
                          },
                          headerLeft: () => (
                            <IconButton
                              onPress={() => navigation.navigate("Home Page")}
                              iconName="arrow-back"
                              iconComponent={Ionicons}
                              size={30}
                              color="black"
                            />
                          ),
                        })}>

                        </Stack.Screen>

                      <Stack.Screen 
                        name = "Store Page" 
                        component = {StorePage}
                        options={({navigation}) =>({
                          animation: 'slide_from_bottom',
                          gestureEnabled: false,
                          headerTitle: "Moobie's Shop",
                          headerShadowVisible: false,
                          headerTitleStyle:{
                            fontSize: 25,
                          },
                          headerStyle: {
                            backgroundColor: "#B6D3B3",
                          },

                          headerLeft: () => (
                            <IconButton
                              onPress={() => navigation.navigate("Home Page")}
                              iconName="arrow-back"
                              iconComponent={Ionicons}
                              size={30}
                              color="black"
                            />
                          ),
                        })}>
                      </Stack.Screen>
                      <Stack.Screen 
                        name = "Closet Page" 
                        component = {ClosetPage}
                        options={({navigation}) =>({
                          animation: 'slide_from_bottom',
                          gestureEnabled: false,
                          headerTitle: " ",
                          headerShadowVisible: false,
                          headerTitleStyle:{
                            fontSize: 25,
                          },
                          headerStyle: {
                            backgroundColor: "#B6D3B3",
                          },

                          headerLeft: () => (
                            <IconButton
                              onPress={() => navigation.navigate("Home Page")}
                              iconName="arrow-back"
                              iconComponent={Ionicons}
                              size={30}
                              color="black"
                            />
                          ),
                        })}>
                        </Stack.Screen>
                    </Stack.Navigator>
                  </NavigationContainer>
                </MoobieProvider>
              </UserCurrencyProvider>
            </SaturdayLoginProvider>
            </FridayLoginProvider>
            </ThursdayLoginProvider>
            </WednesdayLoginProvider>
            </TuesdayLoginProvider>
            </MondayLoginProvider>
            </SundayLoginProvider>
          </LongestStreakProvider>
        </ConsecutiveLoginsProvider>
      </DailyLoginsProvider>
      </ShowWeeklyNotificationProvider>
      </ShowJournalNotificationProvider>
      </ShowDailyNotificationProvider>
      </TaskContextProvider>       
    </UserInfoProvider>
  );
}

