import { format } from "date-fns";
import { SavingType } from "../../../types/SavingsType";
import styles from "./SavingsItem.module.scss";
import EditIcon from "../../../assets/editing.png";
import { useSavingsContext } from "../../../context/SavingsContext";

export default function SavingsItem({
  saving,
}: {
  saving: SavingType;
}): JSX.Element {
  const { setActiveEditSaving, changeModalState } = useSavingsContext();
  return (
    <div className={styles.latestTransactionItem}>
      <span className={styles.source}>{saving.source}</span>
      <span>{format(new Date(saving.saving_date), "dd/MM/yyyy")}</span>
      <span>{saving.saving_value} KM</span>
      <span>{saving.status.toUpperCase()}</span>
      <button
        className={styles.editBtn}
        onClick={() => {
          setActiveEditSaving(saving);
          changeModalState();
        }}
      >
        <img src={EditIcon} />
      </button>
    </div>
  );
}
