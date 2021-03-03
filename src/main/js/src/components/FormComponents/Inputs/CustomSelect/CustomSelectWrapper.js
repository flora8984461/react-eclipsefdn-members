import React from 'react';
import { Field } from 'formik';

const CustomSelectWrapper = ({ name, srcData, isExistingMember, participationLevel, renderComponent, options }) => {

  return (
    <Field
      name={name}
      component={renderComponent}
      srcData={srcData}
      isExistingMember={isExistingMember}
      participationLevel={participationLevel}
      options={options}
    />
  )
}

export default CustomSelectWrapper