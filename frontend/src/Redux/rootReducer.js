import { combineReducers } from "redux";
import { organizationHandler } from "./Organizations/orgReducers";
import { userHandler } from "./Users/userReducer";
import { complaintHandler } from "./Complaints/complaintReducers";
import { categoryHandler } from "./Category/categoryReducer";
import { vendorHandler } from "./Vendors/vendorReducer";
import { itemHandler } from "./Inventory/itemReducer";
import { requestHandler } from "./Requests/requestReducer";


export default combineReducers({
    organizationHandler,
    userHandler,
    complaintHandler,
    categoryHandler,
    vendorHandler,
    itemHandler,
    requestHandler
})