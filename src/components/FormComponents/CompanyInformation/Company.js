import React, { useContext } from 'react';
import CustomSelectWrapper from '../Inputs/CustomSelect/CustomSelectWrapper';
import CountrySelect from '../Inputs/CustomSelect/CountrySelect';
import CustomAsyncSelect from '../Inputs/CustomSelect/CustomAsyncSelect';
import MembershipContext from '../../../Context/MembershipContext';
import Input from '../Inputs/Input';

const Company = () => {
    const { isExistingMember } = useContext(MembershipContext)

    return (
    <>
      <h4 className="fw-600"> Organization <span className="orange-star">*</span> </h4>
      <CustomSelectWrapper
        name="organization.legalName"
        srcData="companies"
        isExistingMember={isExistingMember}
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

    </>
    )
}

export default Company