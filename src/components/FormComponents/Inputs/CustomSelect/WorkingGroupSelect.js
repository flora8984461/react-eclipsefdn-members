import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { generateCustomWGSelectStyles, selectTheme } from './customSelectStyle';
import { useField } from 'formik';

const WorkingGroupSelect = (props) => {
  const [workingGroupsData, setWorkingGroupsData] = useState([]);
  const [field, meta] = useField(props.field.name);  //// or props.field, must contain name key
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Fetch working groups data
      fetch("workingGroups.json" , {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
       .then(res=>res.json())
       .then(data => {
         let options = data.working_groups.map(item => ({ label: item.name, value: item.id, participation_levels: item.participation_levels }))
         if (!props.isExistingMember) {
          options.push({ label: 'I do not want to join a working group at this time', value: 'not now' })
         }
        setWorkingGroupsData(options)
        setLoading(false)
       })
    // eslint-disable-next-line
  }, [])

  const handleSelect = (option, action) => {

    if (option && !option.__isNew__ && action !== "clear") {

      if (props.srcData === "workingGroups") {
        props.form.setFieldValue(props.field.name, option.value)
      }
    }

    if (action.action === "clear") {
      if (props.srcData === "workingGroups") {
        props.form.setFieldValue(props.field.name, "")
      }
    }
  }

  const getValue = (options, value) => {
    if (!loading) {
      return options.find(option => value === option.value)
    }
  }

  return (
    <Select
      {...field}
      isClearable
      isSearchable
      isLoading={loading}
      options={workingGroupsData}
      value={getValue(workingGroupsData, props.field.value) || ""}
      onChange={(option, action) => {
        handleSelect(option, action)
      }}
      onBlur={props.form.handleBlur(props.field.name)}
      styles={generateCustomWGSelectStyles(meta.error)}
      theme={selectTheme}
      className="margin-bottom-10 form-group"
    />
  )

}

export default WorkingGroupSelect