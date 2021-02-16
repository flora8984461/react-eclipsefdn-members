import React, { useState } from "react";
import FormikStepper from './FormikStepper/FormikStepper';
import CompanyInformation from "./CompanyInformation/CompanyInformation";
import MembershipLevel from "./MembershipLevel/MembershipLevel";
import WorkingGroupsWrapper from "./WorkingGroups/WorkingGroupsWrapper";
import SigningAuthority from './SigningAuthority/SigningAuthority';
import Preview from "./Preview/Preview";
import { formField } from './formModels/formFieldModel';
import {initialValues} from '../FormComponents/formModels/formFieldModel';

const MultiStepForm = () => {

  const [step, setStep] = useState(0)
  const [ initials, setInitials ] = useState(initialValues)

  const handleSubmit = (values) => {  // This is for final submit, after preview
      console.log(values)
  }
  
  return (
    <>
      <FormikStepper
        enableReinitialize
        initialValues={initials}
        onSubmit={handleSubmit}
        step={step}
        setStep={setStep}
        setInitials={setInitials}
      >
        <CompanyInformation
          formField={formField}
          setInitials={setInitials}
          label="Company Information"
        />

        <MembershipLevel
          formField={formField}
          setInitials={setInitials}
          label="Membership Level"
        />

        <WorkingGroupsWrapper
          formField={formField}
          setInitials={setInitials}
          label="Working Groups"
        />

        <SigningAuthority
          formField={formField}
          setInitials={setInitials}
          label="Signing Authority" 
        />
        
        <Preview formField={formField} label="Preview" />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm