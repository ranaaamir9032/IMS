import {
  SHOW_ALL_CATEGORIES,
  SHOW_ALL_CATEGORIES_WITH_VENDORS,
  SHOW_COUNT_CATEGORIES,
  SHOW_SINGLE_CATEGORIES,
} from "../Constants/categoryConstants";

export const categoryHandler = (data = [], action) => {
  switch (action.type) {
    case SHOW_ALL_CATEGORIES:
      return { categories: action.data };
    case SHOW_SINGLE_CATEGORIES:
      return { category: action.data };
    case SHOW_COUNT_CATEGORIES:
      return { categoryCount: action.data };
    case SHOW_ALL_CATEGORIES_WITH_VENDORS:
      return { categoriesWithVendors: action.data };
    default:
      return data;
  }
};
