import React, { useState } from 'react';
import FormikStepper from './FormikStepper/FormikStepper';
import CompanyInformation from './CompanyInformation/CompanyInformation';
import MembershipLevel from './MembershipLevel/MembershipLevel';
import WorkingGroupsWrapper from './WorkingGroups/WorkingGroupsWrapper';
import SigningAuthority from './SigningAuthority/SigningAuthority';
import Preview from './Preview/Preview';
import { formField } from './formModels/formFieldModel';
import { initialValues } from '../FormComponents/formModels/formFieldModel';

const MultiStepForm = () => {

  const [step, setStep] = useState(0)

  const handleSubmit = (values) => {  // This is for final submit, after preview
      console.log(values)
  }
  
  return (
    <>
      <FormikStepper
        initialValues={initialValues}
        onSubmit={handleSubmit}
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
          label="Signing Authority" 
        />
        
        <Preview formField={formField} label="Preview" />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm