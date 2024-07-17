import { useGetSavings } from "../../../hooks/useSavings";
import styles from "./SavingsPanel.module.scss";

export default function SavingsPanel() {
  const { data: savings, isPending: isPendingSavings } = useGetSavings();

  if (isPendingSavings) return <h1>LOADING...</h1>;

  return (
    <div className={styles.transactionPanel}>
      <div className={styles.titleWrapper}>
        <span className={styles.panelTitle}>Your savings</span>
        <button type="button">Add saving</button>
      </div>
      
    </div>
  );
}
