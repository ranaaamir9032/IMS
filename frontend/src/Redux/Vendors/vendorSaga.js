import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {
  ADD_NEW_VENDOR,
  GET_ALL_VENDORS,
  GET_SINGLE_VENDOR,
  SHOW_SINGLE_VENDOR,
  SHOW_ALL_VENDORS,
  SHOW_COUNT_VENDORS,
  GET_COUNT_VENDORS,
  EDIT_VENDOR,
} from "../Constants/vendorConstants";
import {
  Header,
  get_all_vendors,
  add_new_vendor,
  add_count_vendor,
  edit_vendor,
} from "../../Constants/RequestConstants/constants";

function* getAllVendors() {
  const res = yield axios.get(get_all_vendors, {
    headers: Header,
  });
  yield put({ type: SHOW_ALL_VENDORS, data: res.data });
}

function* addNew(payload) {
  const data = payload.data;
  const res = yield axios.post(add_new_vendor, data, {
    headers: Header,
  });
}

function* getSingleVendor(payload) {
  const id = payload.data;
  const res = yield axios.get(add_new_vendor + `${id}` , {
    headers: Header,
  });
  yield put({ type: SHOW_SINGLE_VENDOR, data: res.data });
}



function* getVendorCount() {
  const res = yield axios.get(add_count_vendor, {
    headers: Header,
  });
  yield put({ type: SHOW_COUNT_VENDORS, data: res.data });
}



function* editVendor(input) {
  const {id} = input.data;
  const {data} = input.data;

  const res = yield axios.patch(edit_vendor + id, data,{
    headers: Header,
  });
}

function* VendorSaga() {
  yield takeEvery(ADD_NEW_VENDOR, addNew);
  yield takeEvery(GET_ALL_VENDORS, getAllVendors);
  yield takeEvery(EDIT_VENDOR, editVendor);
  yield takeEvery(GET_SINGLE_VENDOR, getSingleVendor);
  yield takeEvery(GET_COUNT_VENDORS, getVendorCount);
}

export default VendorSaga;
