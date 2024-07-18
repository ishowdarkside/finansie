import styles from "./SavingsPlaceholderPanel.module.scss";
export default function SavingsPlaceholderPanel(): JSX.Element {
  return (
    <div className={styles.placeholderPanel}>
      <span>Saving</span>
      <span>Date</span>
      <span>Value</span>
      <span>Status</span>
    </div>
  );
}
