import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {
  GET_COMPLAINTS_COUNT,
  SHOW_COMPLAINTS_COUNT,
  SHOW_ALL_COMPLAINTS,
  GET_ALL_COMPLAINTS,
  GET_SINGLE_COMPLAINT,
  SHOW_SINGLE_COMPLAINT,
  ADD_NEW_COMPLAINT,
  RESOLVE_COMPLAINT,
} from "../Constants/complaintConstants";
import {
  Header,
  get_all_complaints,
  get_single_complaint,
  add_new_complaint,
  get_complaints_count,
  resolve_complaint,
} from "../../Constants/RequestConstants/constants";

function* getAllComplaints(input) {
  const { isAdmin } = input?.data;
  let queryParams = "";

  if (isAdmin) {
    queryParams = "?isAdmin=true";
  } else {
    queryParams = "?isAdmin=false";
  }
  try {
    const res = yield axios.get(get_all_complaints + queryParams, {
      headers: Header,
    });
    yield put({ type: SHOW_ALL_COMPLAINTS, data: res.data });
  } catch (error) {
    console.log(error);
  }
}

function* getSingleComplaint(input) {
  const id = input.data;
  const res = yield axios.get(get_single_complaint + `${id}`, {
    headers: Header,
  });
  yield put({ type: SHOW_SINGLE_COMPLAINT, data: res.data });
}


function* resolveComplaint(input) {
  const id = input.data;
  console.log(Header);
  try {
    const response = yield fetch(resolve_complaint + id, {
      method: 'PATCH',
      headers: Header,
    });
    const data = yield response.json();
    console.log(data);
  } catch (error) {
    console.error('Error resolving complaint:', error);
  }
}





function* getCompCount() {
  try {
    const res = yield axios.get(get_complaints_count, {
      headers: Header,
    });
    yield put({ type: SHOW_COMPLAINTS_COUNT, data: res.data });
  } catch (error) {
  }
}

function* addNewComplaint(payload) {
  const data = payload.data;
  const res = yield axios.post(add_new_complaint, data, {
    headers: Header,
  });
  console.log(res)
}

function* ComplaintSaga() {
  yield takeEvery(GET_ALL_COMPLAINTS, getAllComplaints);
  yield takeEvery(GET_SINGLE_COMPLAINT, getSingleComplaint);
  yield takeEvery(GET_COMPLAINTS_COUNT, getCompCount);
  yield takeEvery(ADD_NEW_COMPLAINT, addNewComplaint);
  yield takeEvery(RESOLVE_COMPLAINT, resolveComplaint);
}

export default ComplaintSaga;
