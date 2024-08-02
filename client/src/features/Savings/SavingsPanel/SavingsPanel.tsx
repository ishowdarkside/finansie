import { useSavingsContext } from "../../../context/SavingsContext";
import { useGetSavings } from "../../../hooks/useSavings";
import SavingsPlaceholderPanel from "../../../ui/SavingsPlaceholderPanel/SavingsPlaceholderPanel";
import SavingsItem from "../SavingItem/SavingsItem";
import SavingsPagination from "../SavingsPagination/SavingsPagination";
import styles from "./SavingsPanel.module.scss";

export default function SavingsPanel() {
  const { data: savings, isPending: isPendingSavings, } = useGetSavings();
  const { changeModalState, page, show } = useSavingsContext();
  if (isPendingSavings) return <h1>LOADING...</h1>;
  if (!savings) return null;

  let paginatedSavings = savings.slice((page - 1) * show, show * page);
  let currentCount = savings.slice(0, show * page).length;

  return (
    <div className={styles.transactionPanel}>
      <div className={styles.titleWrapper}>
        <span className={styles.panelTitle}>Your savings</span>
        <button type="button" onClick={changeModalState}>
          Add saving
        </button>
      </div>

      {savings?.length === 0 && (
        <div className={styles.emptyPanel}>
          <span>Start saving now!</span>
        </div>
      )}

      <SavingsPlaceholderPanel />
      {paginatedSavings?.map((e) => (
        <SavingsItem saving={e} key={e._id} />
      ))}
      {savings.length > show && <SavingsPagination
        savingsLength={savings?.length!}
        page={page}
        currentCount={currentCount}
      />}
    </div>
  );
}
