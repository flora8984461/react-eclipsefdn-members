import React from 'react';
import Select from 'react-select';
import { selectTheme, generateCustomStyles } from './customSelectStyle';
import { useField } from 'formik';

const CountrySelect = (props) => {

  const countryList = require('country-list').getNames().map(item => ({ label: item, value: item }));

  const [, meta] = useField(props.field.name);

  const handleSelect = (option, action) => {

    if (option && action !== "clear") {
        props.form.setFieldValue("organization.address.country", option)
    }

    if (action.action === "clear") {
        props.form.setFieldValue("organization.address.country", "")
    }
  }

  return (
    <Select
      isSearchable
      options={countryList}
      value={props.field?.value || ""}
      // defaultValue={props.field?.value || ""}
      onChange={(option, action) => {
        handleSelect(option, action)
      }}
      onBlur={props.form.handleBlur(props.field.name)}
      className="margin-bottom-10 form-group"
      styles={generateCustomStyles(false, meta.error)}
      theme={selectTheme}
    />
  )

}

export default CountrySelect