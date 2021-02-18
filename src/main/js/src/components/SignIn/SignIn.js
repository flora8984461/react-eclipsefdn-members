import React, { useContext, useEffect } from 'react';
import MembershipContext from '../../Context/MembershipContext';
import FormChooser from '../FormPreprocess/FormChooser';
import SignInIntroduction from './SignInIntroduction';
import StepperComponent from '../Steppers/StepperComponent';
import { FETCH_HEADER } from '../../Constants/Constants';

const SignIn = ({setStep}) => {

    const {currentUser, setCurrentUser} = useContext(MembershipContext);

    const fakeChildrenArray = [{props: {label: 'Company Information'}}, {props: {label: 'Membership Level'}},{props: {label: 'Working Groups'}},{props: {label: 'Signing Authority'}},{props: {label: 'Review'}}]

    useEffect(() => {
        fetch('http://localhost:8090/userinfo',{ headers: FETCH_HEADER })
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            setCurrentUser(data?.name);
        })
        .catch(err => console.log(err));
    // eslint-disable-next-line
    }, [])

    if (currentUser) {

        return (
            <>
            <SignInIntroduction />
            <StepperComponent step={-1} childrenArray={fakeChildrenArray} />
            <h1>Form chooser</h1>
            <FormChooser currentUser={currentUser} setStep={setStep} />
            </>
        )

    }

    
    return(
        <>
        <SignInIntroduction />
        <StepperComponent step={-1} childrenArray={fakeChildrenArray} />
            <div className="text-center margin-bottom-20">
                {/* <button type="button" onClick={getFakeUser} className="btn btn-secondary">Sign In</button> */}
                <a href="/login" className="btn btn-secondary">Sign In</a>
                <a href="https://accounts.eclipse.org/" className="btn btn-secondary">Create an account</a>
            </div>
        </>
    )
}

export default SignIn