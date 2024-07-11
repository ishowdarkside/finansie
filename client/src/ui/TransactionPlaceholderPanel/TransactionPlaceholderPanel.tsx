import styles from "./TransactionPlaceholderPanel.module.scss";

export default function TransactionPlaceholderPanel(): JSX.Element {
  return (
    <div className={styles.placeholderPanel}>
      <span>Transaction</span>
      <span>Invoice date</span>
      <span>Type of transaction</span>
      <span>Value</span>
    </div>
  );
}
