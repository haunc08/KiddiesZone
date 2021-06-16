import { CREATE_TRASH, CLEAN_TRASH, CLEAR_TRASH } from "../actionTypes";

export const createTrashItem = (item) => {
  return { type: CREATE_TRASH, payload: item };
};

export const cleanTrashItem = (key) => {
  return { type: CLEAN_TRASH, key: key };
};

export const clearAllTrashItems = () => {
  return { type: CLEAR_TRASH };
};
