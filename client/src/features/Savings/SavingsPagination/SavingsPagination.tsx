import LeftArrow from "../../../assets/left-arrow.png";
import RightArrow from "../../../assets/right-arrow.png";
import { useSavingsContext } from "../../../context/SavingsContext";
import styles from "./SavingsPagination.module.scss";

interface PropTypes {
  page: number;
  currentCount: number;
  savingsLength: number;
}

export default function SavingsPagination({
  page,
  currentCount,
  savingsLength,
}: PropTypes): JSX.Element {
  const { decrementPage, incrementPage } = useSavingsContext();

  return (
    <div className={styles.paginationPanel}>
      <span className={styles.transactionCount}>
        {currentCount} of {savingsLength}
      </span>
      <div className={styles.btnWrapper}>
        <button
          onClick={decrementPage}
          className={page === 1 ? styles.lowerOpacity : ""}
        >
          <img src={LeftArrow} />
        </button>
        <button
          onClick={() => incrementPage(savingsLength, currentCount)}
          className={savingsLength <= 6 * page ? styles.lowerOpacity : ""}
        >
          <img src={RightArrow} />
        </button>
      </div>
    </div>
  );
}
