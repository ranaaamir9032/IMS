import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {
  GET_ALL_ITEMS,
  ADD_NEW_ITEM,
  SHOW_ALL_ITEMS,
  SHOW_SINGLE_ITEM,
  GET_SINGLE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  SHOW_COUNT_ITEM,
  GET_COUNT_ITEM,
} from "../Constants/itemConstants";
import {
  Header,
  get_all_items,
  get_single_item,
  add_new_item,
  edit_item,
  get_item_count,
} from "../../Constants/RequestConstants/constants";

function* getAll() {
  const res = yield axios.get(get_all_items, {
    headers: Header,
  });
  yield put({ type: SHOW_ALL_ITEMS, data: res.data });
}

function* addNew(payload) {
  const data = payload.data;
  const res = yield axios.post(add_new_item, data, {
    headers: Header,
  });
  console.log(res);
}

function* getSingleItem(input) {
  const id = input.data;
  const res = yield axios.get(get_single_item + id, {
    headers: Header,
  });
  yield put({ type: SHOW_SINGLE_ITEM, data: res.data });
}


function* getItemCount() {
  const res = yield axios.get(get_item_count, {
    headers: Header,
  });
  yield put({ type: SHOW_COUNT_ITEM, data: res.data });
}

function* editItem(input) {
  const { id } = input.data;
  const { data } = input.data;
  const res = yield axios.patch(edit_item + id, data, {
    headers: Header,
  });
}


function* deleteItem(input) {
  const id = input.data;
  const res = yield axios.delete(edit_item + id, {
    headers: Header,
  });
  console.log(res)
}

function* ItemSaga() {
  yield takeEvery(GET_ALL_ITEMS, getAll);
  yield takeEvery(ADD_NEW_ITEM, addNew);
  yield takeEvery(GET_SINGLE_ITEM, getSingleItem);
  yield takeEvery(GET_COUNT_ITEM, getItemCount);
  yield takeEvery(EDIT_ITEM, editItem);
  yield takeEvery(DELETE_ITEM, deleteItem);
}

export default ItemSaga;
