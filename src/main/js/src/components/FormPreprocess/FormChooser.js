import React, { useContext } from 'react';
import MembershipContext from '../../Context/MembershipContext';
import { FETCH_HEADER, api_prefix_form, newForm_tempId, getCurrentMode, MODE_REACT_ONLY, MODE_REACT_API } from '../../Constants/Constants';

const styles = {
    marginBottom: '20px'
}

const FormChooser = ({currentUser}) => {
    const {setCurrentFormId} = useContext(MembershipContext);

    const fetchExistingForm = () => {

        let url_prefix_local;
        if ( getCurrentMode() === MODE_REACT_ONLY ) {
          url_prefix_local = 'membership_data/form_1/form.json';
        }
    
        if (getCurrentMode() === MODE_REACT_API) {
          url_prefix_local = api_prefix_form;
        }

        fetch(url_prefix_local, { headers: FETCH_HEADER })
        .then(res=> res.json())
        .then(data=> {
            setCurrentFormId(data[0]?.id);
            console.log(data[0]?.id)
        })
        .catch(err => console.log(err));
    }

    const createNewForm = () => {
        setCurrentFormId(newForm_tempId);
    }

    return (

        <div style={styles}>
        <button type="button" onClick={fetchExistingForm} className="btn btn-primary"> Edit Existing Form </button>

        <button type="button" onClick={createNewForm} className="btn btn-primary"> Create New Form </button>
        </div>

    )

}

export default FormChooser