// === probably to be deleted
export const initialValues = {

  // Step1: company Info
  organization: {
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
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    },

    marketingRepresentative: {
      firstName: "",
      lastName: "",
      jobtitle: "",
      email: ""
    },

    accounting: {
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
      workingGroup: "",
      participationLevel: "",
      effectiveDate: "",
      workingGroupRepresentative: {
        firstName: "",
        lastName: "",
        jobtitle: "",
        email: ""
      }
    }
  ],

  signingAuthority: "",

  signingAuthorityRepresentative: {
    firstName: "",
    lastName: "",
    email: ""
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
  signingAuthority: {
    name: "signingAuthority",
    label: "signing Authority",
  },
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

// ===
export function defineExistingInitialValues_II(existingOrganizationData, existingContactData, existingMembershipData) {

  let existingCompanyContact = existingContactData.find(el => el.type === "company")
  let existingMarketingContact = existingContactData.find(el => el.type === "marketing")
  let existingAccoutingContact = existingContactData.find(el => el.type === "accounting")
  //let existingWGContact = existingContactData.find(el => el.type === "working_group")

  return {
  // Step1: company Info
  organization: {
    legalName: {
      value: existingOrganizationData?.legal_name || "",
      label: existingOrganizationData?.legal_name || "",
      address: existingOrganizationData?.address || "",
      twitterHandle: existingOrganizationData?.twitterHandle || ""
    } || "",
    address: {
      street: existingOrganizationData?.address.street || "",
      city: existingOrganizationData?.address.city || "",
      provinceOrState: existingOrganizationData?.address.province_state || "",
      country: existingOrganizationData?.address.country || "",
      postalCode: existingOrganizationData?.address.postal_code || "",
    },
    twitterHandle: existingOrganizationData?.twitterHandle || "",  
  },

  // Step1: Company Representative
  companyRepresentative: {
    representative: {
      firstName: existingCompanyContact?.first_name || "",
      lastName: existingCompanyContact?.last_name || "",
      jobtitle: existingCompanyContact?.title || "",
      email: existingCompanyContact?.email || ""
    },

    marketingRepresentative: {
      firstName: existingMarketingContact?.first_name || "",
      lastName: existingMarketingContact?.last_name || "",
      jobtitle: existingMarketingContact?.title || "",
      email: existingMarketingContact?.email || ""
    },

    accounting: {
      firstName: existingAccoutingContact?.first_name || "",
      lastName: existingAccoutingContact?.last_name || "",
      jobtitle: existingAccoutingContact?.title || "",
      email: existingAccoutingContact?.email || ""
    }
  },

  // Step 2
  membershipLevel: existingMembershipData?.membership_level || "",

  // Step 3: working groups
  workingGroups: [
    {
      workingGroup: "",
      participationLevel: "",
      effectiveDate: "",
      workingGroupRepresentative: {
        firstName: "",
        lastName: "",
        jobtitle: "",
        email: ""
      }
    }
  ],

  signingAuthority: "",

  signingAuthorityRepresentative: {
    firstName: "",
    lastName: "",
    email: ""
  }
  }
}