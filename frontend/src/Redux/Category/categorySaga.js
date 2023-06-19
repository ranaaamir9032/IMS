import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import {
  Header,
  get_all_categories,
  add_new_categorie,
  get_single_category,
  get_count_categories,
  delete_categorie,
  get_all_categories_with_vendors
} from "../../Constants/RequestConstants/constants";
import {
  ADD_NEW_CATEGORY,
  SHOW_ALL_CATEGORIES,
  GET_ALL_CATEGORIES,
  GET_SINGLE_CATEGORIES,
  SHOW_SINGLE_CATEGORIES,
  ADD_SUBCATEGORIES,
  SHOW_COUNT_CATEGORIES,
  GET_COUNT_CATEGORIES,
  DELETE_CATEGORY,
  SHOW_ALL_CATEGORIES_WITH_VENDORS,
  GET_ALL_CATEGORIES_WITH_VENDORS
} from "../Constants/categoryConstants";




function* getAll() {
  const res = yield axios.get(get_all_categories, {
    headers: Header,
  });
  yield put({ type: SHOW_ALL_CATEGORIES, data: res.data });
}


function* getAllWithVendors() {
  const res = yield axios.get(get_all_categories_with_vendors, {
    headers: Header,
  });
  yield put({ type: SHOW_ALL_CATEGORIES_WITH_VENDORS, data: res.data });
}



function* getSingleCategory(input) {
  const id = input.data;
  const res = yield axios.get(get_single_category + id,  {
    headers: Header,
  });
  yield put({ type: SHOW_SINGLE_CATEGORIES, data: res.data });
}


function* getCategoryCount() {

  const res = yield axios.get(get_count_categories,  {
    headers: Header,
  });
  yield put({ type: SHOW_COUNT_CATEGORIES, data: res.data });
}


function* addNewCategory(input) {
  const data = input.data;
  const res = yield axios.post(add_new_categorie, data, {
    headers: Header,
  });
}


function* addSubCategories(input) {
  const {id} = input.data
  const {data} = input.data;
  const res = yield axios.patch(add_new_categorie + id, data, {
    headers: Header,
  });
}


function* deleteCategory(input) {
  const id = input.data
  const res = yield axios.delete(delete_categorie + id,{
    headers: Header,
  });
  console.log(res);
}



function* CategorySaga() {
  yield takeEvery(GET_ALL_CATEGORIES, getAll);
  yield takeEvery(GET_ALL_CATEGORIES_WITH_VENDORS, getAllWithVendors);
  yield takeEvery(ADD_NEW_CATEGORY, addNewCategory);
  yield takeEvery(GET_SINGLE_CATEGORIES, getSingleCategory);
  yield takeEvery(GET_COUNT_CATEGORIES, getCategoryCount);
  yield takeEvery(ADD_SUBCATEGORIES, addSubCategories);
  yield takeEvery(DELETE_CATEGORY, deleteCategory);
}

export default CategorySaga;
