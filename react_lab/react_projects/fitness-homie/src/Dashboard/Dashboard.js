import React from 'react';
import {useState,useEffect} from 'react';
import {useHistory,useParams} from "react-router-dom";
import {loadFromLocalStorage} from '../LocalStorage';
import {LoadBasicInfo,LoadFitnessInfo,getUidFromUsername} from './db-endpoints/loadProfile';
import  UserProfile from './UserProfile/UserProfile';
import '../assets/fonts/index.css';
import "./dashboard.css";
import AsyncSelect from 'react-select/async';
import {searchBoxStyle} from './SearchBox/SearchBox';
import {useDispatch} from 'react-redux';
import {userLoggedOut} from '../redux/actions';




function Dashboard() {

 
    // var to access passed variable from Login.js
    const history = useHistory();
    const {username} = useParams();


    const [userInfo, setUserInfo] = useState({
        username: '',
        firstname: '',
        lastname: '',
        address: '',
        country: '',
    });

    const [userFitness,setUserFitness] = useState({
        age: '',
        heightCm: '',
        weightLbs: '',
        gender: '',
        activity: '',
        bmr:'',
        calories: ''
    });

    const filterUsername =  (inputValue) => {
     
          return fetch ('http://127.0.0.1/laboratory/react_lab/react_projects/fitness-homie/src/Dashboard/SearchBox/usernameAsync.php',{
                method: 'POST',
                body:JSON.stringify(inputValue)
            }).then(res => res.json());
            
      
    }

    const [searchInputValue, setSearchInputValue] = useState('');
    const [selectedSearchInputValue, setSelectedSearchInputValue] = useState(null);
    
    const handleSearchInputChange = val => {
        setSearchInputValue(val);
    }
    
    const handleSelection = val => {
        setSelectedSearchInputValue(val);
    }
    // console.log("search input: "+searchInputValue);
 
   

    const [dashUid,setDashUid] = useState(undefined);
   

 
    useEffect( () => {
       
        console.log("who is logged: "+ loadFromLocalStorage('isLogged').isLogged[1]);
        console.log("url param: "+username);

        let isMounted = true;
    //    comment added
        LoadBasicInfo(dashUid).then(data => {
            if (isMounted) {
                if (data !== false) {
                    setUserInfo({
                        username: data.username,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        country: data.country
                    })
                }
            }
        })    
        return () => {isMounted = false};  
            // prevents memory leak, make sure that it is mounted first
         
    },[dashUid])

    // set DashUid everytime selected input from async dropdown is changed
    // make it local so on page refresh it retains the uid
    useEffect(() => {
        // console.log(selectedSearchInputValue.userlogin_id);
        if(selectedSearchInputValue !== null) {
            localStorage.setItem("dash-uid",selectedSearchInputValue.userlogin_id);
            history.push(`/${selectedSearchInputValue.username}`);
        }      
    },[selectedSearchInputValue])


    // if searching through browser
    useEffect(() => {
        getUidFromUsername(username).then(uid => {
          setDashUid(uid);
          
        })   
    },[username])
    

    const dispatch = useDispatch();


    const logOut = () => {
        dispatch(userLoggedOut());
        history.push("/");
    }
   
     
            return  (
                // main component (gridbox and will be injected)
                <div className="containerFluid">
                 
                    <div className="row">
                        <div className="col-3 col-sm-2 col-md-2 text-center border">
                        <button onClick={logOut}>Log out</button>
                        </div>
                        <div className="col-9 col-sm-10 col-md-8 ">
                            <UserProfile 
                                username={userInfo.username}
                                firstname={userInfo.firstname}
                                lastname={userInfo.lastname}
                                address={userInfo.country}
                                usernameSearched={username}
                            />                  
                        </div>
                        <div className="col-sm-2 col-md-2 d-none d-md-block text-center">
                              
                        <div className="d-flex flex-column align-items-center" style={{width:"100%",height:"100%"}}>
                            <AsyncSelect className="w-100 mt-3" 
                             cacheOptions    
                             placeholder="Discover.."                     
                             loadingMessage={() => 'searching...'}
                             noOptionsMessage={() => 'doesnt exist'} 
                             loadOptions={filterUsername}              
                             value={searchInputValue}
                             getOptionValue={e => e.username}
                             getOptionLabel={e => e.username}
                             onInputChange={handleSearchInputChange}
                             onChange={handleSelection}    
                             styles={searchBoxStyle}
                             components={{ DropdownIndicator:()=> null,IndicatorSeparator: () => null}}
                            />                  
                        </div>
                        
                        </div>
                    </div>
                </div>
            );
      

  
}
export default Dashboard;