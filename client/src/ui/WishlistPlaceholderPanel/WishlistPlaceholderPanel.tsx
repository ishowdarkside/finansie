import styles from "./WishlistPlaceholderPanel.module.scss";

export default function WishlistPlaceholderPanel() {
  return (
    <div className={styles.placeholderPanel}>
      <span>Wishlist item</span>
      <span>Date </span>
      <span>Progress </span>
      <span>Priority</span>
    </div>
  );
}
