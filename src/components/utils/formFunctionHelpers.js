// this func might not needed
export function generateSelectMatch(data, stateOrCountry) {

  var tempState;
  var tempCountry;

  if (data.provinceOrState && data.province_state_id) {
    tempState.id = data.province_state_id;
    tempState.name = data.provinceOrState;
  }

  if (data.country && data.country_id) {
    tempCountry.id = data.country_id;
    tempCountry.name = data.country;
  }

  if (stateOrCountry === "state") {
    return {
      value: tempState?.id || "",
      label: tempState?.name || ""
    }
  }

  if (stateOrCountry === "country") {
    return {
      value: tempCountry?.id || "",
      label: tempCountry?.name || ""
    }
  }
}

// Transform data from backend to match my form model

export function matchCompanyFields(existingOrganizationData) {

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
        provinceOrState: {
          value: existingOrganizationData?.address.province_state_id || "",
          label: existingOrganizationData?.address.province_state || ""
        } || "",
        country: {
          value: existingOrganizationData?.address.country_id || "",
          label: existingOrganizationData?.address.country || ""
        } || "",
        postalCode: existingOrganizationData?.address.postal_code || "",
      },
      twitterHandle: existingOrganizationData?.twitterHandle || "",  
    }
  }

}

export function matchContactFields(existingContactData) {

  let existingCompanyContact = existingContactData.find(el => el.type === "company")
  let existingMarketingContact = existingContactData.find(el => el.type === "marketing")
  let existingAccoutingContact = existingContactData.find(el => el.type === "accounting")
  return {
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
    }
  }

}

export function matchWorkingGroupFields(existingMembershipData) {
  // return {
  //   workingGroup: {
  //     value: existingMembershipData?.working_group || "",
  //     label: existingMembershipData?.working_group_name || "",
  //     participation_levels: [existingMembershipData?.participation_levels] || ""
  //   } || "",
  //   participationLevel: existingMembershipData.participation_level || "",
  //   effectiveDate: existingMembershipData.effective_date || "",
  //   workingGroupRepresentative: {
  //     firstName: "",
  //     lastName: "",
  //     jobtitle: "",
  //     email: ""
  //   }
  // }

  return {
    workingGroup: {
      value: "ascii_doc" || "",
      label: "AsciiDoc" || "",
      participation_levels: ["AsciiDoc_level_a", "AsciiDoc_level_b", "AsciiDoc_level_c"] || ""
    } || "",
    participationLevel: "AsciiDoc_level_a" || "",
    effectiveDate: existingMembershipData.effective_date || "",
    workingGroupRepresentative: {
      firstName: "test",
      lastName: "test_2",
      jobtitle: "test_job",
      email: "test@test.com"
    }
  }
}

// Transform data from my form model to POST for backend

export function matchCompanyFieldsToBackend(formData) {

  return {
  }

}

export function matchContactFieldsToBackend(formData) {

  return {
  }

}

// post function
export function defineDataBodyAndEndpoint(step, formData) {

  switch(step) {
    case 1:
      return {
        // endpoint: 'organizations',
        // dataBody: formData.organization,

        // organization: formData.organization,
        // contacts: [formData.companyRepresentative.representative, formData.companyRepresentative.marketingRepresentative, formData.companyRepresentative.accounting]
      }

    case 2:
      return {
        endpoint: 'membership',
        dataBody: formData.membershipLevel
      }

    case 3:
      return {
        endpoint: 'membership',
        dataBody: formData.workingGroups
      }

    case 4:
      return {
        endpoint: 'contacts',
        dataBody: formData.signingAuthorityRepresentative
      }

    default:
      return;
  }
}

export async function sendData(endpoint, formId, dataBody, callback) {
  fetch(`${endpoint}/${formId}`, {
    method: 'POST',
    body: dataBody
  }).then( res => {
    if(res.status === '200' && callback) {
      callback();
    } else {
      console.log("error:" + {res})
    }
  })
}