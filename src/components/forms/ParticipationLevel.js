import React from "react";
// import { Field } from "formik";
import Select from "./Inputs/Select";

const ParticipationLevel = ({name, participationLevels}) => {

  return (
    <>
      <h4 className="fw-600 margin-top-30">What is your intended participation level?</h4>
      <Select
        label="ParticipationLevel"
        name={name}
        options={participationLevels}
      />
    </>
  );
};

export default ParticipationLevel