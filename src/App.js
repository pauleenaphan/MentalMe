import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDatabase } from './database.js';
import { CreateAccPage, LoginPage } from './account.js';
import { LoadingPage } from './loading.js';
import { CoverPage } from './cover.js';
import { AddJournalEntryPage, JournalHomePage } from './journal.js';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
    {/* TODO: need to remove the top left head for the login and signup pages */}
      <Stack.Navigator>
        <Stack.Screen name = "Cover Page" component = {CoverPage}></Stack.Screen>
        <Stack.Screen name = "Create Account Page" component = {CreateAccPage}></Stack.Screen>
        <Stack.Screen name = "Login Page" component = {LoginPage}></Stack.Screen>
        <Stack.Screen name = "Loading Page" component = {LoadingPage}></Stack.Screen>
        <Stack.Screen name = "Journal Home Page" component = {JournalHomePage}></Stack.Screen>
        <Stack.Screen name = "Journal New Entry Page" component = {AddJournalEntryPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

