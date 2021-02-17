import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MembershipContext from '../../Context/MembershipContext';

const styles = {
    height: '200px',
    width: '200px',
    background: 'white',
    margin: '10px',
    paddingTop: '20px',
    display: 'inline-block',
    textAlign: 'center'
}

const style_root = {
    display: 'inline-block'
}

const FormChooser = ({currentUser}) => {

    const history = useHistory();

    const {setCurrentFormId} = useContext(MembershipContext);

    const handleOnClick = (el) => {
        setCurrentFormId(el);
        history.push('/form');
    }

    const createNewForm = () => {
        history.push('/form');
    }

    return (

        <>
        { currentUser.form_ids.map((el, index) => 
        
        <div style={style_root} key={index}>
            <div style={styles} onClick={() => handleOnClick(el)}>the form Id: {el}</div>
        </div>
        )  }

        <h2>Create New Form</h2>
        <h3>Click on the Next Button to pretend starting a new form</h3>
        <button type="button" onClick={createNewForm} className="btn btn-primary"> Create new form </button>
        </>

    )

}

export default FormChooser