import React, { createContext, useState } from 'react';

const TaskContext = createContext();

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