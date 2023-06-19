import { ADD_NEW_VENDOR, EDIT_VENDOR, GET_ALL_VENDORS , GET_COUNT_VENDORS, GET_SINGLE_VENDOR} from "../Constants/vendorConstants"



export const addNewVendor = (data) => {
    return{
        type: ADD_NEW_VENDOR,
        data
    }
}


export const getAllVendors = () => {
    return{
        type: GET_ALL_VENDORS
    }
}


export const editVendor = (data) => {
    return{
        type: EDIT_VENDOR,
        data
    }
}


export const getSingleVendor = (data) => {
    return{
        type: GET_SINGLE_VENDOR,
        data
    }
}


export const getVendorCount = () => {
    return{
        type: GET_COUNT_VENDORS
    }
}