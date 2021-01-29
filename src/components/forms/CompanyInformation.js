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

  return (
    <>
      <h2 className="fw-600">Company Information</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <div className="">
      <h4 className="fw-600"> Organization * </h4>
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
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <div className="row">
      { companyRepresentative.map(el => 
          <div key={el.name} className="col-md-12">
            <Input name={el.name} labelName={el.label} placeholder={el.placeholder} />
          </div>
      ) }
      </div> 

      <h4 className="fw-600">Company Marketing Representative</h4>
      <label className="verical-center margin-top-20 margin-bottom-20"><input name="same-as-company-rep" type="checkbox" checked={mktSame} onChange={toggleMKTRepreContacts} /><span>Same as Company Rep.</span></label>
      <div className="row">
      { marketingRepresentative.map(el => 
          <div key={el.name} className="col-md-12">
            <Input name={el.name} labelName={el.label} placeholder={el.placeholder} disableInput={mktSame} />
          </div>
      ) }
      </div>

      <h4 className="fw-600">Company Accounting Representative</h4>
      <label className="verical-center margin-top-20 margin-bottom-20"><input name="same-as-company-rep" type="checkbox" checked={accSame} onChange={toggleACCRepreContacts} /><span>Same as Company Rep.</span></label>
      <div className="row">
      { accounting.map(el => 
          <div key={el.name} className="col-md-12">
            <Input name={el.name} labelName={el.label} placeholder={el.placeholder} disableInput={accSame} />
          </div>
      ) }
      </div>

      </div>
    </>
  );
};

export default CompanyInformation
