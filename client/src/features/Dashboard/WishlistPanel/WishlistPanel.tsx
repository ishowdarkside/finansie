import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useAuth";
import { WishlistItemTypes } from "../../../types/WishlistItemType";
import WishlistItem from "./WishlistItem";
import styles from "./WishlistPanel.module.scss";

export default function WishlistPanel(): JSX.Element {
  const {
    data: { wishlist },
    isPending,
  } = useUser();

  const navigate = useNavigate();
  if (isPending) return <h1>LOADING...</h1>;

  return (
    <div className={styles.wishlistPanelWrapper}>
      <div className={styles.titleContainer}>
        <span className={styles.panelTitle}>Wishlist Items</span>
        <button onClick={() => navigate('/app/wishlist')}>View More</button>
      </div>
      <div className={styles.itemsWrapper}>
        {wishlist.map((item: WishlistItemTypes) => (
          <WishlistItem item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
