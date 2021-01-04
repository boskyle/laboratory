import React from 'react';
import { useLocation } from "react-router-dom";

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
    // if user is logged in (userId is  pushed into localStorage) BUT info is empty (info.username pushed into localStorage is non existant) then send them to this form
    if (localStorage.getItem('userId') !== null && localStorage.getItem('userName') === null) {
    return (
        <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
                    <form className="h-75 p-4 d-flex flex-column justify-content-start" noValidate>
                        <h2 className="mx-auto">Let's Get Started</h2>
                        <div className="form-group">
                            <label htmlFor="emailInput">Username</label>
                            <input name="username" type="text" className="form-control" id="" aria-describedby="emailInput"/>
                        </div>

                    </form>


        </div>

    );
    }

return null;
}

export default Setup;