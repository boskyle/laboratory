import React from 'react';
import {useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import  UserProfile from './UserProfile/UserProfile';
import '../assets/fonts/index.css';
import "./dashboard.css";
import AsyncSelect from 'react-select/async';
import {searchBoxStyle} from './SearchBox/SearchBox';
import Settings from './Settings/Settings';
import {loadFromLocalStorage} from '../LocalStorage';



const DashboardContainer = (props) => {
    const history = useHistory();

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

  useEffect(() => {
    // console.log(selectedSearchInputValue.userlogin_id);
    if(selectedSearchInputValue !== null) {
        localStorage.setItem("dash-uid",selectedSearchInputValue.userlogin_id);
        history.push(`/${selectedSearchInputValue.username}`);
    }      
},[selectedSearchInputValue,history])


  
    if (props.urlParam !== "settings") {
        return  (
            // as part of row from parent (Dashboard)            
                    <>
                    <div className="col-9 col-sm-10 col-md-8 p-2">
                        <UserProfile 
                            userid={props.uid}
                            username={props.username}
                            firstname={props.firstname}
                            lastname={props.lastname}
                            address={props.country}
                            usernameSearched={props.urlParam}
                            gender={props.gender}
                            age={props.age}
                            height={props.height}
                            weight={props.weight}
                            activityLevel={props.activityLevel}
                            calories={props.calories}
                        />                  
                    </div>
                    <div className="col-sm-2 col-md-2 d-none d-md-block text-center p-2">
                          
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
                    </>
               
              
            
        );
    } else {return (
        <div className="col-9 col-md-10">
            <Settings/>
        </div>
    );}

}
export default DashboardContainer;

