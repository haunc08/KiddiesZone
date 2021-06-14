import { CREATE_TRASH, CLEAN_TRASH, CLEAR_TRASH } from "../actionTypes";

const trashItemsReducer = (trashItems = [], action) => {
  switch (action.type) {
    case CREATE_TRASH:
      return [...trashItems, action.payload];
    case CLEAN_TRASH:
      return trashItems.filter((item) => item.key !== action.key);
    case CLEAR_TRASH:
      return [];
    default:
      return trashItems;
  }
};

export default trashItemsReducer;
