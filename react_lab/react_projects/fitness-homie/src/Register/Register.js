import React from 'react';
import './Register.css';
import {useForm} from 'react-hook-form';

function Register () {

    const {register, handleSubmit, watch, errors} = useForm();
    const onSubmit = data => console.log(data);
    // console.log(watch('password'));
   

       return (
       <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
           
        <form className="h-75 p-4 d-flex flex-column justify-content-start" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group">
                <label htmlFor="emailInput">Email address</label>
                <input name="email" type="email" className="form-control" id="" aria-describedby="emailInput"
                ref={register({
                    required: {
                        value: true,
                        message: "This field is required"
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Not a valid email address.",
                      },
                  })}
                />
                {/* {errors.email && <span>This field is required</span>} */}
                {errors.email && <span>{errors.email.message}</span>}
 
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input name="password" type="password" className="form-control" id="" aria-describedby="passwordInput"
                ref={register({
                    required: true
                  })}
                /> 
                {errors.password && <span>This field is required</span>}    
            </div>

            <div className="form-group">
                <label htmlFor="passwordInput">Confirm Password</label>
                <input name="password-repeat"type="password" className="form-control" id="" aria-describedby="confirmPasswordInput"/>     
            </div>
            <button type="submit" className="btn mx-auto">Register</button>
          
           
        </form>
       </div>
       );
}


export default Register;