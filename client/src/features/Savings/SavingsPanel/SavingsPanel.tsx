import { useSavingsContext } from "../../../context/SavingsContext";
import { useGetSavings } from "../../../hooks/useSavings";
import SavingsPlaceholderPanel from "../../../ui/SavingsPlaceholderPanel/SavingsPlaceholderPanel";
import SavingsItem from "../SavingItem/SavingsItem";
import styles from "./SavingsPanel.module.scss";

export default function SavingsPanel() {
  const { data: savings, isPending: isPendingSavings } = useGetSavings();
  const { changeModalState } = useSavingsContext();
  if (isPendingSavings) return <h1>LOADING...</h1>;

  return (
    <div className={styles.transactionPanel}>
      <div className={styles.titleWrapper}>
        <span className={styles.panelTitle}>Your savings</span>
        <button type="button" onClick={changeModalState}>
          Add saving
        </button>
      </div>

      <SavingsPlaceholderPanel />
      {savings?.map((e) => (
        <SavingsItem saving={e} key={e._id} />
      ))}
    </div>
  );
}
