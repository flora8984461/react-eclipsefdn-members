import React from 'react';
import { Field } from 'formik';

const CustomSelectWrapper = ({ name, srcData, participationLevel, renderComponent, options, ariaLabel }) => {

  return (
    <Field
      name={name}
      component={renderComponent}
      ariaLabel={ariaLabel}
      srcData={srcData}
      participationLevel={participationLevel}
      options={options}
    />
  )
}

export default CustomSelectWrapper