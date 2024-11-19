export enum EDemand {
    B = "B",
    T = "T"
}
export interface IRealEstateItem {
    demand: EDemand | null;
}