import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { toast } from "react-toastify";

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token") || "";

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const successInterceptor = (response: AxiosResponse) => {
  return response;
};

export const errorInterceptor = async (error: AxiosError) => {
  const status = error.response?.status;
  const message =
    (error.response?.data as any)?.message ||
    (status === 401
      ? "인증이 필요합니다."
      : "요청 처리 중 오류가 발생했습니다.");

  if (status === 401) {
    // 로그인 필요 상황
    console.warn("❗️Unauthorized error: Redirecting to login");
    localStorage.removeItem("token");

    toast.error(message);
    window.location.href = "/signin";
  } else if (status === 403) {
    toast.error("접근 권한이 없습니다.");
  } else {
    toast.error(message);
  }

  console.error({
    status,
    data: error.response?.data,
  });

  return Promise.reject(error);
};
