import { useMyTransactions } from "../../../hooks/useTransactions";
import LatestTransactionItem from "./LatestTransactionItem";
import styles from "./LatestTransactions.module.scss";
import PlaceholderPanel from "./PlaceholderPanel";

export default function LatestTransactions(): JSX.Element {
  const { data: transactions, isPending } = useMyTransactions();

  if (isPending) return <h1>LOADING...</h1>;
  if (!transactions || transactions.length === 0)
    return <span>no transaction</span>;
  console.log(transactions);
  return (
    <div className={styles.transactionPanel}>
      <div className={styles.titleWrapper}>
        <span className={styles.panelTitle}>5 Latest Tansactions</span>
        <button>View More</button>
      </div>
      <PlaceholderPanel />
      {transactions.slice(0, 5).map((transaction) => (
        <LatestTransactionItem transaction={transaction} />
      ))}
    </div>
  );
}
