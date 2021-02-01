import React from 'react';

const Preview = (previewData) => {

  const data = previewData.previewData

  //Check if has signing auth, if has, hide the signing auth info, and remove the info if has when submitting

  console.log(data)

  return (
    <>
      <h2 className="fw-600">Review and Submit your Completed Application</h2>
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      <p>Please click <strong>submit</strong> when ready.</p>
      <div className="margin-top-30">
        <h3 className="fw-600">Company Information</h3>
        <div className="row">
          <div className="col-md-16"><div className="margin-top-25 fake-input">{data.organization.legalName.value}</div></div>
          <div className="col-md-8"><label>twitter</label><div className="fake-input">{data.organization.twitterHandle}</div></div>
        </div>

        <h4 className="fw-600">Address</h4>
        <div className="row margin-bottom-10">
          <div className="col-md-8"><label>Street</label><div className="fake-input">{data.organization.address.street}</div></div>
          <div className="col-md-4"><label>City</label><div className="fake-input">{data.organization.address.city}</div></div>
          <div className="col-md-4"><label>province/State</label><div className="fake-input">{data.organization.address.provinceOrState.label}</div></div>
          <div className="col-md-4"><label>Country</label><div className="fake-input">{data.organization.address.country.label}</div></div>
          <div className="col-md-4"><label>PostalCode</label><div className="fake-input">{data.organization.address.postalCode}</div></div>
        </div>

        <h3 className="fw-600">Company Representative Contact</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-6"><label>First Name</label><div className="fake-input">{data.companyRepresentative.representative.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="fake-input">{data.companyRepresentative.representative.lastName}</div></div>
          <div className="col-md-6"><label>Job Title</label><div className="fake-input">{data.companyRepresentative.representative.jobtitle}</div></div>
          <div className="col-md-6"><label>Email</label><div className="fake-input">{data.companyRepresentative.representative.email}</div></div>
        </div>

        <h3 className="fw-600">Company Marketing Contact</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-6"><label>First Name</label><div className="fake-input">{data.companyRepresentative.marketingRepresentative.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="fake-input">{data.companyRepresentative.marketingRepresentative.lastName}</div></div>
          <div className="col-md-6"><label>Job Title</label><div className="fake-input">{data.companyRepresentative.marketingRepresentative.jobtitle}</div></div>
          <div className="col-md-6"><label>Email</label><div className="fake-input">{data.companyRepresentative.marketingRepresentative.email}</div></div>
        </div>

        <h3 className="fw-600">Company Accounting Contact</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-6"><label>First Name</label><div className="fake-input">{data.companyRepresentative.accounting.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="fake-input">{data.companyRepresentative.accounting.lastName}</div></div>
          <div className="col-md-6"><label>Job Title</label><div className="fake-input">{data.companyRepresentative.accounting.jobtitle}</div></div>
          <div className="col-md-6"><label>Email</label><div className="fake-input">{data.companyRepresentative.accounting.email}</div></div>
        </div>

        <h3 className="fw-600">Intended Membership Level</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-10"><div className="fake-input">{data.membershipLevel}</div></div>
        </div>

        <h3 className="fw-600">Working Group to Join</h3>
        {
          data.workingGroups.map(el => (
            <>
            <div key={el.workingGroup.label} className="row margin-bottom-10">
              <div className="col-md-8"><label>Working group</label><div className="fake-input">{el.workingGroup.label}</div></div>
              <div className="col-md-8"><label>Intended Participation Level</label><div className="fake-input">{el.participationLevel}</div></div>
              <div className="col-md-8"><label>Effective Date</label><div className="fake-input">{new Date(el.effectiveDate).toDateString()}</div></div>

              <h4 className="fw-600 margin-left-15 margin-top-25">The working Group Representative</h4>
              <div className="col-md-6"><label>First Name</label><div className="fake-input">{el.workingGroupRepresentative.firstName}</div></div>
              <div className="col-md-6"><label>Last Name</label><div className="fake-input">{el.workingGroupRepresentative.lastName}</div></div>
              <div className="col-md-6"><label>Job Title</label><div className="fake-input">{el.workingGroupRepresentative.jobtitle}</div></div>
              <div className="col-md-6"><label>Job Title</label><div className="fake-input">{el.workingGroupRepresentative.email}</div></div>
            </div>
            </>
          ))
        }

        <h3 className="fw-600">Signing Authority</h3>
        <div className="row margin-bottom-10">
          <div className="col-md-6"><label>First Name</label><div className="fake-input">{data.signingAuthorityRepresentative.firstName}</div></div>
          <div className="col-md-6"><label>Last Name</label><div className="fake-input">{data.signingAuthorityRepresentative.lastName}</div></div>
          <div className="col-md-12"><label>Email</label><div className="fake-input">{data.signingAuthorityRepresentative.email}</div></div>
        </div>

      </div>

      {/* <pre>
      { JSON.stringify(data, null, 2) }
      </pre> */}
    </>
  );
};

export default Preview