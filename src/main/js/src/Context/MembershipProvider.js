import React, { useState } from "react";
import MembershipContext from "./MembershipContext";

/**
 * User and form Id context shared among the whole App
 * 
 * For more about context, please refer to: https://reactjs.org/docs/context.html 
 * 
 * It is simliar to state, but you can export and import anywhere, no need to pass all the way down to the child component 
 * 
 * It will provide the values to all the chidlren wrapped inside
 * **/

const MembershipProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [currentFormId, setCurrentFormId] = useState("")

    return (
        <MembershipContext.Provider value={{
            currentUser,
            setCurrentUser: (val) => setCurrentUser(val),
            currentFormId,
            setCurrentFormId: (val) => setCurrentFormId(val)

        }}>
            {children}
        </MembershipContext.Provider>
    )

}

export default MembershipProvider