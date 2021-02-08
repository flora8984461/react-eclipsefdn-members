import React, { useContext } from "react";
import MembershipContext from "../../Context/MembershipContext";
import FormChooser from '../FormPreprocess/FormChooser';
import SignInIntroduction from './SignInIntroduction';
import StepperComponent from '../Steppers/StepperComponent';

const SignIn = ({setStep}) => {

    const {currentUser, setCurrentUser} = useContext(MembershipContext);

    const fakeChildrenArray = [{props: {label: "Company Information"}}, {props: {label: "Membership Level"}},{props: {label: "Working Groups"}},{props: {label: "Signing Authority"}},{props: {label: "Preview"}}]

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
            <SignInIntroduction />
            <StepperComponent step={-1} childrenArray={fakeChildrenArray} />
            <h1>Form chooser</h1>
            <h2>Select an existing form</h2>
            <FormChooser currentUser={currentUser} setStep={setStep} />
            </>
        )

    }

    
    return(
        <>
        <SignInIntroduction />
        <StepperComponent step={-1} childrenArray={fakeChildrenArray} />
            <div className="text-center margin-bottom-20">
                <button type="button" onClick={getFakeUser} className="btn btn-secondary">Sign In</button>
                <a href="https://accounts.eclipse.org/" className="btn btn-secondary">Create an account</a>
            </div>
        </>
    )
}

export default SignIn