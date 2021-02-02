import React, { useState, useContext } from "react";
import FormikStepper from './forms/FormikStepper';
import CompanyInformation from "./forms/CompanyInformation";
import MembershipLevel from "./forms/MembershipLevel";
import WorkingGroups from "./forms/WorkingGroups";
import SigningAuthority from './forms/SigningAuthority';
import Preview from "./forms/Preview";
import { formField } from './formModels/formFieldModel';
import MembershipContext from "./MembershipContext";
import SignIn from './forms/SignIn';

const MultiStepForm = ({ defineInitialData, step, setStep }) => {
  const {isExistingMember} = useContext(MembershipContext)
  const [formDataStates, setFormDataStates] = useState(defineInitialData)  // Do I still need this State?
  // const [showHidden, setShowHidden] = useState(false)

  const [mktSame, setMktSame] = useState(false)
  const [accSame, setAccSame] = useState(false)

  const [disableInput, setDisableInput] = useState(false)

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
        <SignIn label="Sign In" />

        <CompanyInformation
          formField={formField}
          label="Company Information"
          skipped={isExistingMember ? true : false}
          mktSame={mktSame}
          setMktSame={setMktSame}
          accSame={accSame}
          setAccSame={setAccSame}
          disableInput={disableInput}
          setDisableInput={setDisableInput}
        />

        <MembershipLevel
          formField={formField}
          label="Membership Level"
          skipped={isExistingMember ? true : false}
        />

        <WorkingGroups
          formField={formField}
          label="Working Groups"
        />

        <SigningAuthority
          formField={formField}
          // showHidden={showHidden}
          // setShowHidden={setShowHidden}
          formDataStates={formDataStates}
          label="Signing Authority" 
        />
        
        <Preview formField={formField} previewData={formDataStates} label="Preview" />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm