export const initialValues = {

  // Step1: company Info
  organization: {
    id: "",
    legalName: "",
    address: {
      street: "",
      city: "",
      provinceOrState: "",
      country: "",
      postalCode: ""
    },
    twitterHandle: "",
  },

  // Step1: Company Representative
  companyRepresentative: {
    representative: {
      id: "",
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    },

    marketingRepresentative: {
      sameAsCompany: false,
      id: "",
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    },

    accounting: {
      sameAsCompany: false,
      id: "",
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    }
  },

  // Step 2
  membershipLevel: "",

  // Step 3: working groups
  workingGroups: [
    {
      id: "",
      workingGroup: "",
      participationLevel: "",
      effectiveDate: "",
      workingGroupRepresentative: {
        firstName: "",
        lastName: "",
        jobtitle: "",
        email: "",
        id: ""
      }
    }
  ],

  signingAuthorityRepresentative: {
    firstName: "",
    lastName: "",
    email: "",
    id: ""
  }

}

const firstName = "First Name"
const lastName = "Last Name"
const email = "Email Address"
const orgName = "Organization Name"
const jobtitle = "Job Title"
export const requiredErrorMsg = "is required"

export const formField = {
  organizationName: {
    name: 'organization.name',
    label: orgName,
    placeholder: orgName,
    requiredErrorMsg: requiredErrorMsg
  },
  organizationAddress: [
    {
      name: 'organization.address.street',
      label: 'Street',
      placeholder: "Street",
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'organization.address.city',
      label: 'City',
      placeholder: "City",
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'organization.address.provinceOrState',
      label: 'Province or State',
      placeholder: "Province or State",
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'organization.address.country',
      label: 'Country',
      placeholder: "Country",
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'organization.address.postalCode',
      label: 'PostalCode',
      placeholder: "PostalCode",
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'PostalCode is not valid (e.g. K1N 6N5)'
    }
  ],
  companyTwitter: {
    name: 'organization.twitterHandle',
    label: 'Twitter',
    placeholder: "Twitter",
  },
  companyRepresentative: [
    {
      name: 'companyRepresentative.representative.firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.representative.lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.representative.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.representative.email',
      label: email,
      placeholder: email,
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'email format is incorrect'
    }
  ],
  marketingRepresentative: [
    {
      name: 'companyRepresentative.marketingRepresentative.firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.marketingRepresentative.lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.marketingRepresentative.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.marketingRepresentative.email',
      label: email,
      placeholder: email,
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'email format is incorrect'
    }
  ],
  accounting: [
    {
      name: 'companyRepresentative.accounting.firstName',
      label: firstName,
      placeholder: firstName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.accounting.lastName',
      label: lastName,
      placeholder: lastName,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.accounting.jobtitle',
      label: jobtitle,
      placeholder: jobtitle,
      requiredErrorMsg: requiredErrorMsg
    },
    {
      name: 'companyRepresentative.accounting.email',
      label: email,
      placeholder: email,
      requiredErrorMsg: requiredErrorMsg,
      invalidErrorMsg: 'email format is incorrect'
    }
  ],
  membershipLevel: {
    name: 'membershipLevel',
    label: 'Membership Level',
    requiredErrorMsg: requiredErrorMsg
  },
  workingGroup: {
    name: 'workingGroup',
    label: 'Working Group',
    requiredErrorMsg: requiredErrorMsg,
  },
  participationLevel: {
    name: 'participationLevel',
    label: 'Participation Level',
  },
  effectiveDate: {
    name: "effectiveDate",
    label: 'Effective Date',
    requiredErrorMsg: requiredErrorMsg,
  },

  workingGroupRepresentative: [
    {
      name: "firstName",
      label: firstName,
      placeholder: firstName,
    },
    {
      name: "lastName",
      label: lastName,
      placeholder: lastName,
    },
    {
      name: "jobtitle",
      label: jobtitle,
      placeholder: jobtitle,
    },
    {
      name: "email",
      label: email,
      placeholder: email,
    }
  ],

  signingAuthorityRepresentative: [
    {
      name: "signingAuthorityRepresentative.firstName",
      label: firstName,
      placeholder: firstName,
    },
    {
      name: "signingAuthorityRepresentative.lastName",
      label: lastName,
      placeholder: lastName,
    },
    {
      name: "signingAuthorityRepresentative.email",
      label: email,
      placeholder: email,
    }
  ]
}