import React, { createContext, useContext, useState } from "react";

const MoobieContext = createContext();

export const MoobieProvider = ({children}) =>{
    const[bodyPart, setBodyPart] = useState({
        // Default moobie 
        head: require('../imgs/moobie_head/head1.png'),
        body: require('../imgs/moobie_body/body1.png'),
        lowerBody: require('../imgs/moobie_feet/feet1.png')
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
