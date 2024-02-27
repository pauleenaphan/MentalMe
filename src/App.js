import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDatabase } from './database.js';
import { CreateAccPage, LoginPage } from './account.js';
import { LoadingPage } from './loading.js';

const Stack = createNativeStackNavigator();

export default function App() {

  createDatabase();


  return (
    <NavigationContainer>
    {/* Removes the back button on the top left of each page */}
      <Stack.Navigator screenOptions = {{headerBackVisible: false}}>
        <Stack.Screen name = "Create Account Page" component = {CreateAccPage}></Stack.Screen>
        <Stack.Screen name = "Login Page" component = {LoginPage}></Stack.Screen>
        <Stack.Screen name = "Loading Page" component = {LoadingPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

