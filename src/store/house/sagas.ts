import { all, takeLatest } from "redux-saga/effects";
import {
  getHouseRequest,
  getHouseSuccess,
  addRequest,
  saveSuccess,
  // requestSuccess,
  requestFailure,
} from "./reducer";
import { IHouseItem, IHouseQuey } from "types";
import { request } from "store/utils";
import {
  get,
  add,
} from "services/api/house";

function* getAction({
  payload,
}: {
  payload: {
    params: IHouseQuey;
  };
}) {
  const { params } = payload;
  yield request({
    service: get,
    successAction: getHouseSuccess,
    failureAction: requestFailure,
    params,
  });
}

function* addAction({
  payload,
}: {
  payload: {
    data: IHouseItem;
  };
}) {
  const { data } = payload;
  yield request({
    service: add,
    successAction: saveSuccess,
    failureAction: requestFailure,
    params: data,
  });
}

export default function* sagas() {
  yield all([takeLatest(addRequest, addAction)]);
  yield all([takeLatest(getHouseRequest, getAction)]);
}
