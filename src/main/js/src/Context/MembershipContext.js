import React from "react";

const MembershipContext = React.createContext({
    currentUser: {},
    setCurrentUser: () => {},
    currentFormId: "",
    setCurrentFormId: () => {}
});

export default MembershipContext