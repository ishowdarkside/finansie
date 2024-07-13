import LeftArrow from "../../../../assets/left-arrow.png";
import RightArrow from "../../../../assets/right-arrow.png";
import { useTransactionContext } from "../../../../context/TransactionContext";
import { TransactionType } from "../../../../types/TransactionType";
import styles from "./TransactionPagination.module.scss";

interface PropTypes {
  page: number;
  currentCount: number;
  transactions: TransactionType[];
  transactionsCount: number;
}

export default function TransactionPagination({
  page,
  currentCount,
  transactions,
  transactionsCount,
}: PropTypes): JSX.Element {
  const { decrementPage, incrementPage } = useTransactionContext();

  return (
    <div className={styles.paginationPanel}>
      <span className={styles.transactionCount}>
        {currentCount} of {transactionsCount}
      </span>
      <div className={styles.btnWrapper}>
        <button
          onClick={decrementPage}
          className={page === 1 ? styles.lowerOpacity : ""}
        >
          <img src={LeftArrow} />
        </button>
        <button
          onClick={() => incrementPage(transactions)}
          className={transactionsCount <= 6 * page ? styles.lowerOpacity : ""}
        >
          <img src={RightArrow} />
        </button>
      </div>
    </div>
  );
}
