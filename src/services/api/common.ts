// import { IFormKey, IShnItem } from "types";
import {
  // handleGet,
  // handleGetData,
  handlePost,
  // handlePut,
  // handleDelete,
} from "../utils";

// const get = (params: IQueryParam, callback?: (data: any) => void) => {
//   const { page = 0, pageSize = 10, ...ps } = params;

//   return handlePost(
//     `History/query?page=${page + 1}&pageSize=${pageSize}`,
//     {
//       ...ps,
//     },
//     callback
//   );
// };

const get = () => {
  return handlePost(
    `Common/query`, null
  );
};

export { get };
