import { LoginInputs, RegistrationInputs } from "../types/inputValidation";
import axios from "./axios";

export const registerUser = async (inputs: RegistrationInputs) => {
  const { firstName, lastName, email, mobile } = inputs;
  try {
    const response = await axios.post("/auth/register", {
      firstName,
      lastName,
      email,
      mobile,
    });
    return { status: response?.status, message: response?.data?.message };
  } catch (error: any) {
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const LoginUser = async (inputs: LoginInputs) => {
  const { firstName, password } = inputs;
  try {
    const response = await axios.post("/auth/login", {
      firstName,
      password,
    });

    let { user, accessToken, refreshToken } = response?.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    return {
      status: response?.status,
      message: response?.data?.message,
      user,
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
