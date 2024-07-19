import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { WishlistItemTypes } from "../types/WishlistItemType";

interface WishlistContextType {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  show: number;
  incrementPage: (arg1: number, arg2: number) => void;
  decrementPage: () => void;
  isModalOpen: boolean;
  changeModalState: () => void;
  activeEditWishlist: WishlistItemTypes | null;
  setActiveEditWishlist: Dispatch<SetStateAction<any>>;
}

const context = createContext<WishlistContextType | null>(null);

export default function WishlistContext({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const show = 6;
  const [activeEditWishlist, setActiveEditWishlist] = useState(null);

  function incrementPage(transactionsCount: number, currentCount: number) {
    if (
      transactionsCount === currentCount ||
      page + 1 > Math.floor(transactionsCount / 6 + 1)
    )
      return;
    setPage((curr) => curr + 1);
  }

  function decrementPage() {
    if (page - 1 === 0) return;
    setPage((curr) => curr - 1);
  }

  function changeModalState() {
    setIsModalOpen((curr) => !curr);
  }

  return (
    <context.Provider
      value={{
        page,
        setPage,
        isModalOpen,
        changeModalState,
        activeEditWishlist,
        setActiveEditWishlist,
        show,
        incrementPage,
        decrementPage,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useWishlistContext() {
  const data = useContext(context);
  if (!data) throw new Error("YOU CANT USE WISHLIST CONTEXT HERE");

  return data;
}
