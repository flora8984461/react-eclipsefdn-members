// this func might not needed
// export function generateSelectMatch(data, stateOrCountry) {

//   var tempState;
//   var tempCountry;

//   if (data.provinceOrState && data.province_state_id) {
//     tempState.id = data.province_state_id;
//     tempState.name = data.provinceOrState;
//   }

//   if (data.country && data.country_id) {
//     tempCountry.id = data.country_id;
//     tempCountry.name = data.country;
//   }

//   if (stateOrCountry === "state") {
//     return {
//       value: tempState?.id || "",
//       label: tempState?.name || ""
//     }
//   }

//   if (stateOrCountry === "country") {
//     return {
//       value: tempCountry?.id || "",
//       label: tempCountry?.name || ""
//     }
//   }
// }


///////////////////////////////////////////////////////////
//== Transform data from backend to match my form model

export function matchCompanyFields(existingOrganizationData) {

  return {
    // Step1: company Info
    organization: {
      id: existingOrganizationData?.id || "",
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
        id: existingCompanyContact?.id || "",
        firstName: existingCompanyContact?.first_name || "",
        lastName: existingCompanyContact?.last_name || "",
        jobtitle: existingCompanyContact?.title || "",
        email: existingCompanyContact?.email || ""
      },
  
      marketingRepresentative: {
        id: existingMarketingContact?.id || "",
        firstName: existingMarketingContact?.first_name || "",
        lastName: existingMarketingContact?.last_name || "",
        jobtitle: existingMarketingContact?.title || "",
        email: existingMarketingContact?.email || ""
      },
  
      accounting: {
        id: existingAccoutingContact?.id || "",
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
    id: "test_wg_id",
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
      email: "test@test.com",
      id: "test_wg_rep_id"
    }
  }
}

///////////////////////////////////////////////////////////
//== Transform data from my form model to POST for backend
export function matchCompanyFieldsToBackend(organizationData, formId) {

  console.log(organizationData)

  return {
    address: {
      city: organizationData.address.city,
      country: organizationData.address.country.label, // or should be value? to be decide
      postal_code: organizationData.address.postalCode,
      province_state: organizationData.address.provinceOrState.label, // or should be value? to be decide
      street: organizationData.address.street
    },
  form_id: formId,
  id: organizationData.id,
  legal_name: organizationData.legalName.label
  }
}

export function matchMembershipLevelFieldsToBackend(membershipLevel, formId, userId) {

  return {
    id: formId,
    user_id: userId,
    membership_level: membershipLevel
  }

}

export function matchContactFieldsToBackend(contactData, contactType, formId) {

  return {
    id: contactData.id,
    form_id: formId,
    first_name: contactData.firstName,
    last_name: contactData.lastName,
    job_title: contactData.jobtitle,
    email: contactData.email,
    type: contactType
  }

}

export function matchWGFieldsToBackend(eachWorkingGroupData, formId) {

  var wg_contact = matchContactFieldsToBackend(eachWorkingGroupData.workingGroupRepresentative, "workingGroup", formId);

  return {
    id: eachWorkingGroupData.id,
    working_group: eachWorkingGroupData.workingGroup,
    participation_level: eachWorkingGroupData.participationLevel,
    effective_date: eachWorkingGroupData.effectiveDate,
    contact: {
      ...wg_contact
    }
  }
}

// post function
export async function executeSendDataByStep(step, formData, formId, userId) {

  switch(step) {
    case 1:
      sendData('organizations', matchCompanyFieldsToBackend(formData.organization, formId))
      sendData("contacts", matchContactFieldsToBackend(formData.companyRepresentative.representative, 'company', formId))
      sendData('contacts', matchContactFieldsToBackend(formData.companyRepresentative.marketingRepresentative, 'marketing', formId))
      sendData('contacts', matchContactFieldsToBackend(formData.companyRepresentative.accounting, 'accounting', formId))
      break;

    case 2:
      sendData('form', matchMembershipLevelFieldsToBackend(formData.membershipLevel, formId, userId))
      break;

    case 3:
      formData.workingGroups.forEach(item => {
        sendData(`form/${formId}/working_groups`, matchWGFieldsToBackend(item, formId))
      });
      break;

    case 4:
      return;

    default:
      return;
  }
}

export function sendData(endpoint, dataBody) {
  // fetch(`${endpoint}/${formId}`, {
  //   method: 'PUT',
  //   body: dataBody
  // }).then( res => {
  //   if(res.status === '200' && callback) {
  //     callback();
  //   } else {
  //     console.log("error:" + {res})
  //   }
  // })

  console.log("You send request to: " + endpoint + "; and with the entityId: " + dataBody.id)
  console.log("You data body is: " + JSON.stringify(dataBody))

}