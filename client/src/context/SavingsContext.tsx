import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { SavingType } from "../types/SavingsType";

interface SavingsContextType {
  isOpenModal: boolean;
  changeModalState: () => void;
  activeEditSaving: SavingType | null;
  setActiveEditSaving: Dispatch<SetStateAction<any>>;
  incrementPage: (arg1: number, arg2: number) => void;
  decrementPage: () => void;
  page: number;
  show: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const context = createContext<SavingsContextType | null>(null);

export default function SavingsContext({ children }: { children: ReactNode }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeEditSaving, setActiveEditSaving] = useState(null);
  const [page, setPage] = useState(1);
  let show = 6;

  function changeModalState() {
    setIsOpenModal((curr) => !curr);
  }

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

  return (
    <context.Provider
      value={{
        isOpenModal,
        page,
        setPage,
        incrementPage,
        decrementPage,
        show,
        changeModalState,
        activeEditSaving,
        setActiveEditSaving,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useSavingsContext() {
  const data = useContext(context);
  if (!data) throw new Error("YOU CANT USE SAVINGS CONTEXT HERE");
  return data;
}
