import React, { useState } from 'react';
import MultiStepForm from './MultiStepForm';
import { initialValues } from './formModels/formFieldModel';

const FormWrapper = () => {
    const [step, setStep] = useState(0)

    return (
      <div className="container eclipseFdn-membership-webform">
        <MultiStepForm defineInitialData={initialValues} step={step} setStep={setStep} />
      </div>

    )
}

export default FormWrapper