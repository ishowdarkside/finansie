import { useTransactionContext } from "../../../context/TransactionContext";
import { useMyTransactions } from "../../../hooks/useTransactions";
import TransactionPlaceholderPanel from "../../../ui/TransactionPlaceholderPanel/TransactionPlaceholderPanel";
import TransactionItem from "./TransactionItem";
import TransactionPagination from "./TransactionPagination/TransactionPagination";
import styles from "./TransactionsPanel.module.scss";

export default function LatestTransactions(): JSX.Element {
  const { data: transactions, isPending } = useMyTransactions();
  const { page, show } = useTransactionContext();
  const { changeModalState } = useTransactionContext();

  if (isPending) return <h1>LOADING...</h1>;
  if (!transactions || transactions.length === 0)
    return <span>no transaction</span>;

  let paginatedTransactions = transactions.slice(
    (page - 1) * show,
    show * page
  );

  let currentCount = transactions.slice(0, show * page).length;

  return (
    <>
      <div className={styles.transactionPanel}>
        <div className={styles.titleWrapper}>
          <span className={styles.panelTitle}>Your transactions</span>
          <button onClick={changeModalState}>Add transaction</button>
        </div>

        <TransactionPlaceholderPanel />
        {paginatedTransactions.map((transaction) => (
          <TransactionItem transaction={transaction} key={transaction._id} />
        ))}
        <TransactionPagination
          transactionsLength={transactions.length}
          page={page}
          currentCount={currentCount}
        />
      </div>
    </>
  );
}
