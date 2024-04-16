import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

interface IAxiosRequest extends InternalAxiosRequestConfig<any> {
  notUseToken?: boolean;
  manualToken?: string;
}

const axiosInstance = axios.create();
// @ts-ignore
axiosInstance.defaults.baseURL = import.meta.env.VITE_PUBLIC_API;
axiosInstance.interceptors.request.use(
  async (request: IAxiosRequest) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
