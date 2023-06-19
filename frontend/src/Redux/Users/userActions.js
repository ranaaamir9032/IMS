import {
  LOGIN,
  LOGOUT,
  GET_ALL_USERS,
  CREATE_USER,
  GET_SINGLE_USER,
  GET_COUNT_THIS_MONTH,
  EDIT_USER,
  DELETE_USER,
} from "../Constants/userConstants";

export const userLogin = (data) => {
  return {
    type: LOGIN,
    data,
  };
};

export const getSingleUser = (data) => {
  return {
    type: GET_SINGLE_USER,
    data,
  };
};

export const getAdminCount = () => {
  return {
    type: GET_COUNT_THIS_MONTH,
  };
};



export const deleteUser = (data) => {
  return {
    type: DELETE_USER,
    data
  };
};


export const editUser = (data) => {
  return {
    type: EDIT_USER,
    data
  };
};




export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const getAllUsers = () => {
  return {
    type: GET_ALL_USERS,
  };
};

export const createUser = (data) => {
  return {
    type: CREATE_USER,
    data,
  };
};
