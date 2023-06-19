import { GET_ALL_ITEMS, ADD_NEW_ITEM, GET_SINGLE_ITEM, EDIT_ITEM, DELETE_ITEM, GET_COUNT_ITEM } from "../Constants/itemConstants";



export const getAllItems = () => {
    return {
      type: GET_ALL_ITEMS,
    };
  };



  export const addNewItem = (data) => {
    return {
      type: ADD_NEW_ITEM,
      data
    };
  };



  export const getSingleItem = (data) => {
    return {
      type: GET_SINGLE_ITEM,
      data
    };
  };


  export const editItem = (data) => {
    return {
      type: EDIT_ITEM,
      data
    };
  };


  export const getItemCount = () => {
    return {
      type: GET_COUNT_ITEM,
    };
  };



  export const deleteItem = (data) => {
    return {
      type: DELETE_ITEM,
      data
    };
  };