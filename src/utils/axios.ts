/** @format */

import axios from 'axios';
// import { UserManager } from "oidc-client-ts"
// import { oidcConfig } from './constants'

// const userManager = new UserManager(oidcConfig);

const apiConfig = {
  baseURL: process.env.REACT_APP_BASE_URI,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// const authConfig = {
//   baseURL: process.env.REACT_APP_OIDC_AUTHORITY,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// };

// const authClient = axios.create(authConfig);
// authClient.interceptors.request.use(
//   async (req: any) => {
//     const user = await userManager.getUser();
//     const token = user?.access_token;
//     if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//     }

//     return req;
//   },
//   (err: any) => Promise.reject(err),
// );

const axiosClient = axios.create(apiConfig);
axiosClient.interceptors.request.use(
  async (req: any) => {
    // const user = await userManager.getUser();
    // const token = user?.access_token;
    // if (token) {
    //   req.headers.Authorization = `Bearer ${token}`;
    // }

    return req;
  },
  (err: any) => Promise.reject(err),
);

axiosClient.interceptors.response.use(
  (res: any) => Promise.resolve(res),
  async error => {
    // const originalRequest = error.config;

    // if (originalRequest && error.response && error.response.status === 401 && !originalRequest._retry) {
    //   // Token is expired
    //   originalRequest._retry = true;
    //   try {
    //     const user = await userManager.getUser();
    //     if (user && user.expired) { //
    //       // If the user's token is expired, refresh the token
    //       const newUser = await userManager.signinSilent();
    //       // Update the token in the error config
    //       originalRequest.headers['Authorization'] = 'Bearer ' + newUser?.access_token;
    //       // Retry the request
    //       return axios.request(originalRequest);
    //     } else if (user) {
    //       await userManager.signinRedirect();
    //       // const newUser = await userManager.signinPopup();
    //       // originalRequest.headers['Authorization'] = 'Bearer ' + newUser?.access_token;
    //       // // Retry the request
    //       // return axios.request(originalRequest);
    //     } else await userManager.signinRedirect();
    //   } catch (err) {
    //     // Handle the error
    //     // console.log(err);
    //     return Promise.reject(err);
    //   }
    // } else if (error.response && error.response.status === 401) {
    //   await userManager.signinRedirect();
    // }
    // // If the error is not a 401, do nothing with it
    // return Promise.reject(error);
    if (error.response) {
      // Handle specific status codes globally
      switch (error.response.status) {
        case 404:
          console.error('Error 404: Resource not found');
          break;
        case 500:
          console.error('Error 500: Internal server error');
          break;
        default:
          console.error(`Error ${error.response.status}:`, error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export {
  apiConfig,
  // authClient,
  axiosClient,
}
