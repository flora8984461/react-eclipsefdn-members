import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MultiStepForm from './MultiStepForm';
import MembershipContext from "./MembershipContext";
import { initialValues } from './formModels/formFieldModel';
import SignIn from './forms/SignIn';

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
          { !currentUser ? <Redirect to="/" /> : <MultiStepForm defineInitialData={initialValues} /> }
        </Route>
      </Switch>
      </div>
    </Router>
    )
}

export default FormWrapper