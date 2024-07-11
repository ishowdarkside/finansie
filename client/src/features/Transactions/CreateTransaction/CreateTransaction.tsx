import { useForm } from "react-hook-form";
import styles from "./CreateTransaction.module.scss";
import { TransactionType } from "../../../types/TransactionType";

interface PropTypes {
  changeModalState: () => void;
}

export default function CreateTransaction({
  changeModalState,
}: PropTypes): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionType>();

  return (
    <div className={styles.overlay}>
      <form
        className={styles.createTransactionForm}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className={styles.titleWrapper}>
          <h2 className={styles.formHeading}>Add Transaction</h2>
          <button onClick={changeModalState}>Close</button>
        </div>
        <div className={styles.separator}></div>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Transaction's source"
            {...register("source", {
              required: "Please provide transaction source",
            })}
          />
          {errors.source && (
            <span className={styles.errorMsg}> {errors.source.message}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="number"
            placeholder="Transaction value"
            {...register("transaction_value", {
              required: "Please provide transaction value",
            })}
          />
          {errors.transaction_value && (
            <span className={styles.errorMsg}>
              {errors.transaction_value.message}
            </span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <select
            {...register("transaction_type", {
              validate: (value: string) => value !== "null",
            })}
            defaultValue="null"
          >
            <option disabled value="null">
              Transaction Type
            </option>
            <option value="charge">Charge</option>
            <option value="income">Income</option>
          </select>
          {errors.transaction_type && (
            <span className={styles.errorMsg}>
              Please select transaction type
            </span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <select
            {...register("status", {
              validate: (value: string) => value !== "null",
            })}
            defaultValue="null"
          >
            <option disabled value="null">
              Status
            </option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="canceled">Canceled</option>
          </select>
          {errors.status && (
            <span className={styles.errorMsg}>Please select status </span>
          )}
        </div>
        <button>Add transaction</button>
      </form>
    </div>
  );
}
