import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
})

export default rootReducer