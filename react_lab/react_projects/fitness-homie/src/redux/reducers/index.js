import isLoggedInReducer from './isUserLoggedIn';
import userIdReducer from './userUid';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged:isLoggedInReducer,
    getUid:userIdReducer
})

export default allReducers;



