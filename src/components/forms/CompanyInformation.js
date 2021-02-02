import React, { useContext } from "react";
import CustomSelectWrapper from "./Inputs/CustomSelect/CustomSelectWrapper";
import StatesSelect from "./Inputs/CustomSelect/StatesSelect";
import CountrySelect from "./Inputs/CustomSelect/CountrySelect";
import CustomAsyncSelect from "./Inputs/CustomSelect/CustomAsyncSelect";
import MembershipContext from "../MembershipContext";
import Input from './Inputs/Input';

const CompanyInformation = ({ formField, label, skipped, mktSame, setMktSame, accSame, setAccSame, disableInput, setDisableInput }) => {

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
        setDisableInput={setDisableInput}
        organiazationData={organiazationData}
        renderComponent={CustomAsyncSelect}
      />
      <div className="row">
        <div className="col-md-8">
          <Input name="organization.twitterHandle" labelName="Twitter" placeholder="Twitter" disableInput={disableInput} />
        </div>
      </div>

      <h4 className="fw-600">Address</h4>
      <div className="row">
      <div className="col-md-16">
        <Input name="organization.address.street" labelName="Street" placeholder="Street" disableInput={disableInput} />
      </div>
      <div className="col-md-8">
        <Input name="organization.address.city" labelName="City" placeholder="City" disableInput={disableInput} />
      </div>
      </div>

      <div className="row margin-bottom-40">
        <div className="col-md-8">
          <label htmlFor="organization.address.country">Country</label>
          <CustomSelectWrapper
            name="organization.address.country"
            srcData="country"
            isExistingMember={isExistingMember}
            setDisableInput={setDisableInput}
            organiazationData={organiazationData}
            renderComponent={CountrySelect}
          />
        </div>
        <div className="col-md-8">
          <label htmlFor="organization.address.provinceOrState">Province / State</label>
          <CustomSelectWrapper
            name="organization.address.provinceOrState"
            srcData="provinceOrState"
            isExistingMember={isExistingMember}
            setDisableInput={setDisableInput}
            organiazationData={organiazationData}
            renderComponent={StatesSelect}
          />
        </div>
        <div className="col-md-8">
          <Input name="organization.address.postalCode" labelName="Postal Code" placeholder="Postal Code" disableInput={disableInput} />
        </div>
      </div>

      {/* {
        disableInput ? 
        <>
          <Input name="organization.address.provinceOrState" labelName="Province Or State" placeholder="province Or State" disableInput={disableInput} />
          <Input name="organization.address.country" labelName="Country" placeholder="Country" disableInput={disableInput} />
        </>
        : 
        <>
          <label htmlFor="organization.address.provinceOrState">Province / State</label>
          <CustomSelectWrapper
            name="organization.address.provinceOrState"
            srcData="provinceOrState"
            isExistingMember={isExistingMember}
            setDisableInput={setDisableInput}
            organiazationData={organiazationData}
            renderComponent={StatesSelect}
          />
          <label htmlFor="organization.address.country">Country</label>
          <CustomSelectWrapper
            name="organization.address.country"
            srcData="country"
            isExistingMember={isExistingMember}
            setDisableInput={setDisableInput}
            organiazationData={organiazationData}
            renderComponent={CountrySelect}
          />
        </>
      } */}

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
