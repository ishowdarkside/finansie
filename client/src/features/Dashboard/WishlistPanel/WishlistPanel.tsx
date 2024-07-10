import { useUser } from "../../../hooks/useAuth";
import { WishlistItemTypes } from "../../../types/WishlistItemType";
import WishlistItem from "./WishlistItem";
import styles from "./WishlistPanel.module.scss";

export default function WishlistPanel(): JSX.Element {
  const {
    data: { wishlist },
    isPending,
  } = useUser();

  if (isPending) return <h1>LOADING...</h1>;

  return (
    <div className={styles.wishlistPanelWrapper}>
      <span className={styles.panelTitle}>Wishlist Items</span>
      <div className={styles.itemsWrapper}>
        {wishlist.map((item: WishlistItemTypes) => (
          <WishlistItem item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
