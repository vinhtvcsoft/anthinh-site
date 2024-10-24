import { createSelector } from "reselect";
import { IFiltersState } from "./reducer";

const selector = (state: { filter: IFiltersState }) =>
  state.filter;

const locations = createSelector(selector, ({ locations }: IFiltersState) => locations);
const tsearch = createSelector(selector, ({ tsearch }: IFiltersState) => tsearch);
const price = createSelector(selector, ({ price }: IFiltersState) => price);
const area = createSelector(selector, ({ area }: IFiltersState) => area);
const mainDirection = createSelector(selector, ({ mainDirection }: IFiltersState) => mainDirection);
const bedroom = createSelector(selector, ({ bedroom }: IFiltersState) => bedroom);
const balconyDirection = createSelector(selector, ({ balconyDirection }: IFiltersState) => balconyDirection);

export { locations, tsearch, price, area, bedroom, mainDirection, balconyDirection };
