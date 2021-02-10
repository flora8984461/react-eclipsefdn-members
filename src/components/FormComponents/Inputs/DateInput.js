import React from "react";
import { Field } from "formik";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./dateInputstyles.css";
import TestDate from './TestDate';


const DateInput = (props) => {

  const { label, name } = props


// //refer to https://stackoverflow.com/questions/34167551/react-onchange-being-used-after-a-click-of-a-button-to-alter-value-in-input
// useEffect(() => {
//   window.$(dateRef.current).datepicker()
//   .on('changeDate', (e) => {
//   //  e here contains the extra attributes 
//   console.log(e.target.value);
// });
// },[])

// componentDidMount() {
//   $(this.refs.scheduled_datetime).datepicker()
//     .on('changeDate', (e) => {
//     //  e here contains the extra attributes 
//     this.handleChange(e);
//   });
// }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field, meta }) => {
          const { setFieldValue } = form

          return (
            <>
            <TestDate setFieldValue={setFieldValue} name={name} />
            {meta.touched && meta.error && (
              <div className="error">{meta.error}</div>
            )}
            </>
          )
        }}
      </Field>
    </>
  )
}

export default DateInput