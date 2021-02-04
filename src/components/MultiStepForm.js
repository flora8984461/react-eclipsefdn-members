import React, { useState } from "react";
import FormikStepper from './forms/FormikStepper';
import CompanyInformation from "./forms/CompanyInformation";
import MembershipLevel from "./forms/MembershipLevel";
// import WorkingGroups from "./forms/WorkingGroups";
import WorkingGroupsWrapper from "./forms/WorkingGroupsWrapper";
import SigningAuthority from './forms/SigningAuthority';
import Preview from "./forms/Preview";
import { formField } from './formModels/formFieldModel';
import SignIn from './forms/SignIn';

const MultiStepForm = ({ defineInitialData, step, setStep }) => {

  const [formDataStates, setFormDataStates] = useState(defineInitialData)  // Do I still need this State?

  const [mktSame, setMktSame] = useState(false)
  const [accSame, setAccSame] = useState(false)

  const handleSubmit = (values) => {  // This is for final submit, after preview
      console.log(values)
  }
  
  return (
    <>
      <FormikStepper
        enableReinitialize
        initialValues={formDataStates}
        onSubmit={handleSubmit}
        formDataStates={formDataStates}
        setFormDataStates={setFormDataStates}
        step={step}
        setStep={setStep}
        mktSame={mktSame}
        accSame={accSame}
      >
        <SignIn label="Sign In" setStep={setStep} />

        <CompanyInformation
          formField={formField}
          label="Company Information"
          mktSame={mktSame}
          setMktSame={setMktSame}
          accSame={accSame}
          setAccSame={setAccSame}
        />

        <MembershipLevel
          formField={formField}
          label="Membership Level"
        />

        <WorkingGroupsWrapper
          formField={formField}
          label="Working Groups"
        />

        <SigningAuthority
          formField={formField}
          formDataStates={formDataStates}
          label="Signing Authority" 
        />
        
        <Preview formField={formField} previewData={formDataStates} label="Preview" />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm