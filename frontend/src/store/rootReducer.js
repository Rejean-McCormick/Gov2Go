 
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';

// Root reducer combining all individual reducers
const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    settings: settingsReducer,
});

export default rootReducer;
