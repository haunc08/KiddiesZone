import { combineReducers } from "redux";

import trashItemsReducer from "./trashItems";

const allReducers = combineReducers({
  trashItems: trashItemsReducer,
});

export default allReducers;
