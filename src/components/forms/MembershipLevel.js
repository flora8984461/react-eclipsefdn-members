import React from "react";
import Select from './Inputs/Select';
import MembershipFeeTable from './MembershipFeeTable';

const MembershipLevel = ({ formField }) => {

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
