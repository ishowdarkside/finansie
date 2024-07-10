import BalancePanel from "../../../features/Dashboard/BalancePanel/BalancePanel";
import BudgetPlanning from "../../../features/Dashboard/BudgetPlanning/BudgetPlanning";
import WishlistPanel from "../../../features/Dashboard/WishlistPanel/WishlistPanel";
import styles from "./Dashboard.module.scss";
export default function Dashboard(): JSX.Element {
  return (
    <>
      <div className={styles.panelsWrapper}>
        <BalancePanel balanceType="available_balance" />
        <BalancePanel balanceType="savings" />
        <BalancePanel balanceType="loan" />
      </div>
      <div className={styles.budgetWishlistWrapper}>
        <BudgetPlanning />
        <WishlistPanel />
      </div>
    </>
  );
}
