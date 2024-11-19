/** @format */
import { createSlice } from "@reduxjs/toolkit";
import {
  ILocationParam,
  IDistrictParam,
  IWardParam,
  IStreetParam,
  IProjectParam,
  ILocationItem,
  IDistrictItem,
  IWardItem,
  IStreetItem,
  IProjectItem
} from 'types';


interface ILocationState {
  locations: ILocationItem[];
  districts: IDistrictItem[];
  wards: IWardItem[];
  streets: IStreetItem[];
  projects: IProjectItem[];
}
// // TODO: Store design
const initialState: ILocationState = {
  locations: [],
  districts: [],
  wards: [],
  streets: [],
  projects: [],
};
const slice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    getLocationRequest: (state, _data: { payload: { params: ILocationParam } }) => ({
      ...state,
      error: null,
      message: null,
      loading: true,
    }),
    getLocationRequestSuccess: (
      state,
      { payload }: { payload: { data: ILocationItem[] } }
    ) => ({
      ...state,
      locations: payload.data,
      error: null,
      message: null,
      loading: false,
    }),
    getDistrictRequest: (state, _data: { payload: { params: IDistrictParam } }) => ({
      ...state,
      error: null,
      message: null,
      loading: true,
    }),
    getDistrictRequestSuccess: (
      state,
      { payload }: { payload: { data: IDistrictItem[] } }
    ) => ({
      ...state,
      districts: payload.data,
      error: null,
      message: null,
      loading: false,
    }),
    getWardRequest: (state, _data: { payload: { params: IWardParam } }) => ({
      ...state,
      error: null,
      message: null,
      loading: true,
    }),
    getWardRequestSuccess: (
      state,
      { payload }: { payload: { data: IWardItem[] } }
    ) => ({
      ...state,
      wards: payload.data,
      error: null,
      message: null,
      loading: false,
    }),
    getStreetRequest: (state, _data: { payload: { params: IStreetParam } }) => ({
      ...state,
      error: null,
      message: null,
      loading: true,
    }),
    getStreetRequestSuccess: (
      state,
      { payload }: { payload: { data: IStreetItem[] } }
    ) => ({
      ...state,
      streets: payload.data,
      error: null,
      message: null,
      loading: false,
    }),
    getProjectRequest: (state, _data: { payload: { params: IProjectParam } }) => ({
      ...state,
      error: null,
      message: null,
      loading: true,
    }),
    getProjectRequestSuccess: (
      state,
      { payload }: { payload: { data: IProjectItem[] } }
    ) => ({
      ...state,
      projects: payload.data,
      error: null,
      message: null,
      loading: false,
    }),
    requestFailure: (state, { payload }) => ({
      ...state,
      error: payload,
      message: null,
      loading: false,
    }),
  },
});

const { actions, reducer } = slice;
const {
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
} = actions;

export {
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
};
export type { ILocationState };
export default reducer;
