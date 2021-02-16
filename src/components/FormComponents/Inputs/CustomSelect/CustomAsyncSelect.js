import React from 'react';
import AsyncCreatable from 'react-select/async-creatable';
import { selectTheme, generateCustomStyles } from './customSelectStyle';
import { useField } from 'formik';
import { FETCH_HEADER } from '../../../../Constants/Constants';

const CustomAsyncSelect = (props) => {

  const [field, meta] = useField(props.field.name);  //// or props.field, must contain name key

  const handleSelect = (option, action) => {

    if (option && !option.__isNew__ && action !== "clear") {
      if (props.srcData === "companies") {
        // Prefill existing data to selected companies
        props.form.setFieldValue("organization.legalName", option)
        props.form.setFieldValue("organization.address", option.address)
        props.form.setFieldValue('organization.twitterHandle', option.twitterHandle)
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

      }
    }

    if (option && option.__isNew__) {
      // When create new organization that are not in our data
      props.form.setFieldValue("organization.legalName", option)

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
            return fetch(src_data, { headers: FETCH_HEADER })
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