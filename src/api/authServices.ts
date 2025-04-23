import { ILoginRequest, ISignupRequest } from "../types/IObjectTypes";
import { apiInstance } from "./apiConfig";

const prefix = "/auth";

export interface AuthResponse {
  token: string;
}

export const login = async (
  loginRequest: ILoginRequest
): Promise<AuthResponse> => {
  const response = await apiInstance.post<AuthResponse>(
    `${prefix}/login`,
    loginRequest
  );
  const token = response.data.token;

  if (!token) throw new Error("No token received");
  localStorage.setItem("token", token);

  return response.data;
};

export const signup = async (
  signupRequest: ISignupRequest
): Promise<AuthResponse> => {
  const response = await apiInstance.post<AuthResponse>(
    `${prefix}/signup`,
    signupRequest
  );
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem("token");
};
