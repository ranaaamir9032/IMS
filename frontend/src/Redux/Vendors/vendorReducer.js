import {
  SHOW_ALL_VENDORS,
  SHOW_COUNT_VENDORS,
  SHOW_SINGLE_VENDOR,
} from "../Constants/vendorConstants";

export const vendorHandler = (data = [], action) => {
  switch (action.type) {
    case SHOW_ALL_VENDORS:
      return { vendors: action.data };
    case SHOW_SINGLE_VENDOR:
      return { vendor: action.data };
    case SHOW_COUNT_VENDORS:
      return { vendorCount: action.data };
    default:
      return data;
  }
};
