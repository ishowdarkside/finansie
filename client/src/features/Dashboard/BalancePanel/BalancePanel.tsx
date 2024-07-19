import { useUser } from "../../../hooks/useAuth";
import styles from "./BalancePanel.module.scss";

interface BalancePanelPropTypes {
  balanceType: "savings" | "available_balance" | "loan";
}

export default function BalancePanel({
  balanceType,
}: BalancePanelPropTypes): JSX.Element {
  const { data, isPending } = useUser();

  if (isPending) return <h1>LOADING...</h1>;

  const { available_balance, loan_balance, saving_balance } = data;
  return (
    <div className={styles.panel} onClick={() => {}}>
      <span className={styles.balanceType}>
        {balanceType === "available_balance" && "Available Balance"}{" "}
        {balanceType === "savings" && "Savings"}
        {balanceType === "loan" && "Loans"}
      </span>

      <span className={styles.balanceAmount}>
        {balanceType === "available_balance" &&
          available_balance.toLocaleString("en-US")}
        {balanceType === "savings" && saving_balance.toLocaleString("en-US")}
        {balanceType === "loan" && loan_balance.toLocaleString("en-US")} KM
      </span>
    </div>
  );
}
