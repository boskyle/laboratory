import React, {useRef} from 'react';
import './Register.css';
import {useForm} from 'react-hook-form';

function Register () {


    
    const {register, handleSubmit, watch, errors} = useForm();

    

    
    const onSubmit = formData => {
       
        fetch("http://boskyleprojects.com/fitness-homie-api/register-users.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        }).then ((response) => {console.log(response)})
            
        .catch((error) => console.log(error))
    };
    
  




    // mutable -> , only objects and arrays are mutable, not primitive values.
    const pw = useRef({});
    pw.current = watch('password');
    
       return (
       <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
           
        <form className="h-75 p-4 d-flex flex-column justify-content-start" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-group">
                <label htmlFor="emailInput">Email address</label>
                <input name="email" type="email" className="form-control" id="" aria-describedby="emailInput"
                ref={register({
                    required: {
                        value: true,
                        message: "This field is required."
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Not a valid email address.",
                      }
                  })}
                />
                {/* {errors.email && <span>This field is required</span>} */}
                {errors.email && <span>{errors.email.message}</span>}
 
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input name="password" type="password" className="form-control" id="" aria-describedby="passwordInput"
                ref={register({
                    required:{
                        value: true,
                        message: "This field is required."
                    },
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                        message: 'Minimum eight characters, at least one letter, one number and one special character.'

                    }
                  })
                
                
                }
                /> 
                {errors.password && <span>{errors.password.message}</span>}   
            </div>

            <div className="form-group">
                <label htmlFor="passwordInput">Confirm Password</label>
                <input name="passwordRepeat"type="password" className="form-control" id="" aria-describedby="confirmPasswordInput"
                    ref={register({

                        required:{
                            value: true,
                            message: ""
                        },
                        validate: value => value === pw.current || 'Password mismatch.'
                    })}
                />
                 {errors.passwordRepeat && <span>{errors.passwordRepeat.message}</span>}        
            </div>
            <button type="submit" className="btn mx-auto">Register</button>
          
           
        </form>
       </div>
       );
}


export default Register;