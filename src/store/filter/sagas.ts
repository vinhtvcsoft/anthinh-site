import { all, takeLatest } from "redux-saga/effects";
import {
  suggestRequest,
  suggestRequestSuccess,
  requestFailure,
} from "./reducer";
import { ISuggestSearchParam } from "types";
import { request } from "store/utils";
import {
  suggest,
} from "services/api/location";

function* getSuggestAction({ payload }: { payload: { params: ISuggestSearchParam } }) {
  const { params } = payload;
  yield request({
    service: suggest,
    successAction: suggestRequestSuccess,
    failureAction: requestFailure,
    params,
  });
}
export default function* sagas() {
  yield all([takeLatest(suggestRequest, getSuggestAction)]);
}
