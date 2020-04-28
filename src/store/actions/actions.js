

export const getStores = () => {
    return {
        type: "GET_USERS"
    }
}

export const enableForm = (formVals) => {
    return {
        type: "ENABLE_FORM",
        vals: formVals,
        enableForm: true,
    }
}

export const openForm = (formVal)=>{
    console.log("fmm    ",formVal)
    return {
        type: "FORM_VAL",
        val: formVal
    }
}

export const deleteRecord = (formVal)=>{
    console.log("fmm    ",formVal)
    return {
        type: "DELETE_RECORD",
        val: formVal
    }
}

export const addStore = (formVals) => {
    return {
        type: "ADD_STORE",
        vals: formVals,
    }
}

export const updateStore = (formVals) => {
    return {
        type: "UPDATE_STORE",
        vals: formVals,
    }
}

export const reloadPage = (formVals) => {
    return {
        type: "RELOAD_FORM",
        vals: {},
    }
}