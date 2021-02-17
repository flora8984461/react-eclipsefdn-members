import React, { useContext, useEffect, useState } from 'react';
import Select from '../Inputs/Select';
import MembershipFeeTable from './MembershipFeeTable';
import MembershipContext from '../../../Context/MembershipContext';
import Loading from '../../Loading/Loading';
import { FETCH_HEADER, membership_levels } from '../../../Constants/Constants';

const MembershipLevel = ({ formField, ...otherProps }) => {

  const { currentFormId } = useContext(MembershipContext);

  const [ loading, setLoading ] = useState(true);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

    if (currentFormId && currentFormId !== 'new') {
      fetch(`membership_data/${currentFormId}/membership.json`,{ headers : FETCH_HEADER })
      // fetch('http://localhost:8090/membership',{ headers : FETCH_HEADER })
      .then(resp => resp.json())
      .then(data => {
        if(data) {
          otherProps.parentState.formik.setFieldValue('membershipLevel', data.membership_level);
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
        label="membershipLevel"
        name="membershipLevel"
        options={membership_levels}
      />
      <MembershipFeeTable />
      </div>
    </>
  );
};

export default MembershipLevel
