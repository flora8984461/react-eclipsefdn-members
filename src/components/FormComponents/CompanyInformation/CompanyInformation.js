import React, { useContext, useEffect, useState } from 'react';
import MembershipContext from '../../../Context/MembershipContext';
import { matchCompanyFields, matchContactFields } from '../../../Utils/formFunctionHelpers';
import Company from './Company';
import Contacts from './Contacts';
import Loading from '../../Loading/Loading';
import { end_point, api_prefix_form, FETCH_HEADER, newForm_tempId } from '../../../Constants/Constants';

const CompanyInformation = ({ formField, ...otherProps }) => {
  const { organizationName, organizationAddress, organizationId } = formField;
  const {currentFormId} = useContext(MembershipContext);
  const formValues = otherProps.parentState.formik.values;
  const [ loading, setLoading ] = useState(true);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

    if (currentFormId && currentFormId !== newForm_tempId) {
      let pool = [
        fetch(api_prefix_form + `/${currentFormId}/` + end_point.organizations, { headers : FETCH_HEADER }), 
        fetch(api_prefix_form + `/${currentFormId}/` + end_point.contacts, { headers : FETCH_HEADER })
      ]
  
      Promise.all(pool)
        .then((res) => 
          Promise.all(res.map(r => r.json()))
        )
        .then(([organizations, contacts]) => {
          // Matching the field data
          if (organizations[0]) {
            let tempOrg = matchCompanyFields(organizations[0])
            otherProps.parentState.formik.setFieldValue(organizationName.name, tempOrg.organization.legalName)
            otherProps.parentState.formik.setFieldValue(organizationAddress.address.name, tempOrg.organization.address)
            // Store Organization_Id for my PUT later
            otherProps.parentState.formik.setFieldValue(organizationId.name, tempOrg.organization.id)
          }
          if(contacts.length) {
            let tempContacts = matchContactFields(contacts)
            // Prefill Data
            otherProps.parentState.formik.setFieldValue('companyRepresentative', tempContacts.companyRepresentative)
          }
          setLoading(false);
        })
    }
    else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <h2 className="fw-600">Company Information</h2>
      <p>Please complete your company information below. This should be the legal name and address of your organization.</p>
      <div className="align-center">
        <Company />
        <Contacts formValues={formValues} formField={formField} />
      </div>
    </>
  );
};

export default CompanyInformation
