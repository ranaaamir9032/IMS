import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_USERS,
  LOGIN,
  SHOW_ALL_USERS,
  CREATE_USER,
  SHOW_SINGLE_USER,
  GET_SINGLE_USER,
  GET_COUNT_THIS_MONTH,
  SHOW_COUNT_THIS_MONTH,
  SHOW_LOGIN,
  SHOW_ERROR,
  EDIT_USER,
  DELETE_USER,
} from "../Constants/userConstants";
import {
  storeToLocal,
  inLocal,
  outLocal,
} from "../../utils/HelperFunctions/helperFunctions";

import {
  Header,
  get_all_users,
  get_admin_count,
  add_new_user,
  get_single_user,
  user_login,
  edit_user,
  delete_user
} from "../../Constants/RequestConstants/constants";

function* userSignin(input) {
  const data = input.data;
  const res = yield axios.post(user_login, {
    email: data.email,
    password: data.password,
  });
  if (!res.data.error) {
    storeToLocal(res.data);

    inLocal(res.data.user.role.role);
    yield put({
      type: SHOW_LOGIN,
      data: res.data.token,
      user: res.data.user.role.role,
    });
  } else {
    yield put({ type: SHOW_ERROR, data: res.data.error });
  }
}

function* getSingleUser(input) {
  const userId = input.data;
  const res = yield axios.get(get_single_user + userId, {
    headers: Header,
  });
  yield put({ type: SHOW_SINGLE_USER, data: res.data });
}

function* editUser(input) {
  const { data } = input.data;
  const { id } = input.data;
  const res = yield axios.patch(edit_user + id, data, {
    headers: Header,
  });
}

function* deleteUser(input) {
  const  id  = input.data;
  const res = yield axios.delete(delete_user + id,{
    headers: Header,
  });
}

function* getAdminCount() {
  const res = yield axios.get(get_admin_count, {
    headers: Header,
  });
  yield put({ type: SHOW_COUNT_THIS_MONTH, data: res.data });
}

function* getAllUsers() {
  const res = yield axios.get(get_all_users, {
    headers: Header,
  });
  yield put({ type: SHOW_ALL_USERS, data: res.data });
}

function* createUser(input) {
  const { data } = input;
  const res = yield axios.post(add_new_user, data, {
    headers: Header,
  });
  yield put({ type: SHOW_ALL_USERS, data: res.data });
}

function* userSaga() {
  yield takeEvery(LOGIN, userSignin);
  yield takeEvery(GET_ALL_USERS, getAllUsers);
  yield takeEvery(CREATE_USER, createUser);
  yield takeEvery(GET_SINGLE_USER, getSingleUser);
  yield takeEvery(GET_COUNT_THIS_MONTH, getAdminCount);
  yield takeEvery(EDIT_USER, editUser);
  yield takeEvery(DELETE_USER, deleteUser);
}

export default userSaga;
