import { SHOW_ALL_ITEMS, SHOW_COUNT_ITEM, SHOW_SINGLE_ITEM } from "../Constants/itemConstants";

export const itemHandler = (data = [], action) => {
  switch (action.type) {
    case SHOW_ALL_ITEMS:
      return { items: action.data };

    case SHOW_SINGLE_ITEM:
      return { item: action.data };

    case SHOW_COUNT_ITEM:
      return { itemCount: action.data };

    default:
      return data;
  }
};
