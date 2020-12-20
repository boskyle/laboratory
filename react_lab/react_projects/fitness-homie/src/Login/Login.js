import React from 'react';
import './login.css';
import {useForm} from 'react-hook-form';

function Login() {

    /*
        1. display error if user email does not exist.
        2. display error if user email does not match with hashed password.
    */

    const {handleSubmit,register,watch,reset} = useForm();

    const onSubmit = formData => {

    }


    return  (

        <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">

        <form className="h-75 p-3 d-flex flex-column justify-content-start" onSubmit={handleSubmit(onSubmit)} noValidate>
        
            <div className="form-group mt-2">
                <label htmlFor="emailInput">Email Address</label>
                <input name="email" type="email" className="form-control" id="" aria-describedby="emailInput"
                ref={register({
                    // use validate prop. and pass async callback function to fetch users email + password
                    required: {
                        value: true,
                        message: "This field is required."
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Not a valid email address.",
                    },
                    validate: isEmailValid
                })}
                />
                    

                <div className="form-group mt-5">
                <label htmlFor="passwordInput">Password</label>
                <input name="password" type="password" className="form-control" id="" aria-describedby="passwordInput"/>

                </div>

                 <button type="submit" className="btn h-25">Login</button>

            </div>
        
        </form>


        </div>

    );

}

const isEmailValid = async (emailInput) => {
    // code goes here for api fetch
}
    




export default Login;