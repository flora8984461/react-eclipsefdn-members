import React from "react";
import DateInput from './Inputs/DateInput';

const EffectiveDate = ({ formField }) => {
  // const {
  //   effectiveDate
  // } = formField;

  return (
    <>
    <h4 className="fw-600 margin-top-30">What is the effective date for your Membership Agreement/ Working Group Participation Agreement?</h4>
    <DateInput label="EffectiveDate" name="effectiveDate" />
    </>
  )
}

export default EffectiveDate