import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_ORGANIZATIONS,
  ADD_NEW_ORGANIZATION,
  SHOW_ALL_ORGANIZATIONS,
  GET_SINGLE_ORGANIZATION,
  SHOW_SINGLE_ORGANIZATION,
  GET_ORGS_THIS_MONTH,
  SHOW_ORGS_THIS_MONTH,
  EDIT_ORGANIZATION,
  DELETE_ORGANIZATION,
} from "../Constants/orgConstats";
import {
  Header,
  get_all_organizations,
  get_single_organization,
  get_organization_count,
  add_new_organization,
  edit_organization,
  delete_organization
} from "../../Constants/RequestConstants/constants"


function* getAll() {
  const res = yield axios.get(get_all_organizations, {
    headers: Header,
  });
  yield put({ type: SHOW_ALL_ORGANIZATIONS, data: res.data });
}

function* addNew(payload) {
  const data = payload.data;
  const res = yield axios.post(add_new_organization,data, {
    headers: Header,
  });
}


function* editOrganization(input) {
  const {data} = input.data;
  const {id} = input.data;
  const res = yield axios.patch(edit_organization + id,data, {
    headers: Header,
  });
}


function* deleteOrganization(input) {
  const id = input.data;
  const res = yield axios.delete(delete_organization + id,{
    headers: Header,
  });
  console.log(res)
}




function* getSingleOrganization(input) {
  const id = input.data;
  const res = yield axios.get(get_single_organization + id, {
    headers: Header,
  });
  yield put({ type: SHOW_SINGLE_ORGANIZATION, data: res.data });
}

function* getCount() {
  const res = yield axios.get(get_organization_count, {
    headers: Header,
  });
  yield put({ type: SHOW_ORGS_THIS_MONTH, data: res.data });
}

function* OrganizationSaga() {
  yield takeEvery(GET_ALL_ORGANIZATIONS, getAll);
  yield takeEvery(ADD_NEW_ORGANIZATION, addNew);
  yield takeEvery(GET_SINGLE_ORGANIZATION, getSingleOrganization);
  yield takeEvery(GET_ORGS_THIS_MONTH, getCount);
  yield takeEvery(EDIT_ORGANIZATION, editOrganization);
  yield takeEvery(DELETE_ORGANIZATION, deleteOrganization);
}

export default OrganizationSaga;
