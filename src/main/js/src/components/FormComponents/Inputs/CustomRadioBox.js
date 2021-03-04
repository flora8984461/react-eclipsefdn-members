import React from 'react';
import { Field } from 'formik';
import './customRadioBoxStyles.css';

const CustomRadioBox = ({ name, label, contactName, contactJob, contactEmail }) => {
  return (
    <Field name={name}>
    {
      ({ field }) => (
          <div className="col-md-12">
            <div className="box">
            <label htmlFor={name} className="radio-label">
              <input
                {...field}
                id={field.name}
                value={field.name}
                // checked={field.value}
                name={field.name}
                type="radio"
              />
              <span>
                <h3 className="fw-600">{contactName}</h3>
                <p>{contactJob}</p>
                <p>{contactEmail}</p>
              </span>
            </label>
            </div>
          </div>
        )
    }
    </Field>
  )
}

export default CustomRadioBox
