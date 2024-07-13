import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useCreateTransaction } from "../../../hooks/useTransactions";
import { TransactionType } from "../../../types/TransactionType";
import CreateEditTransactionInput from "./CreateEditTransactionInput";
import styles from "./CreateTransaction.module.scss";
import CreateEditTransactionSelect from "./CreateEditTransactionSelect";
import { useTransactionContext } from "../../../context/TransactionContext";

export default function CreateEditTransaction(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionType>();

  const { mutate } = useCreateTransaction();
  const { changeModalState } = useTransactionContext();

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <form
        className={styles.createTransactionForm}
        onSubmit={handleSubmit((data) => {
          changeModalState();
          mutate(data);
        })}
      >
        <div className={styles.titleWrapper}>
          <h2 className={styles.formHeading}>Add Transaction</h2>
          <button onClick={changeModalState}>Close</button>
        </div>
        <div className={styles.separator}></div>

        <CreateEditTransactionInput
          inputType="text"
          placeholder="Transaction's source"
          register={{
            ...register("source", {
              required: "Please provide transaction source",
            }),
          }}
          error={errors.source?.message}
        />

        <CreateEditTransactionInput
          inputType="number"
          placeholder="Transaction value"
          register={{
            ...register("transaction_value", {
              required: "Please provide transaction value",
            }),
          }}
          error={errors.transaction_value?.message}
        />

        <CreateEditTransactionSelect
          error={errors.transaction_type && "Please select transaction type"}
          firstDisabledOption="Transaction Type"
          register={{
            ...register("transaction_type", {
              validate: (value: string) => value !== "null",
            }),
          }}
          options={["charge", "income"]}
          defaultValue="null"
        />

        <CreateEditTransactionSelect
          error={errors.transaction_type && "Please select transaction status"}
          firstDisabledOption="Transaction status"
          register={{
            ...register("status", {
              validate: (value: string) => value !== "null",
            }),
          }}
          options={["completed", "processing", "canceled"]}
          defaultValue="null"
        />

        <button>Add transaction</button>
      </form>
    </div>,
    document.querySelector(".global-layout")!
  );
}
