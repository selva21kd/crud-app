import axios from 'axios';
import { CONFIG } from '../../utils/config';
import { browserHistory } from 'react-router-v3'

function dataServices({ getState }) {
    return    next => async action => {
        var varState = getState(); 
        switch(action.type)
        {
            case "GET_USERS": 
                axios.get(CONFIG.API_URL + "stores")
                    .then(response =>{
                        action.response = response.data;
                        next(action);

                    });
                break;
            case "ADD_STORE":
                axios.post( CONFIG.API_URL + "add-store" ,  action.vals  )  
                    .then(response =>{
                        alert("Store Added Successfully !");
                        action.stores = response.data;
                        next(action);
                    })
                break;

            case "UPDATE_STORE":
                console.log("Action         ", action)
                axios.post( CONFIG.API_URL + "update-store/" + action.vals.id, action.vals )  
                    .then(response =>{
                        alert("Store Updated Successfully !");
                        action.stores = response.data;
                        next(action);
                    })
                break;
            
            case "DELETE_RECORD":
                axios.post( CONFIG.API_URL + "delete-store" ,  action.val  )  
                    .then(response =>{
                        alert("Store Deleted Successfully !");
                        action.stores = response.data;
                        next(action);
                    })
                break;

            default:
                next(action);
    
        } 
    }
  }

export default dataServices; 