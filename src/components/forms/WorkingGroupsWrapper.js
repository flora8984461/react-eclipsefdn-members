import React, { useContext, useEffect } from "react";
import MembershipContext from "../MembershipContext";
import { FieldArray } from 'formik';
import WorkingGroup from './WorkingGroup';
import { matchWorkingGroupFields } from '../utils/formFunctionHelpers';

const WorkingGroupsWrapper = ({ formField, ...otherProps }) => {
  const { currentFormId } = useContext(MembershipContext);

  // let boundArrayHelpers;

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {
      fetch('membership_data/membership.json',{
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
      .then(resp => resp.json())
      .then(data => {
        let temp = data.find(el => el.form_id === currentFormId);
        // if(boundArrayHelpers) {
        //     boundArrayHelpers.push(matchWorkingGroupFields(temp.membership_level));
        // }
        // If have an array, I'll use iterate it
        otherProps.parentState.formik.setFieldValue('workingGroups.0', matchWorkingGroupFields(temp.membership_level))
        otherProps.parentState.formik.setFieldValue('workingGroups.1', matchWorkingGroupFields(temp.membership_level))
      })
    // eslint-disable-next-line
  }, [])


  // const bindArrayHelpers = (arrayHelpers) => {
  //   boundArrayHelpers = arrayHelpers;
  // }

  return (
    <>
    <h2 className="fw-600">Working Group</h2>
    <p>Please complete the following details for joining a Working Group</p>
    <div id="working-groups-page" className="align-center margin-top-50 margin-bottom-30">
    <FieldArray
      name="workingGroups"
      render={arrayHelpers => {
        // bindArrayHelpers(arrayHelpers);
        return(
            <WorkingGroup formField={formField} arrayHelpers={arrayHelpers} formikProps={otherProps.parentState.formik} />
        )
      }}
    >
    </FieldArray>
    </div>
    </>
  );
};

export default WorkingGroupsWrapper

