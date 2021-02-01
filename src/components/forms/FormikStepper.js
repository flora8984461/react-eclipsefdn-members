import React, { useState, useRef } from "react";
import { Form, Formik } from "formik";
import { validationSchema } from '../formModels/ValidationSchema';
import Stepper from "../steppers/Stepper";
import Step from "../steppers/Step";
import CustomStepButton from "./CustomStepButton";

//form.validateForm(); to manually call validate

const FormikStepper = ({ step, setStep, children, ...props }) => {

  const childrenArray = React.Children.toArray(children)
  const currentChild = childrenArray[step]
  const currentValidationSchema = validationSchema[step]

  const formRef = useRef()

  const [completed, setCompleted] = useState(new Set())
  function isLastStep() {
    return step === childrenArray.length - 1
  }

  const handleComplete = () => {
    const newCompleted = new Set(completed)
    newCompleted.add(step)
    setCompleted(newCompleted)
  }

  const handleOnSubmit = async (values, formikBag) => {

    if (isLastStep()) {
      await props.onSubmit(values)
    }
    else {
      props.setFormDataStates(values)
      handleComplete()
      // actions.setStatus({message: "submitted"})
      setStep((s) => s + 1)
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
              <Stepper activeStep={step} chidlrenSteps={childrenArray} handleOnClick={setStep}>
                {childrenArray.map((child, index) => {
                  return (
                    <Step
                      key={index}
                      width={100 / childrenArray.length}
                      title={child.props.label}
                      onClick={setStep}
                      active={index === step}
                      completed={isStepComplete(index) || child.props.skipped}
                      first={index === 0}
                      isLast={index === childrenArray.length - 1}
                      index={index}
                      stepReached={isStepComplete(index - 1) || childrenArray[index - 1]?.props.skipped}
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