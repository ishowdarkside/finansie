import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import {
  useCreateTransaction,
  useDeleteTransaction,
  useUpdateTransaction,
} from "../../../hooks/useTransactions";
import { TransactionType } from "../../../types/TransactionType";
import CreateEditTransactionInput from "./CreateEditTransactionInput";
import styles from "./CreateTransaction.module.scss";
import CreateEditTransactionSelect from "./CreateEditTransactionSelect";
import { useTransactionContext } from "../../../context/TransactionContext";

export default function CreateEditTransaction(): JSX.Element {
  const { changeModalState, setActiveEditTransaction, activeEditTransaction } =
    useTransactionContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = activeEditTransaction
    ? useForm<TransactionType>({
        defaultValues: {
          source: activeEditTransaction.source,
          transaction_type: activeEditTransaction.transaction_type,
          status: activeEditTransaction.status,
        },
      })
    : useForm<TransactionType>();

  const { mutate: createMutation } = useCreateTransaction();
  const { isPending: isPendingDelete, mutate: deleteMutation } =
    useDeleteTransaction();
  const { mutate: updateMutation, isPending: isPendingUpdate } =
    useUpdateTransaction();

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <form
        className={styles.createTransactionForm}
        onSubmit={handleSubmit((data) => {
          changeModalState();
          activeEditTransaction
            ? updateMutation({
                transactionId: activeEditTransaction._id as string,
                formData: data,
              })
            : createMutation(data);

          setActiveEditTransaction(null);
        })}
      >
        <div className={styles.titleWrapper}>
          <h2 className={styles.formHeading}>
            {activeEditTransaction ? "Edit Transacton" : "Add Transaction"}
          </h2>
          <button
            onClick={() => {
              setActiveEditTransaction(null);
              changeModalState();
            }}
          >
            Close
          </button>
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

        {!activeEditTransaction && (
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
        )}
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

        <div className={styles.btnWrapper}>
          <button disabled={isPendingUpdate}>
            {activeEditTransaction ? "Save changes" : "Add transaction"}
          </button>
          {activeEditTransaction && (
            <button
              className={styles.deleteTransaction}
              disabled={isPendingDelete}
              onClick={async () => {
                await deleteMutation(activeEditTransaction._id!);
                changeModalState();
                setActiveEditTransaction(null);
              }}
            >
              Delete transaction
            </button>
          )}
        </div>
      </form>
    </div>,
    document.querySelector(".global-layout")!
  );
}
