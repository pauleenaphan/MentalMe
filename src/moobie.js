import React, { createContext, useContext, useState } from "react";

const MoobieContext = createContext();

export const MoobieProvider = ({children}) =>{
    const[bodyPart, setBodyPart] = useState({
        head: require('../imgs/moobie_head/head4.png'),
        body: require('../imgs/moobie_body/body2.png'),
        feet: require('../imgs/moobie_feet/feet2.png')
    })

    const handlePart = (part, imgFile) =>{
        setBodyPart({
            ...bodyPart,
            [part]: imgFile
        })
    }

    return(
        <MoobieContext.Provider value = {{bodyPart, handlePart}}>
            {children}
        </MoobieContext.Provider>
    )
}

export const getMoobie = () => useContext(MoobieContext);
