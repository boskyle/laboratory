import React from 'react';
import {useState,useEffect} from 'react';
import Modal from 'react-modal';
import {useForm} from 'react-hook-form';
import {isUsernameExistWithCheck} from '../../../DB/validation';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {authenticateUserLoggedIn} from '../../../redux/actions';
import {ImCross} from 'react-icons/im';
import './popup.css';


export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    Modal.setAppElement('.App');
    const [showPop,setShowPop] = useState(false);
    const [userInfo,setUserInfo] = useState('');
   
    const  handleOpen = (e) => {
        console.log("open");
        setShowPop(true);
    }

    const  handleClose = (e) => {
        console.log("close");
        setShowPop(false);
    }
   
    const {register, handleSubmit, errors, reset} = useForm({
        defaultValues: {
            username : props.username,
            firstname: props.firstname,
            lastname: props.lastname
        }
    });
    
    const onSubmit = async formData => {
        let editUrl = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Dashboard/UserProfile/Popup/edit-profile.php';
        await fetch (editUrl,{
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: props.userId,
                username: formData.username,
                firstname: formData.firstname,
                lastname: formData.lastname
            })
        })

        
        // instantly to redux state
        dispatch(authenticateUserLoggedIn(props.userId,formData.username));
        history.push(`/${formData.username}`);
        window.location.reload();
        setShowPop(false);
    } 
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
                <ImCross className="exit-icon" onClick={handleClose}/>
                <form className="pop-form-profile-update" onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="form-group pop-up-form-group mb-2">
                                    <label htmlFor="emailInput"><h4>Username</h4></label>
                                    <input name="username" type="text"  className="form-control w-50 mx-auto text-center" aria-describedby="usernameInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "You can't leave it blank silly."
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9]{4,10}$/,
                                                message: "Length should be: 4-10 with no special characters."
                                            },
                                            validate: {
                                                userNameExist: value => isUsernameExistWithCheck(value,props.username)
                                            }
                                        })}
                                               
                                        />
                                        {errors.username && <span>{errors.username.message}</span>}
                                        {errors.username?.type === "userNameExist" && (
                                        <span>Username already exists.</span>
                                        )}
                                        {errors.username?.type === "sameUsername" && (
                                        <span>Same username.</span>
                                        )}
                                    </div>
                                    {/* firstname */}
                                    <div className="form-group pop-up-form-group mb-2">
                                    <label htmlFor="emailInput"><h4>Firstname</h4></label>
                                    <input name="firstname" type="text" className="form-control w-50 mx-auto text-center" id="" aria-describedby="firstnameInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "You can't leave it blank silly."
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z]{2,20}$/,
                                                message: "Name format is invalid."
                                            },
                                            
                                        })}
                                        
                                        />
                                        {errors.firstname && <span>{errors.firstname.message}</span>}
                                </div>
                                <div className="form-group pop-up-form-group">
                                    <label htmlFor="emailInput"><h4>Lastname</h4></label>
                                    <input name="lastname" type="text" className="form-control w-50 mx-auto text-center" id="" aria-describedby="firstnameInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "You can't leave it blank silly."
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z]{2,20}$/,
                                                message: "Name format is invalid."
                                            },
                                            
                                        })}
                                        
                                        />
                                        {errors.lastname && <span>{errors.lastname.message}</span>}
                                </div>
                <button  type="submit"  className="btn save-button">Save</button>
                </form>
            </div>

           
          
        </Modal>
        </>
    );
   
};