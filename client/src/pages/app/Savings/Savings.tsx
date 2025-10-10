import { useSavingsContext } from "../../../context/SavingsContext";
import SavingsModal from "../../../features/Savings/SavingsModal/SavingsModal";
import SavingsPanel from "../../../features/Savings/SavingsPanel/SavingsPanel";

export default function Savings() {
  const { isOpenModal } = useSavingsContext();
  return (
    <>
      <SavingsPanel />
      {isOpenModal && <SavingsModal />}
    </>
  );
}
