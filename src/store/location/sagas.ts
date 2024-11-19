import { all, takeLatest } from "redux-saga/effects";
import {
  getLocationRequest,
  getLocationRequestSuccess,
  getDistrictRequest,
  getDistrictRequestSuccess,
  getWardRequest,
  getWardRequestSuccess,
  getStreetRequest,
  getStreetRequestSuccess,
  getProjectRequest,
  getProjectRequestSuccess,
  requestFailure,
} from "./reducer";
import { ILocationParam, IDistrictParam, IWardParam, IStreetParam, IProjectParam } from "types";
import { request } from "store/utils";
import {
  suggest,
  getDistrict,
  getWard,
  getStreet,
  getProject,
} from "services/api/location";

function* getLocationAction({ payload }: { payload: { params: ILocationParam } }) {
  const { params } = payload;
  yield request({
    service: suggest,
    successAction: getLocationRequestSuccess,
    failureAction: requestFailure,
    params,
  });
}

function* getDistrictAction({ payload }: { payload: { params: IDistrictParam } }) {
  const { params } = payload;
  yield request({
    service: getDistrict,
    successAction: getDistrictRequestSuccess,
    failureAction: requestFailure,
    params,
  });
}

function* getWardAction({ payload }: { payload: { params: IWardParam } }) {
  const { params } = payload;
  yield request({
    service: getWard,
    successAction: getWardRequestSuccess,
    failureAction: requestFailure,
    params,
  });
}

function* getStreetAction({ payload }: { payload: { params: IStreetParam } }) {
  const { params } = payload;
  yield request({
    service: getStreet,
    successAction: getStreetRequestSuccess,
    failureAction: requestFailure,
    params,
  });
}

function* getProjectAction({ payload }: { payload: { params: IProjectParam } }) {
  const { params } = payload;
  yield request({
    service: getProject,
    successAction: getProjectRequestSuccess,
    failureAction: requestFailure,
    params,
  });
}

export default function* sagas() {
  yield all([takeLatest(getLocationRequest, getLocationAction)]);
  yield all([takeLatest(getDistrictRequest, getDistrictAction)]);
  yield all([takeLatest(getWardRequest, getWardAction)]);
  yield all([takeLatest(getStreetRequest, getStreetAction)]);
  yield all([takeLatest(getProjectRequest, getProjectAction)]);
}
