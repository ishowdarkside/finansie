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

export const updateWishlistItem = async (
  id: string,
  formData: WishlistItemTypes
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${BASE_URL}/api/wishlist/${id}`,
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
    if (axios.isAxiosError(err))
      throw new Error(
        err.response?.data.message || "Something went really wrong"
      );
  }
};
