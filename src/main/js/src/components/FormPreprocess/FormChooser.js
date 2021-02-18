import React, { useContext } from 'react';
import MembershipContext from '../../Context/MembershipContext';

const styles = {
    marginBottom: '20px'
}

const FormChooser = ({currentUser}) => {
    const {setCurrentFormId} = useContext(MembershipContext);

    const handleOnClick = () => {
        setCurrentFormId(currentUser.form_id);
    }

    const createNewForm = () => {
        setCurrentFormId("new");
    }

    return (

        <div style={styles}>
        <button type="button" onClick={handleOnClick} className="btn btn-primary"> Edit Existing Form </button>

        <button type="button" onClick={createNewForm} className="btn btn-primary"> Create New Form </button>
        </div>

    )

}

export default FormChooser