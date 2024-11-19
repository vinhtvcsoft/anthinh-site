/** @format */

import { all } from "redux-saga/effects";
import filterSagas from "./filter/sagas";
import locationSagas from "./location/sagas";
import houseSagas from "./house/sagas";

export default function* rootSaga() {
  yield all([
    filterSagas(),
    locationSagas(),
    houseSagas(),
  ]);
}
