import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { TransactionType } from "../types/TransactionType";

interface TransactionContextType {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  show: number;
  incrementPage: (arg1: number, arg2: number) => void;
  decrementPage: () => void;
  isModalOpen: boolean;
  changeModalState: () => void;
  activeEditTransaction: TransactionType | null;
  setActiveEditTransaction: Dispatch<SetStateAction<any>>;
}

const context = createContext<TransactionContextType | null>(null);

export default function TransactionContext({
  children,
}: {
  children: ReactNode;
}) {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const show = 6;
  const [activeEditTransaction, setActiveEditTransaction] = useState(null);

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
        show,
        incrementPage,
        decrementPage,
        isModalOpen,
        changeModalState,
        activeEditTransaction,
        setActiveEditTransaction,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useTransactionContext() {
  const data = useContext(context);
  if (!data) throw new Error("YOU CAN'T USE TRANSACTION CONTEXT HERE");
  return data;
}
