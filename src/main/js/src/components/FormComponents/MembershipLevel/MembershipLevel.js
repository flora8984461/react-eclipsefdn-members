import React, { useContext, useEffect, useState } from 'react';
import Select from '../Inputs/Select';
// import Select from 'react-select';
import MembershipFeeTable from './MembershipFeeTable';
import MembershipContext from '../../../Context/MembershipContext';
import Loading from '../../Loading/Loading';
import { api_prefix_form, FETCH_HEADER, membership_levels, newForm_tempId } from '../../../Constants/Constants';

const MembershipLevel = ({ formField, ...otherProps }) => {

  const { currentFormId } = useContext(MembershipContext);

  const { membershipLevel } = formField;

  const [ loading, setLoading ] = useState(true);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

    if (currentFormId && currentFormId !== newForm_tempId) {
      fetch(api_prefix_form + `/${currentFormId}`,{ headers : FETCH_HEADER })
      .then(resp => resp.json())
      .then(data => {
        if(data) {
          otherProps.parentState.formik.setFieldValue(membershipLevel.name, data[0]?.membership_level);
        }
        setLoading(false);
      })
    } else {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, [])
  
  if (loading) {
    return <Loading />
  }

  return (
    <>
    <div className="align-center">
      <h2 className="fw-600">Membership Level</h2>
      <p>Please Indicate the class of membership for which you are applying</p>
      <h3 className="fw-600">What is your intended Membership Level?</h3>
      <Select
        label={membershipLevel.label}
        name={membershipLevel.name}
        options={membership_levels}
      />
      <MembershipFeeTable />
      </div>
    </>
  );
};

export default MembershipLevel
