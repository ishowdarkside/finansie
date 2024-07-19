import { useWishlistContext } from "../../../context/WishlistContext";
import WishlistModal from "../../../features/Wishlist/WishlistModal/WishlistModal";
import WishlistPanel from "../../../features/Wishlist/WishlistPanel/WishlistPanel";

export default function Wishlist() {
  const { isModalOpen } = useWishlistContext();
  return (
    <>
      <WishlistPanel />
      {isModalOpen && <WishlistModal />}
    </>
  );
}
