import {
  SHOW_ALL_COMPLAINTS,
  SHOW_COMPLAINTS_COUNT,
  SHOW_SINGLE_COMPLAINT,
} from "../Constants/complaintConstants";

export const complaintHandler = (data = [], action) => {
  switch (action.type) {
    case SHOW_COMPLAINTS_COUNT:
      return { ...data, compPerMonth: action.data };

    case SHOW_ALL_COMPLAINTS:
      return { ...data, complaints: action.data };

    case SHOW_SINGLE_COMPLAINT:
      return { ...data, complaint: action.data };

    default:
      return data;
  }
};
