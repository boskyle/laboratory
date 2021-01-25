import React from 'react';
import {useState,useEffect} from 'react';
import Modal from 'react-modal';
import {useForm} from 'react-hook-form';
import {isUsernameExist} from '../../../DB/validation';
import './popup.css';


export default () => {

    Modal.setAppElement('.App');
    const [showPop,setShowPop] = useState(false);

    const  handleOpen = (e) => {
        console.log("open");
        setShowPop(true);
    }

    const  handleClose = (e) => {
        console.log("close");
        setShowPop(false);
    }

    const {register, handleSubmit, errors, reset} = useForm();

    return (
        <>
        <button  type="button" className="btn edit-button m-0 mb-1" onClick={handleOpen}>Edit</button>
        <Modal 
           isOpen={showPop}
           onRequestClose={handleClose}
           contentLabel="Minimal Modal Example"
           className="popUp"
           overlayClassName="overlay"
        >
            <div className="pop-form-container p-5">
                <form className="pop-form-profile-update bg-warning w-75" noValidate>
                                    <div className="form-group">
                                    <label htmlFor="emailInput"><h4>Username</h4></label>
                                    <input name="username" type="text" className="form-control" id="" aria-describedby="emailInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Username is required."
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9]{4,10}$/,
                                                message: "Length should be: 4-10 with no special characters."
                                            },
                                            validate: isUsernameExist
                                        })}
                                        
                                        />
                                    </div>
                </form>
            </div>
            <button className="btn save-button" onClick={handleClose}><h2>Save</h2></button>

           
          
        </Modal>
        </>
    );
   
};