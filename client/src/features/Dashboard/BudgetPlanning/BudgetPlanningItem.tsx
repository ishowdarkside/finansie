import styles from "./styles.module.scss";

interface PropTypes {
  item: { item_name: string; _id: string; isBought: boolean };
}

export default function BudgetPlanningItem({ item }: PropTypes) {
  return (
    <div
      className={`${styles.budgetItem} ${
        item.isBought ? styles.boughtItem : ""
      }`}
    >
      <div
        className={`${styles.checkbox} ${
          item.isBought ? styles.checkedItem : ""
        }`}
      ></div>
      <span>{item.item_name}</span>
    </div>
  );
}
