import { useLatestBudget } from "../../../hooks/useBudget";
import { BudgetPlanType } from "../../../types/BudgetPlanType";
import { months } from "../../../utils/constants";
import BudgetPlanningItem from "./BudgetPlanningItem";
import styles from "./styles.module.scss";
export default function BudgetPlanning(): JSX.Element {
  const { data, isPending, error } = useLatestBudget();

  if (isPending) return <h1>LOADING...</h1>;
  const currentMonth = months[new Date().getMonth()];
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.budgetPlanningWrapper}>
      <div className={styles.titleContainer}>
        <span className={styles.panelTitle}>
          Budget Plan for {currentMonth} {currentYear}
        </span>
        <button>View More</button>
      </div>

      {data === "not-found" && (
        <div className={styles.createBudgetCTA}>
          <button>Create budget now!</button>
        </div>
      )}

      {data !== "not-found" && (
        <div className={styles.itemsContainer}>
          {(data as BudgetPlanType).item_list.map((e) => (
            <BudgetPlanningItem item={e} key={e.item_name} />
          ))}
        </div>
      )}
    </div>
  );
}
