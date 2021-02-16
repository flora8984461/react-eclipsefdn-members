import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MultiStepForm from '../FormComponents/MultiStepForm';
import MembershipContext from "../../Context/MembershipContext";
import SignIn from '../SignIn/SignIn';

const FormWrapper = () => {
  const {currentUser} = useContext(MembershipContext);
    return (
    <Router>
      <div className="container eclipseFdn-membership-webform">
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/form">
          { !currentUser ? <Redirect to="/" /> : <MultiStepForm /> }
        </Route>
      </Switch>
      </div>
    </Router>
    )
}

export default FormWrapper