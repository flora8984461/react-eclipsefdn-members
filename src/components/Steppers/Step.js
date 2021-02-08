import React from 'react';
// import PropTypes from 'prop-types';
import { getStyles } from "./stepHelpers";

const Step = (props) => {

  const { active, completed, index, onClick, stepReached, title, currentStep, formRef } = props
  const styles = getStyles(props)

    const handleClick = e => {

      if (index === 0) {
        onClick();
      }

      // If go back to sign in page, reset the form
      // if (index === 0) {
      //   onClick(index);
      //   formRef.current.resetForm();
      // }

      // else {
        if (index-1 > currentStep) {
          if (formRef.current) {
            // formRef.current.handleSubmit()
            // onClick(index-2)
            formRef.current.validateForm()
            if (Object.keys(formRef.current.errors).length === 0) {
              onClick(index-1)
            }
          }
        }
        else if(index-1 <= currentStep) {
          onClick(index-1)
        }
      // }
    }

    return (
    <div style={styles.index} className="step" onClick={ (completed || stepReached) ? handleClick : null} >
      <span className="step-span-index">{index + 1}</span>
      <div className="step-span">
        <div className={ active ? `step-title-container-active` : `step-title-container`}>
          <span className="step-title">{title}</span>
        </div>
      </div>
    </div>
    )
}

export default Step

// will add later
// Step.defaultProps = {
// }

// Step.propTypes = {
// }
