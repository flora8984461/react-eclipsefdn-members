import React, { useContext, useEffect } from "react";
import CustomSelectWrapper from "./Inputs/CustomSelect/CustomSelectWrapper";
// import StatesSelect from "./Inputs/CustomSelect/StatesSelect";
import CountrySelect from "./Inputs/CustomSelect/CountrySelect";
import CustomAsyncSelect from "./Inputs/CustomSelect/CustomAsyncSelect";
import MembershipContext from "../MembershipContext";
import Input from './Inputs/Input';
import { matchCompanyFields, matchContactFields } from '../utils/formFunctionHelpers';

const CompanyInformation = ({ formField, mktSame, setMktSame, accSame, setAccSame, ...otherProps }) => {
  
  const {currentFormId} = useContext(MembershipContext);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {

    if (currentFormId) {
      let pool = [fetch('membership_data/organizations.json',{
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }}), fetch('membership_data/contacts.json',{
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})]
  
      Promise.all(pool)
        .then((res) => 
          Promise.all(res.map(r => r.json()))
        )
        .then(([organizations, contacts]) => {
          // Matching the field data
          let existingOrgData = organizations.find(item => item.form_id === currentFormId)
          let existingContactsData = contacts.filter(item => item.form_id === currentFormId)
          if (existingOrgData) {
            let tempOrg = matchCompanyFields(existingOrgData)
            otherProps.parentState.formik.setFieldValue('organization.legalName', tempOrg.organization.legalName)
            otherProps.parentState.formik.setFieldValue('organization.address', tempOrg.organization.address)
            // Store Organization_Id for my PUT later
            otherProps.parentState.formik.setFieldValue('organization.id', tempOrg.organization.id)
          }
          if(existingContactsData) {
            let tempContacts = matchContactFields(existingContactsData)
            // Prefill Data
            otherProps.parentState.formik.setFieldValue('companyRepresentative.representative', tempContacts.companyRepresentative.representative)
            // Store contact_id for my PUT later
            otherProps.parentState.formik.setFieldValue('companyRepresentative.representative.id', tempContacts.companyRepresentative.representative.id)
          }
        })
    }
    // eslint-disable-next-line
  }, [])

  const { companyRepresentative, marketingRepresentative, accounting } = formField

  const { isExistingMember, organiazationData } = useContext(MembershipContext)

  const toggleMKTRepreContacts = () => {
    setMktSame(!mktSame)
  }

  const toggleACCRepreContacts = () => {
    setAccSame(!accSame)
  }

  const generateContacts = (representatives, prefix, disableInput) => {

    return (
      <>
      { representatives.map((el, index) => 
        <div key={prefix + index} className="col-md-12">
          <Input name={el.name} labelName={el.label} placeholder={el.placeholder} disableInput={disableInput} />
        </div>
      ) }
    </>
    )
  }

  return (
    <>
      <h2 className="fw-600">Company Information</h2>
      <p>Please complete your company information below. This should be the legal name and address of your organization. Committer members do not need to provide this information unless it differs from the information provided with their Individual Committer Agreement.</p>

      <div className="align-center">
      <h4 className="fw-600"> Organization <span className="orange-star">*</span> </h4>
      <CustomSelectWrapper
        name="organization.legalName"
        srcData="companies"
        isExistingMember={isExistingMember}
        organiazationData={organiazationData}
        renderComponent={CustomAsyncSelect}
      />
      <div className="row">
        <div className="col-md-8">
          <Input name="organization.twitterHandle" labelName="Twitter" placeholder="Twitter" />
        </div>
      </div>

      <h4 className="fw-600">Address</h4>
      <div className="row">
      <div className="col-md-16">
        <Input name="organization.address.street" labelName="Street" placeholder="Street" />
      </div>
      <div className="col-md-8">
        <Input name="organization.address.city" labelName="City" placeholder="City" />
      </div>
      </div>

      <div className="row margin-bottom-40">
        <div className="col-md-8">
          <label htmlFor="organization.address.country">Country</label>
          <CustomSelectWrapper
            name="organization.address.country"
            srcData="country"
            isExistingMember={isExistingMember}
            organiazationData={organiazationData}
            renderComponent={CountrySelect}
          />
        </div>
        <div className="col-md-8">
          <Input name="organization.address.provinceOrState" labelName="Province or State" placeholder="Province or State" />
        </div>
        <div className="col-md-8">
          <Input name="organization.address.postalCode" labelName="Postal Code" placeholder="Postal Code" />
        </div>
      </div>

      <h4 className="fw-600">Company Representative Contact</h4>
      <p>Please indicate the primary point of contact between your organization and the Eclipse Foundation. As per the Eclipse Bylaws, the Member Representative shall represent your organization in the General Assembly, have the right to cast any votes on behalf of your organization, and shall have the authority to update information provided to Eclipse Foundation.</p>
      <p>All formal communications from the Eclipse Foundation will be sent to the Member Representative.</p>
      <div className="row">
        { generateContacts(companyRepresentative, 'companyRepresentative-', false) }
      </div> 

      <h4 className="fw-600">Company Marketing Representative</h4>
      <label className="verical-center margin-top-20 margin-bottom-20"><input name="same-as-company-rep" type="checkbox" checked={mktSame} onChange={toggleMKTRepreContacts} /><span>Same as Company Rep.</span></label>
      <div className="row">
        { mktSame && generateContacts(companyRepresentative, 'marketingRepresentative-', mktSame) }
        { !mktSame && generateContacts(marketingRepresentative, 'marketingRepresentative-', mktSame) }
      </div>

      <h4 className="fw-600">Company Accounting Representative</h4>
      <label className="verical-center margin-top-20 margin-bottom-20"><input name="same-as-company-rep" type="checkbox" checked={accSame} onChange={toggleACCRepreContacts} /><span>Same as Company Rep.</span></label>
      <div className="row">
        { accSame && generateContacts(companyRepresentative, 'accounting-', accSame) }
        { !accSame && generateContacts(accounting, 'accounting-', accSame) }
      </div>

      </div>
    </>
  );
};

export default CompanyInformation
