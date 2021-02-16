import React from 'react';
import { useFormikContext } from 'formik'

const Preview = () => {

  const { values } = useFormikContext()

  console.log(values)

  //Check if has signing auth, if has, hide the signing auth info, and remove the info if has when submitting

  return (
    <>
      <h2 className="fw-600">Review and Submit your Completed Application</h2>
      <p> Please review your completed Membership Application Form. If you would like to make changes to the information, please click the back button.</p>
      <p>Please click <strong>submit</strong> when ready.</p>
      <div className="margin-top-30">
        <h3 className="fw-600">Company Information</h3>
        <div className="row">
          <div className="col-md-16"><div className="margin-top-25 preview-field">{values.organization.legalName.label}</div></div>
          <div className="col-md-8"><label>twitter</label><div className="preview-field">{values.organization.twitterHandle}</div></div>
        </div>

        <h4 className="fw-600">Address</h4>
        <div className="row margin-bottom-10">
          <div className="col-md-8"><label>Street</label><div className="preview-field">{values.organization.address.street}</div></div>
          <div className="col-md-4"><label>City</label><div className="preview-field">{values.organization.address.city}</div></div>
          <div className="col-md-4"><label>province/State</label><div className="preview-field">{values.organization.address.provinceOrState}</div></div>
          <div className="col-md-4"><label>Country</label><div className="preview-field">{values.organization.address.country}</div></div>
          <div className="col-md-4"><label>PostalCode</label><div className="preview-field">{values.organization.address.postalCode}</div></div>
        </div>

        <h3 className="fw-600">Company Representative Contact</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-6"><label>First Name</label><div className="preview-field">{values.companyRepresentative.representative.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="preview-field">{values.companyRepresentative.representative.lastName}</div></div>
          <div className="col-md-6"><label>Job Title</label><div className="preview-field">{values.companyRepresentative.representative.jobtitle}</div></div>
          <div className="col-md-6"><label>Email</label><div className="preview-field">{values.companyRepresentative.representative.email}</div></div>
        </div>

        <h3 className="fw-600">Company Marketing Contact</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-6"><label>First Name</label><div className="preview-field">{values.companyRepresentative.marketingRepresentative.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="preview-field">{values.companyRepresentative.marketingRepresentative.lastName}</div></div>
          <div className="col-md-6"><label>Job Title</label><div className="preview-field">{values.companyRepresentative.marketingRepresentative.jobtitle}</div></div>
          <div className="col-md-6"><label>Email</label><div className="preview-field">{values.companyRepresentative.marketingRepresentative.email}</div></div>
        </div>

        <h3 className="fw-600">Company Accounting Contact</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-6"><label>First Name</label><div className="preview-field">{values.companyRepresentative.accounting.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="preview-field">{values.companyRepresentative.accounting.lastName}</div></div>
          <div className="col-md-6"><label>Job Title</label><div className="preview-field">{values.companyRepresentative.accounting.jobtitle}</div></div>
          <div className="col-md-6"><label>Email</label><div className="preview-field">{values.companyRepresentative.accounting.email}</div></div>
        </div>

        <h3 className="fw-600">Intended Membership Level</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-10"><div className="preview-field">{values.membershipLevel}</div></div>
        </div>

        <h3 className="fw-600">Working Group to Join</h3>
        {
          values.workingGroups.map((el, index) => (
            <div key={index} className="row margin-bottom-10">
              <div className="col-md-8"><label>Working group</label><div className="preview-field">{el.workingGroup}</div></div>
              <div className="col-md-8"><label>Intended Participation Level</label><div className="preview-field">{el.participationLevel}</div></div>
              <div className="col-md-8"><label>Effective Date</label><div className="preview-field">{new Date(el.effectiveDate).toLocaleDateString()}</div></div>

              <div className="col-md-24"><p className="h4 fw-600 margin-top-25">The working Group Representative</p></div>
              <div className="col-md-6"><label>First Name</label><div className="preview-field">{el.workingGroupRepresentative.firstName}</div></div>
              <div className="col-md-6"><label>Last Name</label><div className="preview-field">{el.workingGroupRepresentative.lastName}</div></div>
              <div className="col-md-6"><label>Job Title</label><div className="preview-field">{el.workingGroupRepresentative.jobtitle}</div></div>
              <div className="col-md-6"><label>Job Title</label><div className="preview-field">{el.workingGroupRepresentative.email}</div></div>
            </div>
          ))
        }

        <h3 className="fw-600">Signing Authority</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-6"><label>First Name</label><div className="preview-field">{values.signingAuthorityRepresentative.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="preview-field">{values.signingAuthorityRepresentative.lastName}</div></div>
          <div className="col-md-12"><label>Email</label><div className="preview-field">{values.signingAuthorityRepresentative.email}</div></div>
        </div>

      </div>
    </>
  );
};

export default Preview