import React from 'react';
import DateInput from '../Inputs/DateInput';

const EffectiveDate = ({ name }) => {

  return (
    <>
    <h4 className="fw-600 margin-top-30" id={name}>What is the effective date for your Membership Agreement/ Working Group Participation Agreement?<span className="orange-star margin-left-5">*</span></h4>
    <div className="row">
      <div className="col-md-10">
        <DateInput label="EffectiveDate" name={name} />
      </div>
    </div>
    </>
  )
}

export default EffectiveDate