import React, { useContext } from "react";
import MembershipContext from "../MembershipContext";
import FormChooser from './FormChooser';

const SignIn = ({setStep}) => {

    const {currentUser, setCurrentUser} = useContext(MembershipContext);

    const getFakeUser = () => {
        fetch('membership_data/fake_user.json',{
            headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
          .then(resp => resp.json())
          .then(data => {
            setCurrentUser(data);
          })

    }

    if (currentUser) {

        return (
            <>
            <h1>Form chooser</h1>
            <h2>Select an existing form</h2>
            <FormChooser currentUser={currentUser} setStep={setStep} />

            <h2>Create New Form</h2>
            <h3>Click on the Next Button to start a new form</h3>
            </>
        )

    }

    
    return(
        <>
            <div className="text-center margin-bottom-20">
                <button type="button" onClick={getFakeUser} className="btn btn-secondary">Sign In</button>
                <a href="https://accounts.eclipse.org/" className="btn btn-secondary">Create an account</a>
            </div>
        </>
    )
}

export default SignIn