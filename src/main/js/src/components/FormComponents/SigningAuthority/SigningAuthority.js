import React, { useEffect, useContext, useState } from 'react';
import Input from '../Inputs/Input';
import Loading from '../../Loading/Loading';
import MembershipContext from '../../../Context/MembershipContext';
import { end_point, api_prefix_form, FETCH_HEADER, newForm_tempId, getCurrentMode, MODE_REACT_ONLY, MODE_REACT_API } from '../../../Constants/Constants';
import CustomRadioBox from '../Inputs/CustomRadioBox';

const SigningAuthority = ({ formField }) => {
  const { signingAuthorityRepresentative } = formField;
  const { currentFormId } = useContext(MembershipContext);
  const [ loading, setLoading ] = useState(true);
  const [ allContacts, setAllContacts ] = useState([]);

  // Fetch data only once and prefill data, behaves as componentDidMount
  useEffect(() => {
    let url_prefix_local;
    let url_suffix_local = '';
    if ( getCurrentMode() === MODE_REACT_ONLY ) {
      url_prefix_local = 'membership_data';
      url_suffix_local = '.json';
    }

    if (getCurrentMode() === MODE_REACT_API) {
      url_prefix_local = api_prefix_form;
    }

    if (currentFormId && currentFormId !== newForm_tempId) {
      fetch(url_prefix_local + `/${currentFormId}/` + end_point.contacts + url_suffix_local, { headers : FETCH_HEADER })
      .then(res => res.json())
      .then(data => {
        setAllContacts(data);
      })
    }

    setLoading(false);
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
    <h2 className="fw-600">Signing Authority</h2>
    <p>Please Indicate the individual who has the signing authority for the agreement</p>
    <p>Pick from exisiting</p>
    <div className="row">
      { allContacts.map((item, index) => {
        return(
          <CustomRadioBox
            key={item.id}
            name = "signingAuthority"
            contactName = {item.first_name + ' ' + item.last_name}
            contactJob = {item.job_title}
            contactEmail = {item.email}
          />
        )
      }) }

    </div>

    <div className="row">
      <p>Create a new contact?</p>
      { signingAuthorityRepresentative.map((el, index) => (
        <div key={index} className="col-md-12">
          <Input name={el.name} labelName={el.label} placeholder={el.placeholder} requiredMark={true} />
        </div>
      )) }
    </div>
    </>
  )

}

export default SigningAuthority