import React, { useState } from "react";
import FormikStepper from './FormikStepper/FormikStepper';
import CompanyInformation from "./CompanyInformation/CompanyInformation";
import MembershipLevel from "./MembershipLevel/MembershipLevel";
import WorkingGroupsWrapper from "./WorkingGroups/WorkingGroupsWrapper";
import SigningAuthority from './SigningAuthority/SigningAuthority';
import Preview from "./Preview/Preview";
import { formField } from './formModels/formFieldModel';

const MultiStepForm = ({ defineInitialData }) => {

  const [formDataStates, setFormDataStates] = useState(defineInitialData)  // Do I still need this State?
  const [step, setStep] = useState(0)

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
      >
        <CompanyInformation
          formField={formField}
          label="Company Information"
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