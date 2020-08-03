import authReducer from './authReducer';
import cardReducer from './cardReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    card: cardReducer
});

export default rootReducer;