import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const validator = require('validator');


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
        //checks for duplicate emails
        'SELECT * FROM user WHERE email = ?', [personalInfo.email],
        (_, results) =>{
          if(results.rows.length > 0){
            console.log("User already exist with this email");

            //checks for empty email or pass NOTE: you can also implement this real time
            //checks for valid email first before checking for empty password
          }else if(validator.isEmail(personalInfo.email) == false){
            console.log("email is not valid");
            //checks for valid email
          }else if(personalInfo.password == ""){
            console.log("one of the values is empty");
          }
          else{
            //if it is valid info then insert the user into the db 
            tx.executeSql(
              'INSERT INTO user (email, password) VALUES (?,?)', [personalInfo.email, personalInfo.password],
              console.log(personalInfo.email + " was created")
            )
          }
          (error)=>{
            console.log("could not insert error" + error)
          }
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
