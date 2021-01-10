import isLoggedInReducer from './isUserLoggedIn';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged:isLoggedInReducer
})

export default allReducers;



