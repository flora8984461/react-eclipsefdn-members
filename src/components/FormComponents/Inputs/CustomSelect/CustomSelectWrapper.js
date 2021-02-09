import React from 'react';
import { Field, ErrorMessage } from 'formik';

const CustomSelectWrapper = ({ name, srcData, isExistingMember, setDisableInput, renderComponent }) => {

  return (
    <>
    <Field
      name={name}
      component={renderComponent}
      srcData={srcData}
      isExistingMember={isExistingMember}
      setDisableInput={setDisableInput}
    />
    <ErrorMessage className="error margin-bottom-20" component="div" name={name} />
    </>
  )
}

export default CustomSelectWrapper