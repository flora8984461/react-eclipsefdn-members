import React, { useState, useRef, useContext } from "react";
import { Form, Formik } from "formik";
import { validationSchema } from '../formModels/ValidationSchema';
import Stepper from "../steppers/Stepper";
import Step from "../steppers/Step";
import CustomStepButton from "./CustomStepButton";
import SignInIntroduction from './SignInIntroduction';
import { defineDataBodyAndEndpoint, sendData } from '../utils/formFunctionHelpers';
import MembershipContext from "../MembershipContext";

//form.validateForm(); to manually call validate

const FormikStepper = ({ step, setStep, children, ...props }) => {

  const childrenArray = React.Children.toArray(children)
  const currentChild = childrenArray[step]
  const currentValidationSchema = validationSchema[step]

  const formRef = useRef()

  const [completed, setCompleted] = useState(new Set())

  const { currentFormId } = useContext(MembershipContext);

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  const handleComplete = () => {
    const newCompleted = new Set(completed)
    newCompleted.add(step)
    setCompleted(newCompleted)
  }

  const defaultBehaviour = () => {
    handleComplete();
    setStep((s) => s + 1);
  }

  const handleOnSubmit = async (values, formikBag) => {

    switch(step) {
      case childrenArray.length - 1:
        console.log("submit on last step");
        console.log(values);
        break;

      case 0:
        defaultBehaviour();
        break;

      case 1: 
        if(props.mktSame) {
          Object.assign(values.companyRepresentative.marketingRepresentative, values.companyRepresentative.representative)
        }
        if (props.accSame) {
          Object.assign(values.companyRepresentative.accounting, values.companyRepresentative.representative)
        }
        props.setFormDataStates(values);
        await sendData('organizations', currentFormId, values.organization);
        await sendData('contacts', currentFormId, values.companyRepresentative);
        defaultBehaviour();
        break;

      default:
        props.setFormDataStates(values);
        var {endpoint, dataBody} = defineDataBodyAndEndpoint(step, values);
        // await sendData(endpoint, currentFormId, dataBody, defaultBehaviour);  I should use this when endpoint is live, but now it stops me to continue
        await sendData(endpoint, currentFormId, dataBody);
        defaultBehaviour();
    }
  }

  ///////////////////////////////////
  function isStepComplete(step) {
    return completed.has(step)
  }
  ////////////////////////////////////////

  return (
    <>

      <Formik
        {...props}
        onSubmit={handleOnSubmit}
        validationSchema={currentValidationSchema}
        innerRef={formRef}
      >
        {
          (formik) =>
            <>

              { step === 0 && <SignInIntroduction /> }

              <Stepper activeStep={step} chidlrenSteps={childrenArray} handleOnClick={setStep}>
                {childrenArray.map((child, index) => {
                  return (
                    <Step
                      key={index}
                      width={100 / childrenArray.length}
                      title={child.props.label}
                      onClick={setStep}
                      active={index === step}
                      completed={isStepComplete(index)}
                      first={index === 0}
                      isLast={index === childrenArray.length - 1}
                      index={index}
                      stepReached={isStepComplete(index - 1)}
                      formikErrors={formik.errors}
                      currentStep={step}
                      validateForm={formik.validateForm}
                      formRef={formRef}
                    />
                  )
                })}
              </Stepper>
              <Form>
                {React.cloneElement(currentChild, { parentState: { formik, ...props } })}
                <CustomStepButton
                  values={formik.values}
                  step={step}
                  isSubmitting={formik.isSubmitting}
                  setStep={setStep}
                  isLastStep={isLastStep}
                  formikSubmit={formik.submitForm}
                />
              </Form>
            </>
        }
      </Formik>
    </>
  )
}

export default FormikStepper