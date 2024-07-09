import axios from "axios";
import { LoginTypes } from "../types/LoginTypes";
import { RegistrationTypes } from "../types/RegistrationTypes";
import { UserInterface } from "../types/UserTypes";
import { BASE_URL } from "../utils/url";
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

export async function getCurrentlyLoggedInUser(token: string) {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "fail") return response.data;
    return response.data.user as UserInterface;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response;
    }
  }
}
