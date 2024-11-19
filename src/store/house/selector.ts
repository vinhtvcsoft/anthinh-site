import { createSelector } from "reselect";
import { IHouseState } from "./reducer";

const selector = (state: { house: IHouseState }) =>
  state.house;

const error = createSelector(selector, ({ error }: IHouseState) => error);
const loading = createSelector(selector, ({ loading }: IHouseState) => loading);
const saving = createSelector(selector, ({ saving }: IHouseState) => saving);

const houseData = createSelector(selector, ({ houseData }: IHouseState) => houseData);
const houseCount = createSelector(selector, ({ houseCount }: IHouseState) => houseCount);

export {
  error,
  loading,
  saving,
  houseData,
  houseCount
};
