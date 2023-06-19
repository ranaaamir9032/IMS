import { ADD_NEW_REQUEST, EDIT_REQUEST, EDIT_RETURN, GET_ALL_REQUESTS, GET_SINGLE_REQUEST } from "../Constants/requestConstants";

export const addNewRequest = (data) => {
  return {
    type: ADD_NEW_REQUEST,
    data,
  };
};


export const getAllRequests = (data) => {
  return {
    type: GET_ALL_REQUESTS,
    data
  };
};


export const getSingleRequest = (data) => {
  return {
    type: GET_SINGLE_REQUEST,
    data
  };
};


export const editRequest = (data) => {
  return {
    type: EDIT_REQUEST,
    data
  };
};


export const editReturn = (data) => {
  return {
    type: EDIT_RETURN,
    data
  };
};
