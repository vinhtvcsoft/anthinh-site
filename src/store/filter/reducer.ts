/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { ILocationModel, ESearchType, EDirection } from 'types';


interface IFiltersState {
  locations: ILocationModel[];
  tsearch: ESearchType;
  price: number[];
  area: number[];
  bedroom: number[];
  mainDirection: EDirection[];
  balconyDirection: EDirection[];
}
// // TODO: Store design
const initialState: IFiltersState = {
  locations: [],
  tsearch: ESearchType.B,
  price: [0, 10000],
  area: [0, 150],
  bedroom: [],
  mainDirection: [],
  balconyDirection: []
};
const slice = createSlice({
  name: "autocomplete",
  initialState: initialState,
  reducers: {
    updFilterRequest: (
      state,
      data: {
        payload: {
          locations?: ILocationModel[],
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
  },
});

const { actions, reducer } = slice;
const { updFilterRequest } = actions;

export { updFilterRequest };
export type { IFiltersState };
export default reducer;
