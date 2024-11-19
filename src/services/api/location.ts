import { ISuggestSearchParam, IDistrictParam, IWardParam, IStreetParam, IProjectParam } from "types";
import {
    // handleGet,
    // handleGetData,
    handlePost,
    // handlePut,
    // handleDelete,
} from "../utils";


const suggest = (params: ISuggestSearchParam, callback?: (data: any) => void) => {
    return handlePost(
        `Location/suggest`,
        params,
        callback
    );
};

const getLocation = (params: { ids: number[] }, callback?: (data: any) => void) => {
    return handlePost(
        `Location/location`,
        params,
        callback
    );
};

const getDistrict = (params: IDistrictParam, callback?: (data: any) => void) => {
    return handlePost(
        `Location/district`,
        params,
        callback
    );
};
const getWard = (params: IWardParam, callback?: (data: any) => void) => {
    return handlePost(
        `Location/ward`,
        params,
        callback
    );
};

const getStreet = (params: IStreetParam, callback?: (data: any) => void) => {
    return handlePost(
        `Location/street`,
        params,
        callback
    );
};

const getProject = (params: IProjectParam, callback?: (data: any) => void) => {
    return handlePost(
        `Location/project`,
        params,
        callback
    );
};

export { suggest, getLocation, getDistrict, getWard, getStreet, getProject };
