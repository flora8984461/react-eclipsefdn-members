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