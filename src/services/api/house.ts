import { IHouseItem, IHouseQuey } from "types";
import {
    // handleGet,
    // handleGetData,
    handlePost,
    // handlePut,
    // handleDelete,
} from "../utils";

const get = (params: IHouseQuey, callback?: (data: any) => void) => {
    return handlePost(`House/query`, params, callback);
};


const add = (params: IHouseItem, callback?: (data: any) => void) => {
    return handlePost(
        `House`,
        params,
        callback
    );
};


export { add, get };
