import React from "react";
import Input from './Inputs/Input';

const SigningAuthority = ({ formField, formDataStates }) => {
  const {
    signingAuthorityRepresentative
    } = formField;
  return (
    <>
    <h2 className="fw-600">Signing Authority</h2>
    <p>Please Indicate the individual who has the signing authority for the agreement</p>

    <div className="row">
      <div className="col-md-12">
          <Input name={signingAuthorityRepresentative[0].name} labelName={signingAuthorityRepresentative[0].label} placeholder={signingAuthorityRepresentative[0].placeholder} />
      </div>
      <div className="col-md-12">
          <Input name={signingAuthorityRepresentative[1].name} labelName={signingAuthorityRepresentative[1].label} placeholder={signingAuthorityRepresentative[1].placeholder} />
      </div>
      <div className="col-md-24">
          <Input name={signingAuthorityRepresentative[2].name} labelName={signingAuthorityRepresentative[2].label} placeholder={signingAuthorityRepresentative[2].placeholder} />
      </div>



        {/* { signingAuthorityRepresentative.map(el => 
          <div key={el.name} className="col-md-12">
            <Input name={el.name} labelName={el.label} placeholder={el.placeholder} />
          </div>
        ) } */}
    </div>
    </>
  )

}

export default SigningAuthority