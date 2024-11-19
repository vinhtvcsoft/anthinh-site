import { combineReducers } from "redux";
import filter from './filter/reducer';
import location from './location/reducer';
import house from './house/reducer';

export default combineReducers({
  filter,
  location,
  house,
});
