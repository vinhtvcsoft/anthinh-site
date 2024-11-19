import { createSelector } from "reselect";
import { ILocationState } from "./reducer";

const selector = (state: { location: ILocationState }) =>
  state.location;

const locations = createSelector(selector, ({ locations }: ILocationState) => locations);
const districts = createSelector(selector, ({ districts }: ILocationState) => districts);
const wards = createSelector(selector, ({ wards }: ILocationState) => wards);
const streets = createSelector(selector, ({ streets }: ILocationState) => streets);
const projects = createSelector(selector, ({ projects }: ILocationState) => projects);

export {
  locations,
  districts,
  wards,
  streets,
  projects,
};
