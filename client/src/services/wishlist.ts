import axios from "axios";
import { BASE_URL } from "../utils/url";
import { WishlistItemTypes } from "../types/WishlistItemType";

export const createWishlistItem = async (formData: WishlistItemTypes) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${BASE_URL}/api/wishlist`, formData, {
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

export const updateWishlistItem = async (id: string, formData: WishlistItemTypes) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(`${BASE_URL}/api/wishlist/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.response?.data.message || "Something went really wrong");
  }
};

export async function deleteWishlistItem(id: string) {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`${BASE_URL}/api/wishlist/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.message);
  }
}

export async function topupWishlistItem(id: string, saved_balance: number) {
  const jwt = localStorage.getItem("token");
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/wishlist/topup/${id}`,
      {
        saved_balance: +saved_balance,
      },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) throw new Error(err.message);
  }
}
