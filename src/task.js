import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

//keeps track of the user's daily/weekly task
export const TaskContextProvider = ({ children }) =>{
    const [loginTask, setLoginTask] = useState('');
    const [journalTask, setJournalTask] = useState('');
    const [weeklyLogin, setWeeklyLogin] = useState('');

    return (
        <TaskContext.Provider value = {{ loginTask, setLoginTask, journalTask, setJournalTask, weeklyLogin, setWeeklyLogin}}>
            {children}
        </TaskContext.Provider>
    );
};

export const getTaskInfo = () => useContext(TaskContext);