export function getStyles(props) {
  const {
    onClick,
    completed,
    stepReached
  } = props

  return {
    index: {
      cursor: (completed || stepReached) && onClick ? 'pointer' : 'default',
    },
  }
}

export function getErrorStep(formikErrors) {
  var errorStep = -1;
  for (const errorField in formikErrors) {
    console.log(errorField)
    // code to be executed
    if (errorField === "organization" || errorField === "companyRepresentative") {
      errorStep = 0;
    }
    else if (errorField === "membershipLevel") {
      errorStep = 1;
    }
    else if (errorField === "workingGroup" || errorField === "participationLevel" || errorField === "effectiveDate" || errorField === "workingGroupRepresentative") {
      errorStep = 2;
    }
    else if (errorField === "signingAuthority" || errorField === "signingAuthorityRepresentative") {
      errorStep = 3;
    }
  }

  return errorStep;

}