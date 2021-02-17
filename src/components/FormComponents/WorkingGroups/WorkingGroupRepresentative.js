import React from "react";
import Input from '../Inputs/Input';

const WorkingGroupRepresentative = ({ name, formField }) => {

  const { workingGroupRepresentative } = formField;
  
  return (
    <>
      <h4 className="fw-600">Who is the working group representative?</h4>
      <div className="row">
      { workingGroupRepresentative.map(el => 
          <div key={el.name} className="col-md-12">
            <Input name={`${name}.${el.name}`} labelName={el.label} placeholder={el.placeholder} />
          </div>
      ) }
      </div>
    </>
  );
};

export default WorkingGroupRepresentative