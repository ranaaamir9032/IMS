import {
  GET_COMPLAINTS_COUNT,
  GET_ALL_COMPLAINTS,
  GET_SINGLE_COMPLAINT,
  ADD_NEW_COMPLAINT,
  RESOLVE_COMPLAINT,
} from "../Constants/complaintConstants";

export const getAllComplaints = (data) => {
  return {
    type: GET_ALL_COMPLAINTS,
    data,
  };
};

export const getSingleComplaint = (data) => {
  return {
    type: GET_SINGLE_COMPLAINT,
    data,
  };
};

export const getComplaintsCount = () => {
  return {
    type: GET_COMPLAINTS_COUNT,
  };
};

export const resolveComplaint = (data) => {
  return {
    type: RESOLVE_COMPLAINT,
    data,
  };
};

export const addNewComplaint = (data) => {
  return {
    type: ADD_NEW_COMPLAINT,
    data,
  };
};
