import axios from "axios";
import { BASE_URL } from "../utils/url";
import { SavingType } from "../types/SavingsType";

export const getMySavings = async function () {
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
