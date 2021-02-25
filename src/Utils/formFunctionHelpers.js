import { FETCH_METHOD, contact_type, end_point, api_prefix_form, FETCH_HEADER, newForm_tempId, getCurrentMode, MODE_REACT_ONLY, MODE_REACT_API } from '../Constants/Constants';

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
export function matchCompanyFields(existingOrganizationData) {

  return {
    // Step1: company Info
    organization: {
      id: existingOrganizationData?.id || '',
      legalName: {
        value: existingOrganizationData?.legal_name || '',
        label: existingOrganizationData?.legal_name || '',
        address: existingOrganizationData?.address || '',
        twitterHandle: existingOrganizationData?.twitterHandle || ''
      } || '',
      address: {
        id: existingOrganizationData?.address.id || '',
        street: existingOrganizationData?.address.street || '',
        city: existingOrganizationData?.address.city || '',
        provinceOrState: existingOrganizationData?.address.province_state || '',
        country: existingOrganizationData?.address.country || '',
        postalCode: existingOrganizationData?.address.postal_code || '',
      },
      twitterHandle: existingOrganizationData?.twitterHandle || '',  
    }
  }

}

export function matchContactFields(existingContactData) {

  let existingCompanyContact = existingContactData.find(el => el.type === contact_type.COMPANY)
  let existingMarketingContact = existingContactData.find(el => el.type === contact_type.MARKETING)
  let existingAccoutingContact = existingContactData.find(el => el.type === contact_type.ACCOUNTING)

  return {
    companyRepresentative: {
      representative: {
        id: existingCompanyContact?.id || '',
        firstName: existingCompanyContact?.first_name || '',
        lastName: existingCompanyContact?.last_name || '',
        jobtitle: existingCompanyContact?.job_title || '',
        email: existingCompanyContact?.email || ''
      },
  
      marketingRepresentative: {
        id: existingMarketingContact?.id || '',
        firstName: existingMarketingContact?.first_name || '',
        lastName: existingMarketingContact?.last_name || '',
        jobtitle: existingMarketingContact?.job_title || '',
        email: existingMarketingContact?.email || '',
        sameAsCompany: checkSameContact(existingCompanyContact, existingMarketingContact)
      },
  
      accounting: {
        id: existingAccoutingContact?.id || '',
        firstName: existingAccoutingContact?.first_name || '',
        lastName: existingAccoutingContact?.last_name || '',
        jobtitle: existingAccoutingContact?.job_title || '',
        email: existingAccoutingContact?.email || '',
        sameAsCompany: checkSameContact(existingCompanyContact, existingAccoutingContact)
      }
    }
  }

}

export function matchWorkingGroupFields(existingMembershipData) {
  var res = [];
  // Array
  existingMembershipData.forEach((item, index) => {

    res.push(
      {
        id: item?.id || '',
        workingGroup: item?.working_group_id || '',
        participationLevel: item?.participation_level || '',
        effectiveDate: new Date(item?.effective_date) || '',
        workingGroupRepresentative: {
          firstName: item?.contact.first_name || '',
          lastName: item?.contact.last_name || '',
          jobtitle: item?.contact.job_title || '',
          email: item?.contact.email || '',
          id: item?.contact.id || ''
        }
      }
    )
  })

  return res;
}

//== Transform data from my form model to PUT or POST for backend
export function matchCompanyFieldsToBackend(organizationData, formId) {

  var org = {
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

  if (organizationData.address.id) {
    org.address.id = organizationData.address.id;
  }

  return org;
}

export function matchMembershipLevelFieldsToBackend(membershipLevel, formId, userId) {

  return {
    id: formId,
    user_id: userId,
    membership_level: membershipLevel,
    signing_authority: true
  }

}

export function matchContactFieldsToBackend(contactData, contactType, formId) {

  if (contactType === contact_type.WORKING_GROUP && !contactData.id) {
    return {
      form_id: formId,
      first_name: contactData.firstName,
      last_name: contactData.lastName,
      job_title: contactData.jobtitle,
      email: contactData.email,
      type: contactType
    }
  }

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

  var wg_contact = matchContactFieldsToBackend(eachWorkingGroupData.workingGroupRepresentative, contact_type.WORKING_GROUP, formId);

  return {
    id: eachWorkingGroupData.id,
    working_group_id: eachWorkingGroupData.workingGroup,
    participation_level: eachWorkingGroupData.participationLevel,
    effective_date: (eachWorkingGroupData.effectiveDate).toISOString().replace(/.\d+Z$/g, "Z"),
    contact: {
      ...wg_contact
    }
  }
}

// EXECUTE Send Data function
export async function executeSendDataByStep(step, formData, formId, userId) {

  switch(step) {
    case 0:
      sendData(formId, end_point.organizations, matchCompanyFieldsToBackend(formData.organization, formId))
      sendData(formId, end_point.contacts, matchContactFieldsToBackend(formData.companyRepresentative.representative, contact_type.COMPANY, formId))
      sendData(formId, end_point.contacts, matchContactFieldsToBackend(formData.companyRepresentative.marketingRepresentative, contact_type.MARKETING, formId))
      sendData(formId, end_point.contacts, matchContactFieldsToBackend(formData.companyRepresentative.accounting, contact_type.ACCOUNTING, formId))
      break;

    case 1:
      sendData(formId, '', matchMembershipLevelFieldsToBackend(formData.membershipLevel, formId, userId))
      break;

    case 2:
      formData.workingGroups.forEach(item => {
        sendData(formId, end_point.working_groups, matchWGFieldsToBackend(item, formId))
      });
      break;

    case 3:
      return;

    default:
      return;
  }
}

function callSendData(formId, endpoint='', method, dataBody, entityId='') {

  let url = api_prefix_form + `/${formId}`;

  if (endpoint) {
    url = api_prefix_form + `/${formId}/${endpoint}`;
  }

  if (entityId && entityId !== formId) {
    url = api_prefix_form + `/${formId}/${endpoint}/${entityId}`;
  }

  delete dataBody.id;

  fetch(url, {
    method: method,
    headers: FETCH_HEADER,
    body: JSON.stringify(dataBody)
  }).then( res => {
    console.log(res.status);
  })
}

// PUT or POST function
export function sendData(formId, endpoint, dataBody) {

  switch(endpoint) {
    case end_point.organizations:
      if (!dataBody.id || formId === newForm_tempId) {
        delete dataBody.id;
        callSendData(formId, endpoint, FETCH_METHOD.POST, dataBody);
      } else {
        callSendData(formId, endpoint, FETCH_METHOD.PUT, dataBody, dataBody.id);
      }
      break;

    default:
      if (!dataBody.id) {
        delete dataBody.id;
        callSendData(formId, endpoint, FETCH_METHOD.POST, dataBody);
      } else {
        callSendData(formId, endpoint, FETCH_METHOD.PUT, dataBody, dataBody.id);
      }
  }

}


export function deleteData(formId, endpoint, entityId, callback, index) {

  // If the added field array is not in the server, just remove it from frontend
  if (!entityId) {
    callback(index);
  }

  // If the not using java server, just remove it from frontend
  if (getCurrentMode() === MODE_REACT_ONLY) {
    callback(index);
  }

  // If removing existing working_group
  if (entityId) {
    let url = api_prefix_form + `/${formId}`;
    if (endpoint) {
      url = api_prefix_form + `/${formId}/${endpoint}`;
    }
    if (entityId && entityId !== formId) {
      url = api_prefix_form + `/${formId}/${endpoint}/${entityId}`;
    }
    fetch(url, {
      method: FETCH_METHOD.DELETE,
    }).then( res => {
      console.log(res.status);
      // Remove from frontend
      if (res.status === 200) {
        callback(index);
        return Promise.resolve(res);
      }
    })
  }

}

export async function handleNewForm(setCurrentFormId, formData, userId, defaultBehaviour) {

  if (getCurrentMode() === MODE_REACT_ONLY) {
    defaultBehaviour();
  }

  if (getCurrentMode() === MODE_REACT_API) {
    var dataBody = {
      membership_level: '',
      signing_authority: false
    };
  
    fetch(api_prefix_form, {
      method: FETCH_METHOD.POST,
      headers: FETCH_HEADER,
      body: JSON.stringify(dataBody)
    })
    .then(res => res.json())
    .then(data => {
      setCurrentFormId(data[0]?.id);
      executeSendDataByStep(0, formData, data[0]?.id, userId);
      defaultBehaviour();
    })
  }

  // Probably Also need to delete the old form Id, or keep in the db for 30 days

}