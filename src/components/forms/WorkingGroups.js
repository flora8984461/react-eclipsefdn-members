import React, { useContext } from "react";
import { useFormikContext } from 'formik';
import MembershipContext from "../MembershipContext";
import CustomSelectWrapper from "./Inputs/CustomSelect/CustomSelectWrapper";
import CustomAsyncSelect from "./Inputs/CustomSelect/CustomAsyncSelect";
import ParticipationLevel from './ParticipationLevel';
import EffectiveDate from './EffectiveDate';
import WorkingGroupsRepresentative from './WorkingGroupRepresentative';

const WorkingGroups = ({ formField }) => {
  const { values } = useFormikContext()
  const {isExistingMember} = useContext(MembershipContext)

  return (
    <>
    <h2 className="fw-600">Working Group</h2>
    <p>Please complete the following details for joining a Working Group</p>
    <div className="align-center margin-top-50 margin-bottom-30">
      <h3 className="h4 fw-600">Which working group would you like to join? * </h3>
      <CustomSelectWrapper
        label="Working Groups"
        name="workingGroup"
        srcData="workingGroups"
        isExistingMember={isExistingMember}
        renderComponent={CustomAsyncSelect}
      />

      { values.workingGroup.value ? 
        <>
          <ParticipationLevel formField={formField} label="Participation Level" participationLevels={values.workingGroup.participation_levels} />
          <EffectiveDate formField={formField} label="Effective Date" />
        </>
        : null
      }
        <WorkingGroupsRepresentative formField={formField} label="Working Group Representative" />

    </div>

    <div className="text-center margin-bottom-20"><button className="btn btn-secondary padding-15" type="button"> Add another working group </button></div>
    
    </>
  );
};

export default WorkingGroups

