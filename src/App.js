import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDatabase } from './database.js';
import { CreateAccPage, LoginPage } from './account.js';
import { LoadingPage } from './loading.js';
import { CoverPage } from './cover.js';
import { AddJournalEntryPage, JournalHomePage } from './journal.js';
import { HomePage } from './homepage.js';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Cover Page" component = {CoverPage}></Stack.Screen>
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
        <Stack.Screen name = "Home Page" component = {HomePage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

