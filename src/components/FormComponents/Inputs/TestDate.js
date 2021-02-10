import React, { useRef, useEffect } from "react";
// import { Field } from "formik";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./dateInputstyles.css";


const TestDate = (props) => {

  const dateRef = useRef(null);
//   const { label, name, ...rest } = props

//   console.log(dateRef)

//refer to https://stackoverflow.com/questions/34167551/react-onchange-being-used-after-a-click-of-a-button-to-alter-value-in-input
useEffect(() => {
  window.$(dateRef.current).datepicker()
  .on('changeDate', (e) => {
  //  e here contains the extra attributes 
  props.setFieldValue(props.name, e.target.value)
});
// eslint-disable-next-line
},[])

  return (

    <input id="test" ref={dateRef} data-provide="datepicker" />

  )
}

export default TestDate