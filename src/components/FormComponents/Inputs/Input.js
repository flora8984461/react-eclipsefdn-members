import React from "react";
import { Field } from "formik";

const Input = ({ name, labelName, placeholder, disableInput }) => {

  return (
    <>
    <label htmlFor={name}>{labelName}</label><br />
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        
        // console.log(field.value)
        return (
        <>
          <input {...field} className={`form-control margin-bottom-10 ${meta.touched && meta.error ? "form-border-error" : ""}`} type="text" placeholder={placeholder} disabled={disableInput} />
          {/* {meta.touched && meta.error && (
            <div className="error margin-bottom-5">{meta.error}</div>
          )} */}
        </>
      )}}
    </Field>
    </>
  )
}

export default Input