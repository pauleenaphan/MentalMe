import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('mydb.db');

export default function App() {
  const [personalInfo, setPersonalInfo] = useState({
    email: ' ',
    password: ' ' 
  });

  //while the user is inputting text it will update the current value of email to the value in the inputbox
  const handleInfo = (name, text) =>{
    setPersonalInfo({
      ...personalInfo,
      [name]: text
    })
  }

  showInfo = () => {
    console.log("Email " + personalInfo.email + " Password " + personalInfo.password);
  }

  //useeffect will run code in here everytime we render
  useEffect(() => {
    //creates a new table if user does not exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, password VARCHAR)',
        [],
        () => console.log('Table created successfully'),
        (error) => console.log('Error creating table:', error)
      );
    });
  }, []);

  //creates a new user 
  const createUser = () =>{
    db.transaction((tx) =>{
      tx.executeSql(
        "INSERT INTO user (email, password) VALUES (?,?)",
        [personalInfo.email, personalInfo.password],
        () =>{
          console.log("new user is created " + personalInfo.email);
        },
        (error) =>{
          console.log("new user was not created", error)
        }
      )
    })
  }

  //console log the table and its values
  const showUsers = () =>{
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM user',
        [],
        (_, { rows: { _array } }) => {
          console.log('Retrieved data:', _array); // Log the retrieved data
          // setData(_array);
        },
        error => console.error('Error executing SQL query:', error)
      );
    });
  }

  //clears the whole table
  const clearTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM user',
        [],
        () => {
          console.log('Table cleared successfully');
        },
        error => console.error('Error clearing table:', error)
      );
    });
  };
  

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder = 'email'
        //gets user email from textinput and set the value to email
        onChangeText = {(text) => handleInfo('email', text)}
      />

      <TextInput
        placeholder = "password"
        onChangeText = {(text) => handleInfo('password', text)}
      />


      <Button
        title = "submit"
        onPress = {createUser}
        // onPress = {showInfo}
      />

      <Button
        title = "console table"
        onPress = {showUsers}
      />

      <Button
        title = "clear table"
        onPress = {clearTable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
