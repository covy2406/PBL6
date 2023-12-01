import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://0.tcp.ap.ngrok.io:19912/api",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
  // config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'; // Thay đổi thành nguồn của trang web của bạn
  // config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
  // config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    // Do something before request is sent
    // const accessToken = localStorage.getItem('access_token');
    // console.log(accessToken);
    // console.log('access_token_local', accessToken);
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    // }
    // if (accessToken && accessToken !== 'undefined' && accessToken !== null) {
    //   config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    // }
    
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
// export const setHeaderConfigAxios = (access_token) => {
  
//   if(access_token) {
//     axiosClient.defaults.headers.common["Authorization"] = access_token
//       ? "Bearer " + access_token
//       : "";
//   }else {
//     delete axiosClient.defaults.headers.common["Authorization"];
//   }
// };