import { http } from "../utils/http";

interface userType extends Promise<any> {
  svg?: string;
  code?: number;
  info?: object;
}

// get verification code
export const getVerify = (): userType => {
  return http.request("get", "/captcha");
};

// Log in
export const getLogin = (data: object) => {
  return http.request("post", "/login", { data });
};

// refresh token
export const refreshToken = (data: object) => {
  return http.request("post", "/refreshToken", { data });
};

// export const searchVague = (data: object) => {
//   return http.request("post", "/searchVague", { data });
// };
