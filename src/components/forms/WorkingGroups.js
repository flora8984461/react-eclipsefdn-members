import React, { useContext } from "react";
import { useFormikContext } from 'formik';
import MembershipContext from "../MembershipContext";
import CustomSelectWrapper from "./Inputs/CustomSelect/CustomSelectWrapper";
import CustomAsyncSelect from "./Inputs/CustomSelect/CustomAsyncSelect";
import ParticipationLevel from './ParticipationLevel';
import EffectiveDate from './EffectiveDate';
import WorkingGroupsRepresentative from './WorkingGroupRepresentative';
import { FieldArray } from 'formik';

const WorkingGroups = ({ formField, ...otherProps }) => {
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
    <h2 className="fw-600">Working Group</h2>
    <p>Please complete the following details for joining a Working Group</p>
    <div id="working-groups-page" className="align-center margin-top-50 margin-bottom-30">

    <FieldArray
      name="workingGroups"
      render={arrayHelpers => (
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
           
      )}  
    >

    </FieldArray>

    </div>
    </>
  );
};

export default WorkingGroups

