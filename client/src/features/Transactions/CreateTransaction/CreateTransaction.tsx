import styles from "./CreateTransaction.module.scss";
import ReactDOM from "react-dom";

interface PropTypes {
  changeModalState: () => void;
}

export default function CreateTransaction({
  changeModalState,
}: PropTypes): JSX.Element {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <form className={styles.createTransactionForm}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.formHeading}>Add Transaction</h2>
          <button onClick={changeModalState}>Close</button>
        </div>
        <div className={styles.separator}></div>
        <input type="text" placeholder="Transaction's source" />
        <input type="number" placeholder="Transaction value" />
        <select>
          <option disabled selected>
            Transaction Type
          </option>
          <option value="charge">Charge</option>
          <option value="income">Income</option>
        </select>
        <select>
          <option disabled selected>
            Status
          </option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
          <option value="canceled">Canceled</option>
        </select>
        <button>Add transaction</button>
      </form>
    </div>,
    document.body
  );
}
