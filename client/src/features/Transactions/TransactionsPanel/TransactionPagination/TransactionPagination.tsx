import LeftArrow from "../../../../assets/left-arrow.png";
import RightArrow from "../../../../assets/right-arrow.png";
import { useTransactionContext } from "../../../../context/TransactionContext";
import styles from "./TransactionPagination.module.scss";

interface PropTypes {
  page: number;
  currentCount: number;
  transactionsLength: number;
}

export default function TransactionPagination({
  page,
  currentCount,
  transactionsLength,
}: PropTypes): JSX.Element {
  const { decrementPage, incrementPage } = useTransactionContext();

  return (
    <div className={styles.paginationPanel}>
      <span className={styles.transactionCount}>
        {currentCount} of {transactionsLength}
      </span>
      <div className={styles.btnWrapper}>
        <button
          onClick={decrementPage}
          className={page === 1 ? styles.lowerOpacity : ""}
        >
          <img src={LeftArrow} />
        </button>
        <button
          onClick={() => incrementPage(transactionsLength, currentCount)}
          className={transactionsLength <= 6 * page ? styles.lowerOpacity : ""}
        >
          <img src={RightArrow} />
        </button>
      </div>
    </div>
  );
}
