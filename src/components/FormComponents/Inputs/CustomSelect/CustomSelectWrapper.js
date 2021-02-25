import React from 'react';
import { Field } from 'formik';

const CustomSelectWrapper = ({ name, srcData, isExistingMember, setDisableInput, participationLevel, renderComponent, options }) => {

  return (
    <Field
      name={name}
      component={renderComponent}
      srcData={srcData}
      isExistingMember={isExistingMember}
      participationLevel={participationLevel}
      setDisableInput={setDisableInput}
      options={options}
    />
  )
}

export default CustomSelectWrapper