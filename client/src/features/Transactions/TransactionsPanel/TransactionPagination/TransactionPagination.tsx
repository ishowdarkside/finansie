import styles from "./TransactionPagination.module.scss";
import LeftArrow from "../../../../assets/left-arrow.png";
import RightArrow from "../../../../assets/right-arrow.png";
import { useEffect, useRef, useState } from "react";

interface PropTypes {
  incrementPage: () => void;
  decrementPage: () => void;
  page: number;
  currentCount: number;
  transactionsCount: number;
}

export default function TransactionPagination({
  incrementPage,
  decrementPage,
  page,
  currentCount,
  transactionsCount,
}: PropTypes): JSX.Element {
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
          onClick={incrementPage}
          className={transactionsCount <= 6 * page ? styles.lowerOpacity : ""}
        >
          <img src={RightArrow} />
        </button>
      </div>
    </div>
  );
}
