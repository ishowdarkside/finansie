import { format } from "date-fns";
import { WishlistItemTypes } from "../../../types/WishlistItemType";
import styles from "./WishlistItem.module.scss";
import EditIcon from "../../../assets/editing.png";
import DollarSign from "../../../assets/dollar.svg";
import { useWishlistContext } from "../../../context/WishlistContext";

export default function WishlistItem({
  wishlistItem,
}: {
  wishlistItem: WishlistItemTypes;
}) {
  const { setActiveEditWishlist, changeModalState } = useWishlistContext();
  const percentageSaved =
    wishlistItem.total_saved / wishlistItem.price > 1
      ? 100
      : (wishlistItem.total_saved / wishlistItem.price) * 100;

  return (
    <div className={styles.wishlistItem}>
      <span className={styles.source}>{wishlistItem.wishlist_item}</span>
      <span>{format(new Date(wishlistItem.date_added), "dd/MM/yyyy")}</span>
      <div className={styles.progressBarHolder}>
        <div className={styles.fullFilledBar}>
          <div
            className={styles.actualProgress}
            style={{ width: `${Math.round(percentageSaved)}%` }}
          ></div>
        </div>
        <span className={styles.status}>
          {wishlistItem.total_saved} KM / {wishlistItem.price} KM
        </span>
      </div>
      <span className={styles[wishlistItem.priority]}>
        {wishlistItem.priority.toUpperCase()}
      </span>
      <div className={styles.absoluteBtnWrapper}>
        <button
          className={styles.editBtn}
          onClick={() => {
            setActiveEditWishlist(wishlistItem);
            changeModalState();
          }}
        >
          <img src={EditIcon} />
        </button>
        <button className={styles.editBtn}>
          <img src={DollarSign} />
        </button>
      </div>
    </div>
  );
}
