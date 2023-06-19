import {
  ADD_NEW_CATEGORY,
  ADD_SUBCATEGORIES,
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_WITH_VENDORS,
  GET_COUNT_CATEGORIES,
  GET_SINGLE_CATEGORIES,
} from "../Constants/categoryConstants";

export const addNewCategory = (data) => {
  return {
    type: ADD_NEW_CATEGORY,
    data,
  };
};

export const getAllCategries = () => {
  return {
    type: GET_ALL_CATEGORIES,
  };
};


export const getAllCategriesWithVendors = () => {
  return {
    type: GET_ALL_CATEGORIES_WITH_VENDORS,
  };
};

export const getSingleCategory = (data) => {
  return {
    type: GET_SINGLE_CATEGORIES,
    data,
  };
};

export const getCategoryCount = () => {
  return {
    type: GET_COUNT_CATEGORIES,
  };
};

export const addSubCategories = (data) => {
  return {
    type: ADD_SUBCATEGORIES,
    data,
  };
};

export const deleteCategory = (data) => {
  return {
    type: DELETE_CATEGORY,
    data,
  };
};
