/** @format */
import { createSlice } from "@reduxjs/toolkit";
import {
  IHouseItem,
  IHouseInfo,
  IHouseQuey
} from 'types';


interface IHouseState {
  loading: boolean;
  saving: boolean;
  error: any;
  message: any;
  houseData: IHouseInfo[];
  houseCount: number;
}
// // TODO: Store design
const initialState: IHouseState = {
  loading: false,
  saving: false,
  error: false,
  message: null,
  houseData: [],
  houseCount: 0,
};
const slice = createSlice({
  name: "house",
  initialState: initialState,
  reducers: {
    getHouseRequest: (state, _data: { payload: { params: IHouseQuey } }) => ({
      ...state,
      error: null,
      message: null,
      loading: true,
    }),
    getHouseSuccess: (
      state,
      { payload }: { payload: { data: IHouseInfo[]; total: number } }
    ) => ({
      ...state,
      houseData: payload.data,
      houseCount: payload.total,
      error: null,
      message: null,
      loading: false,
    }),
    addRequest: (state, _data: { payload: { data: IHouseItem } }) => ({
      ...state,
      error: null,
      message: '',
      saving: true,
    }),
    saveSuccess: (state, { payload }) => ({
      ...state,
      saving: false,
      error: null,
      loading: false,
      message: payload,
    }),
    requestSuccess: (state, { payload }) => ({
      ...state,
      saving: false,
      error: null,
      message: payload,
      loading: false,
    }),
    requestFailure: (state, { payload }) => ({
      ...state,
      saving: false,
      error: payload,
      message: null,
      loading: false,
    }),
  },
});

const { actions, reducer } = slice;
const {
  getHouseRequest,
  getHouseSuccess,
  addRequest,
  saveSuccess,
  requestSuccess,
  requestFailure,
} = actions;

export {
  getHouseRequest,
  getHouseSuccess,
  addRequest,
  saveSuccess,
  requestSuccess,
  requestFailure,
};
export type { IHouseState };
export default reducer;
