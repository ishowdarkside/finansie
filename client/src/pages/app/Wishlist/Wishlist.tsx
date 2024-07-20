import { useWishlistContext } from "../../../context/WishlistContext";
import TopupModal from "../../../features/Wishlist/TopupModal/TopupModal";
import WishlistModal from "../../../features/Wishlist/WishlistModal/WishlistModal";
import WishlistPanel from "../../../features/Wishlist/WishlistPanel/WishlistPanel";

export default function Wishlist() {
  const { isModalOpen, isOpenTopup } = useWishlistContext();
  return (
    <>
      <WishlistPanel />
      {isModalOpen && <WishlistModal />}
      {isOpenTopup && <TopupModal />}
    </>
  );
}
