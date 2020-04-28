

function appReducer(state = { stores: [], enableForm: false, formVal: {} }, action) {
    switch(action.type)
    {
        case "GET_USERS":
            return { ...state, stores : action.response };

        case "ENABLE_FORM":
            return { ...state, formVal: action.vals, enableForm: action.enableForm}
        
        case "RELOAD_FORM":
            return { ...state, formVal: action.vals, enableForm: true}

        case "ADD_STORE":
            return { ...state, stores: action.stores, formVal: {}}
        
        case "FORM_VAL":
            console.log("ACton  ",action.val)
            return { ...state, formVal: action.val}

        case "UPDATE_STORE":
            return {...state, stores: action.stores, formVal: {}}

        case "DELETE_RECORD":
            return { ...state, stores: action.stores, formVal: {}}
        default: 
            return state; 
    }
}

export default appReducer; 