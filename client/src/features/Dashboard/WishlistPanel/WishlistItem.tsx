import { WishlistItemTypes } from "../../../types/WishlistItemType";
import styles from "./WishlistPanel.module.scss";

export default function WishlistItem({ item }: { item: WishlistItemTypes }) {
  const percentageSaved = (item.total_saved / item.price) * 100;

  return (
    <div
      className={`${styles.wishlistItem} ${
        percentageSaved === 100 ? styles.wishlistFullfiled : ""
      }`}
    >
      <span className={styles.wishlistItemName}>{item.wishlist_item}</span>
      <div className={styles.progressBarHolder}>
        <div className={styles.fullFilledBar}>
          <div
            className={styles.actualProgress}
            style={{ width: `${Math.round(percentageSaved)}%` }}
          ></div>
        </div>
        <span className={styles.status}>
          {item.total_saved} KM / {item.price} KM
        </span>
      </div>
    </div>
  );
}
