import React from 'react';
import { Field, ErrorMessage } from 'formik';

const CustomSelectWrapper = ({ name, srcData, isExistingMember, setDisableInput, organiazationData, renderComponent }) => {

  return (
    <>
    <ErrorMessage className="error" component="div" name={name} />
    <Field
      name={name}
      component={renderComponent}
      srcData={srcData}
      isExistingMember={isExistingMember}
      setDisableInput={setDisableInput}
      organiazationData={organiazationData}
    />
    </>
  )
}

export default CustomSelectWrapper