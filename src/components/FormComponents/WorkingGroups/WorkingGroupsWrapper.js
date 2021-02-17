import React, { useState, useContext, useEffect } from "react";
import MembershipContext from "../../../Context/MembershipContext";
import { FieldArray } from 'formik';
import WorkingGroup from './WorkingGroup';
import { matchWorkingGroupFields } from '../../../Utils/formFunctionHelpers';
import Loading from '../../Loading/Loading';
import { FETCH_HEADER } from '../../../Constants/Constants';

const WorkingGroupsWrapper = ({ formField, ...otherProps }) => {
  const { currentFormId } = useContext(MembershipContext);

  const [loading, setLoading] = useState(true);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

    if(currentFormId) {
      fetch(`membership_data/${currentFormId}/workingGroups.json`,{headers: FETCH_HEADER})
      .then(resp => resp.json())
      .then(data => {
        if(data.length) {
          otherProps.parentState.formik.setFieldValue(`workingGroups`, matchWorkingGroupFields(data))
        }
        setLoading(false);
      })
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [])

  if(loading) {
    return <Loading />
  }

  return (
    <>
    <h2 className="fw-600">Working Group</h2>
    <p>Please complete the following details for joining a Working Group</p>
    <div id="working-groups-page" className="align-center margin-top-50 margin-bottom-30">
    <FieldArray
      name="workingGroups"
      render={arrayHelpers => {
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

