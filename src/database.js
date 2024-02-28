// import { useEffect } from 'react';
// import * as SQLite from 'expo-sqlite';

// const validator = require('validator');
// const db = SQLite.openDatabase('mydb.db');

// export const createDatabase = () =>{
//     useEffect(() => {
//         //creates a new table if user does not exist
//         db.transaction(tx => {
//             tx.executeSql(
//             'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, password VARCHAR)',
//             [],
//             () => console.log('Table created successfully'),
//             (error) => console.log('Error creating table:', error)
//             );
//         });
//     }, []);
// }

// //creates a new user 
// export const createUser = (personalInfo) =>{
//     const { email, password } = personalInfo;
//     db.transaction((tx) =>{
//         tx.executeSql(
//         //checks for duplicate emails
//         'SELECT * FROM user WHERE email = ?', [email],
//         (_, results) =>{
//             if(results.rows.length > 0){
//             console.log("User already exist with this email");

//             //checks for empty email or pass NOTE: you can also implement this real time
//             //checks for valid email first before checking for empty password
//             }else if(validator.isEmail(email) == false){
//                 console.log("email is not valid");
//                 //checks for valid email
//             }else if(password.length < 5){
//                 console.log("Password must be greater than 5 characters");
//             }
//             else{
//             //if it is valid info then insert the user into the db 
//             tx.executeSql(
//                 'INSERT INTO user (email, password) VALUES (?,?)', [email, password],
//                 console.log(personalInfo.email + " was created")
//             )
//             }
//             (error)=>{
//             console.log("could not insert error" + error)
//             }
//         }
//         );
//     });
// };

// //console log the table and its values
// export const showUsers = () =>{
//     db.transaction(tx => {
//         tx.executeSql(
//         'SELECT * FROM user',
//         [],
//         (_, { rows: { _array } }) => {
//             console.log('Retrieved data:', _array); // Log the retrieved data
//             // setData(_array);
//         },
//         error => console.error('Error executing SQL query:', error)
//         );
//     });
// };

// //clears the whole table
// export const clearTable = () => {
//     db.transaction(tx => {
//         tx.executeSql(
//         'DELETE FROM user',
//         [],
//         () => {
//             console.log('Table cleared successfully');
//         },
//         error => console.error('Error clearing table:', error)
//         );
//     });
// };

// //checks existing user to log them in
// //needed the async since the function is returning the query immedietaly without waiting for the query to finish
// export const checkExistingUser = (personalInfo) => {
//     return new Promise((resolve, reject) =>{
//         const { email, password} = personalInfo;
//         db.transaction((tx) =>{
//             tx.executeSql(
//                 'SELECT * FROM user WHERE email = ? AND password = ?', [email, password],
//                 (_, results) =>{
//                     if(results.rows.length > 0){
//                         console.log("login successfully " + email + " " + password);
//                         resolve(true);
//                     }else{
//                         console.log("login failed, user is not in database");
//                         resolve(false);
//                     }
//                 },
//                 (_, error) =>{
//                     console.log("login failed " + error)
//                     reject(error);
//                 }
//             )
//         })
//     })
// }


