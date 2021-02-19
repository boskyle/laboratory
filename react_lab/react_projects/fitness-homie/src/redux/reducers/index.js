import {loggedInReducer,editBasicReducer} from './isUserLoggedIn';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged:loggedInReducer,
    editBasic:editBasicReducer
})

export default allReducers;



