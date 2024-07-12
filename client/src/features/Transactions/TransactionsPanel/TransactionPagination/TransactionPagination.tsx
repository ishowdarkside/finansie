import styles from "./TransactionPagination.module.scss";
import LeftArrow from "../../../../assets/left-arrow.png";
import RightArrow from "../../../../assets/right-arrow.png";

interface PropTypes {
  incrementPage: () => void;
  decrementPage: () => void;
  page: number;
  paginatedTransactionsCount: number;
  transactionsCount: number;
}

export default function TransactionPagination({
  incrementPage,
  decrementPage,
  page,
  paginatedTransactionsCount,
  transactionsCount,
}: PropTypes): JSX.Element {
  return (
    <div className={styles.paginationPanel}>
      <span>
        {paginatedTransactionsCount} of {transactionsCount}
      </span>
      <div className={styles.btnWrapper}>
        <button
          onClick={decrementPage}
          className={page === 1 ? styles.lowerOpacity : ""}
        >
          <img src={LeftArrow} />
        </button>
        <button
          onClick={incrementPage}
          className={
            transactionsCount === paginatedTransactionsCount
              ? styles.lowerOpacity
              : ""
          }
        >
          <img src={RightArrow} />
        </button>
      </div>
    </div>
  );
}
