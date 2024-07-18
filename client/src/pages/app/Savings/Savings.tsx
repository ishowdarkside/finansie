import { useSavingsContext } from "../../../context/SavingsContext";
import SavingsModal from "../../../features/Savings/SavingsModal/SavingsModal";
import SavingsPanel from "../../../features/Savings/SavingsPanel/SavingsPanel";
import styles from "./Savings.module.scss";

export default function Savings() {
  const { isOpenModal } = useSavingsContext();
  return (
    <>
      <SavingsPanel />
      {isOpenModal && <SavingsModal />}
    </>
  );
}
