import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { selectTheme, generateCustomStyles } from './customSelectStyle';
import { useField } from 'formik';

const CountrySelect = (props) => {

  const [stateData, setStateData] = useState([]);
  const [, meta] = useField(props.field.name);

  useEffect(() => {
    let isSubscribed = true;

    fetch("countries_states/countries.json", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if (isSubscribed) {
          setStateData(data.countries?.map(item => ({ value: item.id, label: item.name })))
        }
      })

    // cancel subscription to useEffect
    return () => (isSubscribed = false)
  }, [])

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
      options={stateData}
      defaultValue={props.field?.value || ""}
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