import {  createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import appReducer from "../reducer/appReducer";
import dataServices from '../services/dataServices';

//Combining root reducers
const rootReducer = combineReducers({
    globalReducer: appReducer,
});

//Configuring Store
const configureStore = createStore(rootReducer,applyMiddleware(thunk, dataServices));

export default configureStore; 
