import React from 'react';
import { Field } from 'formik';

<<<<<<< HEAD
const CustomSelectWrapper = ({ name, srcData, isExistingMember, participationLevel, renderComponent, options }) => {
=======
const CustomSelectWrapper = ({ name, srcData, isExistingMember, participationLevel, renderComponent, options, ariaLabel }) => {
>>>>>>> upstream/master

  return (
    <Field
      name={name}
      component={renderComponent}
<<<<<<< HEAD
=======
      ariaLabel={ariaLabel}
>>>>>>> upstream/master
      srcData={srcData}
      isExistingMember={isExistingMember}
      participationLevel={participationLevel}
      options={options}
    />
  )
}

export default CustomSelectWrapper