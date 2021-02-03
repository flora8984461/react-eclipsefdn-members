import React, { useContext } from "react";
import MembershipContext from "../MembershipContext";

const styles = {
    height: '200px',
    width: '200px',
    background: 'white',
    margin: "10px",
    paddingTop: "20px",
    display: "inline-block",
    textAlign: "center"
}

const style_root = {
    display: "inline-block"
}

const FormChooser = ({currentUser, setStep}) => {


    const {setCurrentFormId} = useContext(MembershipContext);

    const handleOnClick = (el) => {
        console.log(el)
        setCurrentFormId(el);
        setStep(s => s + 1);
    }

    return (

        <>
        { currentUser.form_ids.map((el, index) => 
        
        <div style={style_root} key={index}>
            <div style={styles} onClick={() => handleOnClick(el)}>the form Id: {el}</div>
        </div>
        )  }

        </>

    )

}

export default FormChooser