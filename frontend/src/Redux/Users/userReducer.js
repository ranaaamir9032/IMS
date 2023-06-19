import {
  SHOW_SINGLE_USER,
  SHOW_COUNT_THIS_MONTH,
  SHOW_LOGIN,
  LOGOUT,
  SHOW_ERROR,
  SHOW_ALL_USERS,
} from "../Constants/userConstants";
import { outLocal } from "../../utils/HelperFunctions/helperFunctions";

const initialState = {
  token: outLocal("token"),
  role: outLocal("user-role"),
  users: [],
};

export const userHandler = (data = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGIN:
      return { ...data, token: action.data, role: action.user };

    case SHOW_ERROR:
      return { error: action.data };

    case SHOW_ALL_USERS:
      return { ...data, admins: action.data };

    case SHOW_SINGLE_USER:
      return { ...data, user: action.data };

    case SHOW_COUNT_THIS_MONTH:
      return { ...data, adminsPerMonth: action.data };

    case LOGOUT:
      localStorage.clear();
      return (data = []);

    default:
      return data;
  }
};
