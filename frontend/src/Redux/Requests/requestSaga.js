import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

import {
  Header,
  get_all_requests,
  add_new_request,
  get_single_request,
  edit_request
} from "../../Constants/RequestConstants/constants"
import { ADD_NEW_REQUEST, EDIT_REQUEST, GET_ALL_REQUESTS, GET_SINGLE_REQUEST, SHOW_ALL_REQUESTS, SHOW_SINGLE_REQUEST } from "../Constants/requestConstants";


function* getAllRequests(input) {

  const { isFaulty } = input?.data;
  let queryParams = "";

  if (isFaulty) {
    queryParams = "?isFaulty=true";
  } else {
    queryParams = "?isFaulty=false";
  }

  const res = yield axios.get(get_all_requests + queryParams, {
    headers: Header,
  });
  yield put({ type: SHOW_ALL_REQUESTS, data: res.data });

}


function* editRequest(input) {
  const {data} = input.data;
  const {id} = input.data;
  const res = yield axios.patch(edit_request + id,data, {
    headers: Header,
  });
}


function* addNewRequest(payload) {
  const data = payload.data;
  const res = yield axios.post(add_new_request ,data, {
    headers: Header,
  });
}

function* getSingleRequest(input) {
  const id = input.data;
  const res = yield axios.get(get_single_request + id, {
    headers: Header,
  });
  yield put({ type: SHOW_SINGLE_REQUEST, data: res.data });
}

// function* getCount() {
//   const res = yield axios.get(get_organization_count, {
//     headers: Header,
//   });
//   yield put({ type: SHOW_ORGS_THIS_MONTH, data: res.data });
// }

function* RequestSaga() {
  yield takeEvery(GET_ALL_REQUESTS, getAllRequests);
  yield takeEvery(ADD_NEW_REQUEST, addNewRequest);
  yield takeEvery(GET_SINGLE_REQUEST, getSingleRequest);
//   yield takeEvery(GET_ORGS_THIS_MONTH, getCount);
  yield takeEvery(EDIT_REQUEST, editRequest);
}

export default RequestSaga;
