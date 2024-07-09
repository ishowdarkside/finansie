import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/url";
import { RegistrationTypes } from "../types/RegistrationTypes";
import { LoginTypes } from "../types/LoginTypes";
export async function registerService(formData: RegistrationTypes) {
  try {
    const data = await axios.post(`${BASE_URL}/api/auth/register`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    return data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return e.response;
    }
  }
}

export async function loginService(formData: LoginTypes) {
  try {
    const data = await axios.post(`${BASE_URL}/api/auth/login`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    return data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return e.response;
    }
  }
}