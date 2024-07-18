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
}

const context = createContext<SavingsContextType | null>(null);

export default function SavingsContext({ children }: { children: ReactNode }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeEditSaving, setActiveEditSaving] = useState(null);

  function changeModalState() {
    setIsOpenModal((curr) => !curr);
  }

  return (
    <context.Provider
      value={{
        isOpenModal,
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
