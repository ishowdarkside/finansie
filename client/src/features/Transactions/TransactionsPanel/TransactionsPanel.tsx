import styles from "./TransactionsPanel.module.scss";
import { useMyTransactions } from "../../../hooks/useTransactions";
import TransactionPlaceholderPanel from "../../../ui/TransactionPlaceholderPanel/TransactionPlaceholderPanel";
import TransactionItem from "./TransactionItem";

interface PropTypes {
  changeModalState: () => void;
}

export default function LatestTransactions({
  changeModalState,
}: PropTypes): JSX.Element {
  const { data: transactions, isPending } = useMyTransactions();

  if (isPending) return <h1>LOADING...</h1>;
  if (!transactions || transactions.length === 0)
    return <span>no transaction</span>;

  return (
    <div className={styles.transactionPanel}>
      <div className={styles.titleWrapper}>
        <span className={styles.panelTitle}>Your transactions</span>
        <button onClick={changeModalState}>Add transaction</button>
      </div>

      <TransactionPlaceholderPanel />
      {transactions.map((transaction) => (
        <TransactionItem transaction={transaction} key={transaction._id} />
      ))}
    </div>
  );
}
