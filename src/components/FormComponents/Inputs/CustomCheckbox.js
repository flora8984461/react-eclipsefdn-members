import React from "react";
import { Field } from "formik";

const CustomCheckbox = ({ name, label }) => {
  return (
    <Field name={name}>
    {
      ({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => {
        return (
          <>
        <label className="verical-center margin-top-20 margin-bottom-20">
          <input
            {...field}
            id={field.name}
            value={field.value}
            checked={field.value}
            name={field.name}
            type="checkbox"
          />
          <span>{label}</span>
        </label>
          </>
        )
      }
    }
    </Field>
  )
}

export default CustomCheckbox
