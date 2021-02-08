import React from 'react';
import AsyncCreatable from 'react-select/async-creatable';
import { selectTheme, generateCustomStyles } from './customSelectStyle';
import { useField } from 'formik';

const CustomAsyncSelect = (props) => {

  const [field, meta] = useField(props.field.name);  //// or props.field, must contain name key

  // useEffect(() => {
  //   // When has initial data and has not been changed, show prefilled address data and disable input, like Linux Foundation, decide later
  //   if (props.isExistingMember && props.organiazationData && props.field.value && props.field.value.value === props.organiazationData.legal_name) {
  //     props.setDisableInput(true)
  //   }
  // }, [props])

  const handleSelect = (option, action) => {

    if (option && !option.__isNew__ && action !== "clear") {
      if (props.srcData === "companies") {
        // Prefill existing data to selected companies
        props.form.setFieldValue("organization.legalName", option)
        props.form.setFieldValue("organization.address.street", option.address.street)
        props.form.setFieldValue("organization.address.postalCode", option.address.postalCode)
        props.form.setFieldValue("organization.address.city", option.address.city)
        props.form.setFieldValue('organization.twitterHandle', option.twitterHandle)

        // Prefill Country Province Selector Or make it as disabled input, like Linux Foundation, decide later
        // props.form.setFieldValue("organization.address.provinceOrState", option.address.provinceOrState)
        // props.form.setFieldValue("organization.address.country", option.address.country)

        // props.setDisableInput(true)
      }
    }

    if (action.action === "clear") {
      // Clear prefilled data when clear the selection
      if (props.srcData === "companies") {
        props.form.setFieldValue("organization.legalName", "")
        props.form.setFieldValue("organization.address.street", "")
        props.form.setFieldValue("organization.address.city", "")
        props.form.setFieldValue("organization.address.provinceOrState", "")
        props.form.setFieldValue("organization.address.country", "")
        props.form.setFieldValue("organization.address.postalCode", "")
        props.form.setFieldValue('organization.twitterHandle', "")
        // props.setDisableInput(false)
      }
    }

    if (option && option.__isNew__) {
      // When create new organization that are not in our data
      props.form.setFieldValue("organization.legalName", option)
      // props.setDisableInput(false)
    }
  }

  const promiseOptions = async (inputValue) => {

      // Will use this if the api supports search
      // if(inputValue) {
      //   src_data = src_data + `?search=${inputValue}`
      // }

      let src_data;

      switch(props.srcData) {

        case "companies":
          src_data = "companies.json"
          if (inputValue) {
            return fetch(src_data, {
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            })
              .then(resp => resp.json())
              .then((data) => {
                if (data.companies) {
                  return data.companies.map(item => ({ value: item.legalName, label: item.legalName, address: item.address, twitterHandle: item.twitterHandle }));
                }
            })
          }
          else return []

        default:
          return []
      }
  }

    return (
      <AsyncCreatable
        {...field}
        isClearable
        isSearchable
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        defaultValue={props.field.value || ""}
        onChange={(option, action) => {
          handleSelect(option, action)
        }}
        onBlur={props.form.handleBlur(props.field.name)}
        styles={generateCustomStyles(true, meta.error)}
        theme={selectTheme}
        noOptionsMessage={() => "Type to Search..."}
        className="margin-bottom-10 form-group"
      />
    )

}

export default CustomAsyncSelect