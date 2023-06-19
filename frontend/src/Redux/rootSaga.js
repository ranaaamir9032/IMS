import { fork } from "redux-saga/effects";
import OrganizationSaga from "./Organizations/orgSaga";
import userSaga from "./Users/userSaga";
import ComplaintSaga from "./Complaints/complaintSaga";
import CategorySaga from "./Category/categorySaga";
import VendorSaga from "./Vendors/vendorSaga";
import ItemSaga from "./Inventory/itemSaga";
import RequestSaga from "./Requests/requestSaga";



export default function* rootSaga(){
    yield fork(OrganizationSaga)
    yield fork(userSaga)
    yield fork(ComplaintSaga)
    yield fork(CategorySaga)
    yield fork(VendorSaga)
    yield fork(ItemSaga)
    yield fork(RequestSaga)
}