import React from 'react';
import {useForm} from 'react-hook-form';
import './setup.css';


/*  Only render this component when it is the user's first time logging in
    This component will collect the pre-logged in user's information firsthand:
        -username
        -firstname
        -lastname
        -country (optional)
        -address (optional)

            NEXT
            
        BMR Calculation
        -age
        -height
        -workout per week (Drop down)
*/
console.log(localStorage.getItem('userId'));
console.log(localStorage.getItem('userName'));


const Setup = ()  => {
    const {register, handleSubmit, watch, errors, reset} = useForm();
    let registerBasicInfoApi = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Login/register-basic-info.php';

    const onSubmit = async formData => {
        
        
      

    }


    // if user is logged in (userId is  pushed into localStorage) BUT info is empty (info.username pushed into localStorage is non existant) then send them to this form
    if (localStorage.getItem('userId') !== null && localStorage.getItem('userName') === null) {
    return (
        <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
                    <form className="h-75 p-4 d-flex flex-column justify-content-start" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <h2 className="mx-auto">Let's Get Started</h2>
                        <div className="form-group">
                            <label htmlFor="emailInput">Username</label>
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
                                {errors.username && <span>{errors.username.message}</span>}
                                {errors.username && errors.username.type === "validate" && (
                                <span>Username already exists.</span>
                                )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="emailInput">Firstname</label>
                            <input name="firstname" type="text" className="form-control" id="" aria-describedby="firstnameInput"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Firstname is required."
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9]{2,20}$/,
                                        message: "Firstname length should not be more than 20."
                                    },
                                    
                                })}
                                
                                />
                                {errors.firstname && <span>{errors.firstname.message}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="emailInput">Lastname</label>
                            <input name="lastname" type="text" className="form-control" id="" aria-describedby="lastnameInput"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Lastname is required."
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9]{2,20}$/,
                                        message: "Lastname length should not be more than 20."
                                    },
                                    
                                })}
                                
                                />
                                {errors.lastname && <span>{errors.lastname.message}</span>}
                        </div>




                        <button type="submit" className="btn mx-auto">Push</button>
                    </form>


        </div>

    );
    }

return null;
}

const isUsernameExist = async (userNameInput) => {
    let userNameListingApi = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Login/check-username-exist.php';
    let matcher = '';

    try {
        
        
        await fetch(userNameListingApi, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json'
            }
            }).then(response => response.json())
                .then(response => {
                    response.forEach(username => {
                        if(username === userNameInput) {
                            matcher = userNameInput;
                        }
                    })
                })
                .catch(err => console.log(err))
    
                // console.log(matcher);
          return (userNameInput === matcher) ? false : true;





    } catch (err) {console.log("Something went wrong with email fetch:"+err)}

}

export default Setup;