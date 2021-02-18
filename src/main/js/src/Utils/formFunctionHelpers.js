function checkSameContact(compnayRep, otherContact) {

  if (!otherContact || !compnayRep) {
    return false;
  }

  const keyArray = Object.keys(compnayRep);

  for (let i=0; i<keyArray.length; i++) {
    if ( keyArray[i] !== 'id' && keyArray[i] !== 'type' && (compnayRep[keyArray[i]] !== otherContact[keyArray[i]]) ) {
      return false;
    }
  }

  return true;
}

export function assignContactData(currentContact, companyContact) {
  currentContact.firstName = companyContact.firstName;
  currentContact.lastName = companyContact.lastName;
  currentContact.jobtitle = companyContact.jobtitle;
  currentContact.email = companyContact.email;
}

//== Transform data from backend to match my form model
export function matchCompanyFields(existingOrganizationData, existingFormStateData) {

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
        provinceOrState: existingOrganizationData?.address.province_state || "",
        country: existingOrganizationData?.address.country || "",
        postalCode: existingOrganizationData?.address.postal_code || "",
      },
      twitterHandle: existingOrganizationData?.twitterHandle || "",  
    }
  }

}

export function matchContactFields(existingContactData, existingFormStateData) {

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
        email: existingMarketingContact?.email || "",
        sameAsCompany: checkSameContact(existingCompanyContact, existingMarketingContact)
      },
  
      accounting: {
        id: existingAccoutingContact?.id || "",
        firstName: existingAccoutingContact?.first_name || "",
        lastName: existingAccoutingContact?.last_name || "",
        jobtitle: existingAccoutingContact?.title || "",
        email: existingAccoutingContact?.email || "",
        sameAsCompany: checkSameContact(existingCompanyContact, existingAccoutingContact)
      }
    }
  }

}

export function matchWorkingGroupFields(existingMembershipData, existingFormStateData) {
  var res = [];
  // Array
  existingMembershipData.forEach((item, index) => {

    res.push(
      {
        id: item?.id || "",
        workingGroup: item?.working_group || "",
        participationLevel: item?.participation_level || "",
        effectiveDate: new Date(item?.effective_date) || "",
        workingGroupRepresentative: {
          firstName: item?.contact.first_name || "",
          lastName: item?.contact.last_name || "",
          jobtitle: item?.contact.job_title || "",
          email: item?.contact.email || "",
          id: item?.contact.id || ""
        }
      }
    )
  })

  return res;
}

//== Transform data from my form model to PUT or POST for backend
export function matchCompanyFieldsToBackend(organizationData, formId) {

  return {
    address: {
      city: organizationData.address.city,
      country: organizationData.address.country,
      postal_code: organizationData.address.postalCode,
      province_state: organizationData.address.provinceOrState,
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
    membership_level: membershipLevel,
    // signing_authority: tbd
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

  var wg_contact = matchContactFieldsToBackend(eachWorkingGroupData.workingGroupRepresentative, "working_group", formId);

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

// EXECUTE Send Data function
export async function executeSendDataByStep(step, formData, formId, userId) {

  switch(step) {
    case 0:
      sendData(formId, 'organizations', matchCompanyFieldsToBackend(formData.organization, formId))
      sendData(formId, 'contacts', matchContactFieldsToBackend(formData.companyRepresentative.representative, 'company', formId))
      sendData(formId, 'contacts', matchContactFieldsToBackend(formData.companyRepresentative.marketingRepresentative, 'marketing', formId))
      sendData(formId, 'contacts', matchContactFieldsToBackend(formData.companyRepresentative.accounting, 'accounting', formId))
      break;

    case 1:
      sendData(formId, '', matchMembershipLevelFieldsToBackend(formData.membershipLevel, formId, userId))
      break;

    case 2:
      formData.workingGroups.forEach(item => {
        sendData(formId, 'working_groups', matchWGFieldsToBackend(item, formId))
      });
      break;

    case 3:
      return;

    default:
      return;
  }
}

function callSendData(formId, endpoint='', method, dataBody, entityId='') {

  let url = `http://localhost:8090/form/${formId}`;

  if (endpoint) {
    url = `http://localhost:8090/form/${formId}/${endpoint}`;
  }

  if (entityId && entityId !== formId) {
    url = `http://localhost:8090/form/${formId}/${endpoint}/${entityId}`;
  }

  fetch(url, {
    method: method,
    body: dataBody
  }).then( res => {
    console.log(res.status);
  })
}

// PUT or POST function
export function sendData(formId, endpoint, dataBody) {
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

  switch(endpoint) {
    case "organizations":
      if (!dataBody.id || formId === 'new') {
        delete dataBody.id;
        callSendData(formId, endpoint, 'POST', dataBody);
      } else {
        callSendData(formId, endpoint, 'PUT', dataBody, dataBody.id);
      }
      break;

    default:
      if (!dataBody.id) {
        delete dataBody.id;
        callSendData(formId, endpoint, 'POST', dataBody);
      } else {
        callSendData(formId, endpoint, 'PUT', dataBody, dataBody.id);
      }
  }

  // switch(type) {
  //   case "organizations":
  //     if (!dataBody.id || dataBody.id === 'new') {
  //       console.log("You send request to: " + endpoint + "By method POST")
  //       delete dataBody.id;
  //       console.log("You data body is: " + JSON.stringify(dataBody));
  //     } else {
  //       console.log("You send request to:" + endpoint + "/" + dataBody.id + "; By method PUT")
  //       console.log("You data body is: " + JSON.stringify(dataBody));
  //     }
  //     break;

  //   default:
  //     if (!dataBody.id) {
  //       console.log("You send request to: " + endpoint + "; By method POST")
  //       delete dataBody.id;
  //       console.log("You data body is: " + JSON.stringify(dataBody));
  //     } else {
  //       console.log("You send request to:" + endpoint + "/" + dataBody.id + "; By method PUT")
  //       console.log("You data body is: " + JSON.stringify(dataBody));
  //     }
  // }
}
