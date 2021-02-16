import React, { useContext, useEffect, useState } from "react";
import Select from '../Inputs/Select';
import MembershipFeeTable from './MembershipFeeTable';
import MembershipContext from "../../../Context/MembershipContext";
import Loading from '../../Loading/Loading';

const MembershipLevel = ({ formField, ...otherProps }) => {

  const { currentFormId } = useContext(MembershipContext);

  const [ loading, setLoading ] = useState(true);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

    if (currentFormId) {
      fetch(`membership_data/${currentFormId}/membership.json`,{
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
      .then(resp => resp.json())
      .then(data => {
        if(data) {
          otherProps.parentState.formik.setFieldValue('membershipLevel', data.membership_level);
        }
        setLoading(false);
      })
    }

    // eslint-disable-next-line
  }, [])
  
  if (loading) {
    return <Loading />
  }

  const dropdownOptions = [
    { name: 'Select a level', value: '' },
    { name: 'Strategic Members', value: 'strategic' },
    { name: 'Contributing Members (formerly referred to as Solutions Members)', value: 'contributing' },
    { name: 'Associate Members', value: 'associate' },
    { name: 'Committer Members', value: 'committer' }
  ]

  return (
    <>
    <div className="align-center">
      <h2 className="fw-600">Membership Level</h2>
      <p>Please Indicate the class of membership for which you are applying</p>
      <h3 className="fw-600">What is your intended Membership Level?</h3>
      <Select
        label="membershipLevel"
        name="membershipLevel"
        options={dropdownOptions}
      />
      <MembershipFeeTable />
      </div>
    </>
  );
};

export default MembershipLevel
