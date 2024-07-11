import { useNavigate } from "react-router-dom";
import { useMyTransactions } from "../../../hooks/useTransactions";
import LatestTransactionItem from "./LatestTransactionItem";
import styles from "./LatestTransactions.module.scss";
import TransactionPlaceholderPanel from "../../../ui/TransactionPlaceholderPanel/TransactionPlaceholderPanel";

export default function LatestTransactions(): JSX.Element {
  const { data: transactions, isPending } = useMyTransactions();
  const navigate = useNavigate();

  if (isPending) return <h1>LOADING...</h1>;
  if (!transactions || transactions.length === 0)
    return <span>no transaction</span>;
  const latestFiveTransactions = transactions.slice(0, 5);

  return (
    <div className={styles.transactionPanel}>
      <div className={styles.titleWrapper}>
        <span className={styles.panelTitle}>5 Latest Tansactions</span>
        <button onClick={() => navigate("/app/transactions")}>View More</button>
      </div>
      <TransactionPlaceholderPanel />
      {latestFiveTransactions.slice(0, 5).map((transaction) => (
        <LatestTransactionItem
          transaction={transaction}
          key={transaction._id}
        />
      ))}
    </div>
  );
}
