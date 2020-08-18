import authReducer from './authReducer';
import cardReducer from './cardReducer';
import deckReducer from './deckReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    card: cardReducer,
    deck: deckReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;