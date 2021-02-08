import * as yup from "yup";
import { requiredErrorMsg } from './formFieldModel';

export const validationSchema = [

  // First step - company Info
  yup.object().shape({
    organization: yup.object().shape({
        legalName: yup.mixed().required(`${requiredErrorMsg}`),
        address: yup.object().shape({
            street: yup.string().required(`${requiredErrorMsg}`),
            city: yup.string().required(`${requiredErrorMsg}`),
            provinceOrState: yup.mixed().required(`${requiredErrorMsg}`),
            country: yup.mixed().required(`${requiredErrorMsg}`),
            postalCode: yup.string().required(`${requiredErrorMsg}`),
        })
      }),

    companyRepresentative: yup.object().shape({
        representative: yup.object().shape({
            firstName: yup.string().required(`${requiredErrorMsg}`),
            lastName: yup.string().required(`${requiredErrorMsg}`),
            jobtitle: yup.string().required(`${requiredErrorMsg}`),
            email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address') 
        })
    }),
  }),

  // Second step - membership level
  yup.object().shape({
    membershipLevel: yup.string().required(`${requiredErrorMsg}`)
  }),

  // Third step - working groups
  // yup.object().shape({
  //   workingGroup: yup.object().required(`${requiredErrorMsg}`),
  //   participationLevel: yup.string().when("workingGroup", {
  //     is: value => !!value?.value,
  //     then: yup.string().required(`${requiredErrorMsg}`)
  //   }),
  //   effectiveDate: yup.date().nullable().when("workingGroup", {
  //     is: value => !!value?.value,
  //     then: yup.date().required(`${requiredErrorMsg}`)
  //   }),
  //   workingGroupRepresentative:yup.object().shape({
  //     firstName: yup.string().required(`${requiredErrorMsg}`),
  //     lastName: yup.string().required(`${requiredErrorMsg}`),
  //     jobtitle: yup.string().required(`${requiredErrorMsg}`),
  //     email: yup.string().required(`${requiredErrorMsg}`).email('Invalid email address') 
  //   })
  // }),

  // // Forth, signing Authority
  // yup.object().shape({
  //   signingAuthorityRepresentative:yup.object().shape({
  //     firstName: yup.string().required(`${requiredErrorMsg}`),
  //     lastName: yup.string().required(`${requiredErrorMsg}`),
  //     email: yup.string().required(`${requiredErrorMsg}`)
  //   })
  // })
]