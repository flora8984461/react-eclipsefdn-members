import React, { useContext } from "react";
import { useFormikContext } from 'formik';
import MembershipContext from "../MembershipContext";
import CustomSelectWrapper from "./Inputs/CustomSelect/CustomSelectWrapper";
import CustomAsyncSelect from "./Inputs/CustomSelect/CustomAsyncSelect";
import ParticipationLevel from './ParticipationLevel';
import EffectiveDate from './EffectiveDate';
import WorkingGroupsRepresentative from './WorkingGroupRepresentative';

const WorkingGroup = ({ formField, arrayHelpers, formikProps }) => {
  const { values } = useFormikContext();
  const { isExistingMember } = useContext(MembershipContext);

  const each_workingGroupField = {
      workingGroup: "",
      participationLevel: "",
      effectiveDate: "",
      workingGroupRepresentative: {
        firstName: "",
        lastName: "",
        jobtitle: "",
        email: ""
      }
  }


  return (
    <>
      { values.workingGroups && values.workingGroups.length > 0 && values.workingGroups.map((workingGroup, index) => (
        <div key={index}>
          <h3 className="h4 fw-600">Which working group would you like to join? <span className="orange-star">*</span> </h3>
          <CustomSelectWrapper
            label="Working Groups"
            name={`workingGroups.${index}.workingGroup`}
            srcData="workingGroups"
            isExistingMember={isExistingMember}
            renderComponent={CustomAsyncSelect}
          />

          { workingGroup.workingGroup ? 
            <>
              <ParticipationLevel name={`workingGroups.${index}.participationLevel`} participationLevels={workingGroup.workingGroup.participation_levels} />
              <EffectiveDate name={`workingGroups.${index}.effectiveDate`} label="Effective Date" />
            </>
            : null
          }
            <WorkingGroupsRepresentative name={`workingGroups.${index}.workingGroupRepresentative`} formField={formField} label="Working Group Representative" />
            
            { values.workingGroups.length > 1 &&
            <div className="text-center margin-bottom-20">
              <button className="btn btn-secondary padding-15" type="button" onClick={() => arrayHelpers.remove(index)}>
                Remove this group
              </button>
            </div>
            }
        </div>
      )) }
    <div className="text-center margin-bottom-20">
      <button
        className="btn btn-secondary padding-15"
        type="button"
        onClick={() => arrayHelpers.push(each_workingGroupField)}
      >
        Add another working group
      </button>
    </div>

    </>

  );
};

export default WorkingGroup

