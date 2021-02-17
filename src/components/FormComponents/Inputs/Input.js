import React from 'react';
import { Field } from 'formik';

const Input = ({ name, labelName, placeholder, disableInput }) => {

  return (
    <>
    <label htmlFor={name}>{labelName}</label><br />
    <Field name={name}>
      {({
        field,
        form: { touched, errors },
        meta,
      }) => {
        return (
        <>
          <input {...field} className={`form-control margin-bottom-10 ${meta.touched && meta.error ? "form-border-error" : ""}`} type="text" placeholder={placeholder} disabled={disableInput} />
        </>
      )}}
    </Field>
    </>
  )
}

export default Input