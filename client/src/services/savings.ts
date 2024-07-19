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
    if (axios.isAxiosError(err)) throw new Error(err.response?.data.message);
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
    if (axios.isAxiosError(err)) throw new Error(err.response?.data.message);
  }
};

export const deleteSaving = async (id: string) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`${BASE_URL}/api/savings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.response?.data.message);
  }
};

export const updateSaving = async (savingId: string, formData: SavingType) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${BASE_URL}/api/savings/${savingId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.response?.data.message);
  }
};
