import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

//keeps track of the user's daily/weekly task
export const TaskContextProvider = ({ children }) =>{
    const [journalTask, setJournalTask] = useState('false');
    const [weeklyLogin, setWeeklyLogin] = useState('false');

    return (
        <TaskContext.Provider value = {{ journalTask, setJournalTask, weeklyLogin, setWeeklyLogin}}>
            {children}
        </TaskContext.Provider>
    );
};

export const getTaskInfo = () => useContext(TaskContext);