import React from 'react';
// import PropTypes from 'prop-types';
import { getStyles } from "./stepHelpers";

const Step = (props) => {

  const { active, completed, index, onClick, stepReached, title, currentStep, formRef } = props
  const styles = getStyles(props)

    const handleClick = e => {

      // If go back to sign in page, reset the form
      // if (index === 0) {
      //   onClick(index);
      //   formRef.current.resetForm();
      // }

      // else {
        if (index > currentStep) {
          if (formRef.current) {
            formRef.current.handleSubmit()
          }
        }
        else if(index < currentStep) {
          onClick(index)
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
