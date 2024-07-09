import BalancePanel from "../../../features/Dashboard/BalancePanel/BalancePanel";
import styles from "./Dashboard.module.scss";
export default function Dashboard(): JSX.Element {
  return (
    <>
      <div className={styles.panelsWrapper}>
        <BalancePanel balanceType="available_balance" />
        <BalancePanel balanceType="savings" />
        <BalancePanel balanceType="loan" />
      </div>
    </>
  );
}
