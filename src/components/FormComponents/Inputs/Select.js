import React from 'react';
import { Field, ErrorMessage } from 'formik';

const Select = (props) => {
  const { label, name, options } = props
  return (
    <>
    <label sr-only="true" htmlFor={name}>{label}</label>
    <Field name={name}>
      {({ field }) => {
        if (name === 'membershipLevel') {
          return (
            <select {...field} className="form-control">
              {options?.map(option => 
                (
                  <option key={option.value} value={option.value}>
                    {option.name}
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