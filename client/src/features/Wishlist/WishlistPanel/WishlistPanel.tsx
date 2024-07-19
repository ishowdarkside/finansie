import { useWishlistContext } from "../../../context/WishlistContext";
import { useUser } from "../../../hooks/useAuth";
import { WishlistItemTypes } from "../../../types/WishlistItemType";
import WishlistPlaceholderPanel from "../../../ui/WishlistPlaceholderPanel/WishlistPlaceholderPanel";
import WishlistItem from "../WishlistItem/WishlistItem";
import styles from "./WishlistPanel.module.scss";

export default function WishlistPanel(): JSX.Element {
  const { data: user, isPending: isLoadingUser } = useUser();
  const { changeModalState } = useWishlistContext();

  if (isLoadingUser) return <h1>LOADING...</h1>;

  const wishlist: WishlistItemTypes[] = user.wishlist;
  return (
    <div className={styles.wishlistPanel}>
      <div className={styles.titleWrapper}>
        <span className={styles.panelTitle}>Wishlist</span>
        <button type="button" onClick={changeModalState}>
          Add Wishlist item
        </button>
      </div>

      {wishlist?.length === 0 && (
        <div className={styles.emptyPanel}>
          <span>Add item to wishlist now!</span>
        </div>
      )}
      <WishlistPlaceholderPanel />
      {wishlist?.map((e) => (
        <WishlistItem wishlistItem={e} key={e._id} />
      ))}
    </div>
  );
}
