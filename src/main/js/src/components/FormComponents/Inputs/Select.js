import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { formField } from '../formModels/formFieldModel';

const Select = (props) => {
  const { label, name, options } = props

  const style = {
    display: 'none'
  };

  return (
    <>
    <label sr-only="true" style={style} htmlFor={name}>{label}</label>
    <Field name={name}>
      {({ field }) => {
        if (name === formField.membershipLevel.name) {
          return (
            <select {...field} className="form-control">
              {options?.map(option => 
                (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )
              )}
            </select>
          )
        }
        return (
            <select {...field} className="form-control">
              <option value='' key="none">Please select</option>
              {options?.map(option => 
                (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
        )
      }}
    </Field>
      <ErrorMessage className="error" component="div" name={name} />
    </>
  )
}

export default Select