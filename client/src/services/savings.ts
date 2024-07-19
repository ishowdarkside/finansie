import axios from "axios";
import { BASE_URL } from "../utils/url";
import { SavingType } from "../types/SavingsType";

export const getMySavings = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BASE_URL}/api/savings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.savings as SavingType[];
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.message);
    console.log(err);
  }
};

export const createSaving = async (formData: SavingType) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${BASE_URL}/api/savings`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.message);
  }
};
