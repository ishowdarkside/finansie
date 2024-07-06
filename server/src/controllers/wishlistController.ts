import AppError from "../utilities/AppError";
import catchAsync from "../utilities/catchAsync";
import User from "../models/User";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import { NextFunction, Response } from "express";

export const addWishlistItem = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login"));

    const { wishlist_item, price, priority } = req.body;
    if (!wishlist_item || !price || !priority)
      return next(new AppError(400, "Please provide all required fields"));

    user.wishlist.push({ wishlist_item, price, priority, total_saved: 0 });

    await user.save({ validateBeforeSave: false });
    res.status(201).json({
      status: "success",
      message: "Item successfully added to wishlist",
    });
  }
);

export const deleteWishlistItem = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login"));

    const { wishlistItemId } = req.params;

    const itemIndex = user.wishlist.findIndex((e) =>
      e._id?.equals(wishlistItemId)
    );
    console.log(itemIndex);

    if (!itemIndex && itemIndex !== 0)
      return next(new AppError(404, "No item found"));

    user.wishlist.splice(itemIndex, 1);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Item deleted from wishlist",
    });
  }
);

export const updateSavedMoney = catchAsync(
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError(401, "Please login"));

    const { wishlistItemId } = req.params;
    const { saved_balance } = req.body;
    if (saved_balance <= 0)
      return next(
        new AppError(400, "Saved balance cannot be less or equal to null")
      );

    const item = user.wishlist.find((e) => e._id?.equals(wishlistItemId));
    if (!item) return next(new AppError(400, "Something went really wrong"));

    if (user.available_balance - saved_balance < 0)
      return next(
        new AppError(
          400,
          `You don't have enough balance on your plan to add ${saved_balance} to ${item.wishlist_item} savings.`
        )
      );

    if (saved_balance + item?.total_saved > item.price)
      return next(
        new AppError(
          400,
          `Adding ${saved_balance} exceed items price. Please make smaller payload`
        )
      );

    item.total_saved += saved_balance;
    user.available_balance -= saved_balance;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: `${saved_balance}KM added to  ${item.wishlist_item} milestone. ${
        item.price - item.total_saved
      } more to go`,
    });
  }
);
