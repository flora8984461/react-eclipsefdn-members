import React, { useState } from "react";
import MembershipContext from "./MembershipContext";

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