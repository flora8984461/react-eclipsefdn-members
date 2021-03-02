import React from 'react';
import Select from 'react-select';
import { selectTheme, generateCustomStyles } from './customSelectStyle';
import { useField } from 'formik';

const DefaultSelect = (props) => {

  const [, meta] = useField(props.field.name);

  const handleSelect = (option, action) => {

    if (option && action !== 'clear') {
        props.form.setFieldValue(props.field.name, option.value);
        if (props.participationLevel) {
          props.form.setFieldValue(props.participationLevel, '');
        }
    }

    if (action.action === 'clear') {
        props.form.setFieldValue(props.field.name, '');
        if (props.participationLevel) {
          props.form.setFieldValue(props.participationLevel, '');
        }
    }
  }

  const getValue = (options, value) => {
    return options?.find(option => value === option.value);
  }

  return (
    <Select
      isClearable
      isSearchable
      options={props.options}
      value={getValue(props.options, props.field.value) || ''}
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

export default DefaultSelect