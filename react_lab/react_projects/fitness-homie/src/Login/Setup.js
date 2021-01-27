import React from 'react';
import {useForm} from 'react-hook-form';
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import { FaInfoCircle } from 'react-icons/fa';
import {loadFromLocalStorage} from '../LocalStorage';
import {getUsernameFromId} from './db-endpoints/db-fetch';
import {useHistory} from 'react-router-dom';
import {isUsernameExist} from '../DB/validation';
import {useDispatch} from 'react-redux';
import {authenticateUserLoggedIn} from '../redux/actions';
import './setup.css';




var basicInfo;
var basicInfoArray = new Array();


let bmr_tool_tip_string = "An estimation on how much calories you need to consume to be able to sustain your weight."

// component instance
const Setup = ()  => {
    let registerBasicInfoApi = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Login/register-basic-info.php';
    let registerFitnessInfoApi = 'http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Login/register-basic-info-2.php';

    const {register, handleSubmit, errors, reset} = useForm();
    let history = useHistory();
    const dispatch = useDispatch();

let activity = [
    ['bmr', 1],
    ['sedentary',1.2],
    ['lightly-active', 1.375],
    ['moderately-active',1.55],
    ['very-active', 1.725],
    ['extra-active', 1.9],
];

    
    const [isFormSubmitted,setFlag] = useState(false);
    const [country,setCountry] = useState('');
    const [region, setRegion] = useState('');
   
    // dropdown
    const [value,setValue]=useState('bmr');
    const [gender,setGender]=useState('Male');
    const [feet, setFeet]=useState('5');
    const [inches,setInches]=useState('5');


    
const selectCountry = (val) => {
    setCountry(val);
}

const selectRegion = (val) => {
    setRegion(val);
}

const dropDownChange = (e) => {
    setValue(e.target.value);   
}

const dropDownGender = (e) => {
    setGender(e.target.value);   
}

const dropDownFeet = (e) => {
    setFeet(e.target.value);
}
const dropDownInches = (e) => {
    setInches(e.target.value);
}



/* initialize bascInfo object to fill in values:
    username
    firstname
    lastname
    country

    setState of Flag to true (initially 0) to invoke a re-render of the second form.
    reset() the react-hook-form object to clean and re-use for the second form.
*/
const onSubmit = formData => {
    
    console.log("submit worked!");
        basicInfo = {   uid:loadFromLocalStorage("isLogged").isLogged[1][0],
                        username: formData.username,
                        firstname: formData.firstname,
                        lastname: formData.lastname,
                        country: country+','+region,                   
};

    basicInfoArray.push(basicInfo);
    setFlag(true);
    reset();

}


// where all the submissions get posted

const onSubmit2 = async formData => {

    console.log("submit 2 worked!");
    let height_cm = inchesToCentimeters(parseInt(feet),parseInt(inches));
    let bmr = calculateBMR(gender,formData.weight,height_cm,formData.age);
    let caloric_needs = calculateCalories(bmr,value);

    
    basicInfo = {
        bmr: bmr,
        calories: caloric_needs,
        weight_lbs: parseInt(formData.weight),
        activity_level: value,
        gender: gender,
        height_cm: height_cm,
        age: parseInt(formData.age)
    }
    basicInfoArray.push(basicInfo);
    console.log(basicInfoArray);



    await fetch (registerBasicInfoApi, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type':'application/json'
        },
        body: JSON.stringify(basicInfoArray[0])
    }).then(response => response.text())
        .then(response => console.log("SUCCESS"))
            .catch(error => console.log(error));


    
    await fetch (registerFitnessInfoApi, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            uid: basicInfoArray[0].uid,
            age: basicInfoArray[1].age,
            gender: basicInfoArray[1].gender,
            height: basicInfoArray[1].height_cm,
            weight: basicInfoArray[1].weight_lbs,
            activity_level: basicInfoArray[1].activity_level,
            bmr: basicInfoArray[1].bmr,
            calories: basicInfoArray[1].calories
        })
    }).then(response => response.text())
            .then(response => console.log("SUCCESS"))
                .catch(error => console.log(error))


    // dispatch
    console.log(loadFromLocalStorage('isLogged').isLogged);
    dispatch(authenticateUserLoggedIn(loadFromLocalStorage('isLogged').isLogged[1][0],basicInfoArray[0].username))
    // push to dashboard
    history.push(`/${basicInfoArray[0].username}`);

}

    const [isNull, checkSecond] = useState(undefined);

   
    let selector = useSelector(state => state.isLogged);

    useEffect (() => {
        if(loadFromLocalStorage('isLogged').isLogged[1] !== undefined)
        {
            checkSecond(loadFromLocalStorage('isLogged').isLogged[1][1]);
        }
    },[loadFromLocalStorage('isLogged').isLogged[1]]);
    

    // if user logged in but no username yet
    if (loadFromLocalStorage('isLogged').isLogged[0] === true && loadFromLocalStorage("isLogged").isLogged[1][1] === null) {
        if(isFormSubmitted === false) {      
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
                                <div className="form-group">
                                <label htmlFor="emailInput">Location (Optional)</label><br></br>
                                <CountryDropdown value={country}  onChange={selectCountry}className="countryInput mr-4"/>
                                <RegionDropdown country={country} value={region}  onChange={selectRegion} className="regionInput"/>
                                
        
                                </div>
                                <button type="submit" className="btn mx-auto">Next</button>
                            </form>
        
        
                </div>      
            )
        } else {return (
            <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center">
      
                <form className="h-75 p-4 d-flex flex-column justify-content-start text-center" onSubmit={handleSubmit(onSubmit2)} noValidate>
                    <span>
                    <h2 className="mx-auto" style={{fontSize: "0.80em"}}>LETS CALCULATE YOUR CALORIC NEEDS     
                    <FaInfoCircle  className="text-info ml-3" style={{position:"relative",fontSize:"0.5em"}}
                    data-toggle="tooltip" data-placement="bottom" title={bmr_tool_tip_string}
                    /></h2>              
                    </span>
                                                                
                    <div className="form-group mx-auto">
                        <label htmlFor="ageInput"><b>Age</b></label>
                        <input name="age" type="text" className="form-control w-25 text-center mx-auto" id="" aria-describedby="emailInput"
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: "Age is required!"
                                            },
                                            validate: {                                              
                                                positive: (value) => parseInt(value, 10) > 0,
                                                tooOld: (value) => parseInt(value, 10) < 120,
                                            },
                                            pattern: {
                                                value: /^[1-9][0-9]*$/,
                                                message: "Incorrect age format!"
                                            }                                                                           
                                        })}                                
                                        />
                        {errors.age && <span>{errors.age.message}</span>}
                        {errors.age?.type === "tooOld" && <span>Too old.</span>}
                        {errors.age?.type === "positive" && <span>You can't be 0 years old silly.</span>}
                    </div>
                <div className="form-group mb-0 mt-2">
                <label htmlFor="ageInput" style={{display:"block"}}><b>Activity</b></label>
                    <select value={value} onChange={dropDownChange} className="w-75 mx-auto" aria-describedby="activityInput">
                         <option value={activity[0][0]}>no exercise</option>
                         <option value={activity[1][0]}>little or no exercise, desk job</option>
                         <option value={activity[2][0]}>light exercise/ sports 1-3 days/week</option>
                         <option value={activity[3][0]}>moderate exercise/ sports 6-7 days/week</option>
                         <option value={activity[4][0]}>hard exercise every day, or exercising 2 xs/day</option>
                         <option value={activity[5][0]}>hard exercise 2 or more times per day, or training for marathon, or triathlon, etc.. </option>
                    </select>
                </div>
                <div className="form-group mb-0 mt-2">
                    <label htmlFor="genderInput" style={{display:"block"}}><b>Gender</b></label>
                    <select value={gender} onChange={dropDownGender} className="w-25 mx-auto text-center" aria-describedby="genderInput">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>          
                    </select>
                </div>
                <div className="form-group mb-0 mt-2">
                    <label htmlFor="feetInput"  className="mb-2"style={{display:"block"}}><b>Height</b></label>
                    <label htmlFor="feetInput">Feet</label>
                    <select value={feet} onChange={dropDownFeet} className="w-25 text-center ml-2 mr-2" aria-describedby="feetInput">
                        <option value="3">3</option>
                        <option value="4">4</option> 
                        <option value="5">5</option>   
                        <option value="6">6</option>
                        <option value="7">7</option>                
                    </select>
                    <label htmlFor="inchesInput">Inches</label>
                    <select value={inches} onChange={dropDownInches} className="w-25 text-center ml-2" aria-describedby="feetInput">
                        <option value="0">0</option>
                        <option value="1">1</option> 
                        <option value="2">2</option>   
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option> 
                        <option value="7">7</option>   
                        <option value="8">8</option>
                        <option value="9">9</option>   
                        <option value="10">10</option>
                        <option value="11">11</option> 
                        <option value="12">12</option>            
                    </select>
                </div>

                <div className="form-group mb-1">
                <label htmlFor="weightInput"><b>Weight (lbs)</b></label>
                <input name="weight" type="text" className="form-control w-25 text-center mx-auto" id="" aria-describedby="weightInput"
                ref={register({
                    required: {
                        value: true,
                        message: "Weight is required"
                    },

                    validate: {
                        notPossible: (value) => parseInt(value, 10) <= 1000
                    },
                    pattern: {
                        value: /^[1-9][0-9]*$/,
                        message: "Incorrect weight format!"
                    }   
                    
                })}           
                />
                 {errors.weight && <span>{errors.weight.message}</span>}
                 {errors.weight?.type === "notPossible" && <span>Not possible.</span>}
                </div>

            <button type="submit" className="btn mx-auto">Done</button>
                </form>
                


            </div>


        );}
  
                               
    } else {return null}

  
} 


// rule of thumb, functions that dont have state change can go out of function
const inchesToCentimeters = (feet,inches) => {

    let multiplier_to_inches = 12;
    let multiplier_to_cm = 2.54;

    let finalCentimeters = ((multiplier_to_inches * feet) + inches) * multiplier_to_cm;

    return ~~finalCentimeters;
}

const calculateBMR = (gender,bodyweight,height,age) => {
    if (gender === "Male")
    {
        // metric
        let rounded = (10 * (bodyweight/2.205)) + (6.25 * height) - (5 * age) + 5;
        // similar to casting to int
        return ~~rounded;
       
    } else if (gender === "Female") {
        // metric
        let rounded = (10 * (bodyweight/2.205)) + (6.25 * height) - (5 * age) + 5 - 161;
        // similar to casting to int
        return ~~rounded;
    }

}
const calculateCalories = (bmr,activity) => {
    switch (activity) {
        case "bmr":
            return ~~(bmr * 1.0);
        case "sedentary":
            return ~~(bmr * 1.2);
        case "lightly-active":
            return ~~(bmr * 1.375);
        case "moderately-active":
            return ~~(bmr * 1.55);
        case "very-active":
            return ~~(bmr * 1.725);
        case "extra-active":
            return ~~(bmr * 1.9);
        default:
            return ~~(bmr);
    }

}




export {inchesToCentimeters,calculateBMR,calculateCalories};
export default Setup;
