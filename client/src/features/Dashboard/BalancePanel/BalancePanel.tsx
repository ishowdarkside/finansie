import { useUser } from "../../../hooks/useAuth";
import styles from "./BalancePanel.module.scss";

interface BalancePanelPropTypes {
  balanceType: "savings" | "available_balance" | "loan";
}

export default function BalancePanel({
  balanceType,
}: BalancePanelPropTypes): JSX.Element {
  const {
    data: { available_balance, loan_balance, saving_balance },
  } = useUser();

  return (
    <div className={styles.panel}>
      <span className={styles.balanceType}>
        {balanceType === "available_balance" && "Available Balance"}{" "}
        {balanceType === "savings" && "Savings"}
        {balanceType === "loan" && "Loans"}
      </span>

      <span className={styles.balanceAmount}>
        {balanceType === "available_balance" && available_balance}
        {balanceType === "savings" && saving_balance}
        {balanceType === "loan" && loan_balance} KM
      </span>
    </div>
  );
}
