import React, { useState, useRef, useContext } from "react";
import { Form, Formik } from "formik";
import { validationSchema } from '../formModels/ValidationSchema';
import StepperComponent from "../steppers/StepperComponent";
import CustomStepButton from "./CustomStepButton";
import { executeSendDataByStep } from '../utils/formFunctionHelpers';
import MembershipContext from "../MembershipContext";
import SubmitSuccess from '../SubmitSuccess';

//form.validateForm(); to manually call validate

const FormikStepper = ({ step, setStep, children, ...props }) => {

  const [completed, setCompleted] = useState(new Set());
  const childrenArray = React.Children.toArray(children)
  const currentChild = childrenArray[step]
  const currentValidationSchema = validationSchema[step]

  const formRef = useRef();

  const { currentFormId, setCurrentFormId } = useContext(MembershipContext);
  const { currentUser } = useContext(MembershipContext);

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
        defaultBehaviour();
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
        await executeSendDataByStep(step, values, currentFormId, currentUser.user_id);
        defaultBehaviour();
        break;

      default:
        props.setFormDataStates(values);
        await executeSendDataByStep(step, values, currentFormId, currentUser.user_id);
        defaultBehaviour();
    }
  }

  if (step === childrenArray.length) {
    return <SubmitSuccess />
  }

  return (
    <>
    <StepperComponent step={step} setStep={setStep} childrenArray={childrenArray} completed={completed} formRef={formRef} currentFormId={currentFormId} setCurrentFormId={setCurrentFormId} />

    <Formik
      {...props}
      // enableReinitialize
      onSubmit={handleOnSubmit}
      validationSchema={currentValidationSchema}
      innerRef={formRef}
    >
      {
        (formik) =>
          <>
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