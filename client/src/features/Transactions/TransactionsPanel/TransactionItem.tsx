import { TransactionType } from "../../../types/TransactionType";
import styles from "./TransactionsPanel.module.scss";
import { format } from "date-fns";

export default function TransactionItem({
  transaction,
}: {
  transaction: TransactionType;
}): JSX.Element {
  return (
    <div className={styles.latestTransactionItem}>
      <span>{transaction.source}</span>
      <span>
        {format(new Date(transaction.transaction_date), "dd/MM/yyyy")}
      </span>
      <span
        className={`${styles.transactionType} ${
          transaction.transaction_type === "charge"
            ? styles.chargeStyle
            : styles.incomeStyles
        }`}
      >
        {transaction.transaction_type.toUpperCase()}
      </span>
      <span>40KM</span>
    </div>
  );
}
