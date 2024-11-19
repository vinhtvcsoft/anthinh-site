/** @format */
import { createSlice } from "@reduxjs/toolkit";
import {
  ESearchType,
  EDirection,
  ISuggestSearchParam,
  ILocationItem,
} from 'types';


interface IFiltersState {
  locations: ILocationItem[];
  tsearch: ESearchType | null;
  price: number[];
  area: number[];
  bedroom: number[];
  mainDirection: EDirection[];
  balconyDirection: EDirection[];
  options: ILocationItem[];
}
// // TODO: Store design
const initialState: IFiltersState = {
  locations: [],
  tsearch: null,
  price: [0, 10000],
  area: [0, 150],
  bedroom: [],
  mainDirection: [],
  balconyDirection: [],
  options: []
};
const slice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    updFilterRequest: (
      state,
      data: {
        payload: {
          locations?: ILocationItem[],
          tsearch?: ESearchType,
          price?: number[],
          area?: number[],
          bedroom?: number[],
          mainDirection?: EDirection[]
          balconyDirection?: EDirection[]
        }
      }
    ) => {
      return {
        ...state,
        ...data.payload
      };
    },
    suggestRequest: (state, _data: { payload: { params: ISuggestSearchParam } }) => ({
      ...state,
      error: null,
      message: null,
      loading: true,
    }),
    suggestRequestSuccess: (
      state,
      { payload }: { payload: { data: ILocationItem[] } }
    ) => ({
      ...state,
      options: payload.data,
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
  updFilterRequest,
  suggestRequest,
  suggestRequestSuccess,
  requestFailure,
} = actions;

export {
  updFilterRequest,
  suggestRequest,
  suggestRequestSuccess,
  requestFailure,
};
export type { IFiltersState };
export default reducer;
