import { CREATE_TRASH, CLEAN_TRASH } from "../actionTypes";

export const createTrashItem = (item) => {
  return { type: CREATE_TRASH, payload: item };
};

export const cleanTrashItem = (key) => {
  return { type: CLEAN_TRASH, key: key };
};
