import React, { useState } from 'react';
import FormikStepper from './FormikStepper/FormikStepper';
import CompanyInformation from './CompanyInformation/CompanyInformation';
import MembershipLevel from './MembershipLevel/MembershipLevel';
import WorkingGroupsWrapper from './WorkingGroups/WorkingGroupsWrapper';
import SigningAuthority from './SigningAuthority/SigningAuthority';
import Preview from './Preview/Preview';
import { formField, initialValues } from './formModels/formFieldModel';
import { 
  COMPANY_INFORMATION,
  MEMBERSHIP_LEVEL,
  WORKING_GROUPS,
  SIGNING_AUTHORITY,
  REVIEW
} from '../../Constants/Constants';

const MultiStepForm = () => {

  const [step, setStep] = useState(0);

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
          label={COMPANY_INFORMATION}
        />

        <MembershipLevel
          formField={formField}
          label={MEMBERSHIP_LEVEL}
        />

        <WorkingGroupsWrapper
          formField={formField}
          label={WORKING_GROUPS}
        />

        <SigningAuthority
          formField={formField}
          label={SIGNING_AUTHORITY}
        />
        
        <Preview formField={formField} label={REVIEW} />

      </FormikStepper>
    </>
  )
};

export default MultiStepForm