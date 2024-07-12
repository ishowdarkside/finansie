import styles from "./TransactionsPanel.module.scss";
import { useMyTransactions } from "../../../hooks/useTransactions";
import TransactionPlaceholderPanel from "../../../ui/TransactionPlaceholderPanel/TransactionPlaceholderPanel";
import TransactionItem from "./TransactionItem";
import TransactionPagination from "./TransactionPagination/TransactionPagination";
import { useState } from "react";
interface PropTypes {
  changeModalState: () => void;
}

export default function LatestTransactions({
  changeModalState,
}: PropTypes): JSX.Element {
  const { data: transactions, isPending } = useMyTransactions();
  const [page, setPage] = useState(1);

  if (isPending) return <h1>LOADING...</h1>;
  if (!transactions || transactions.length === 0)
    return <span>no transaction</span>;

  let show = 6;
  let paginatedTransactions = transactions.slice((page - 1) * 6, show * page);

  function incrementPage() {
    if (page + 1 > transactions!.length / 6) return;
    setPage((curr) => curr + 1);
  }

  function decrementPage() {
    if (page - 1 === 0) return;
    setPage((curr) => curr - 1);
  }
  console.log(paginatedTransactions, page);
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
          transactionsCount={transactions.length}
          page={page}
          paginatedTransactionsCount={paginatedTransactions.length * page}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
        />
      </div>
    </>
  );
}
