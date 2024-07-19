import { useForm } from "react-hook-form";
import { useSavingsContext } from "../../../context/SavingsContext";
import { SavingType } from "../../../types/SavingsType";
import ReactDOM from "react-dom";
import styles from "./SavingsModal.tsx.module.scss";
import ReusableInput from "../../ReusableInput/ReusableInput";
import ReusableSelect from "../../ReusableSelect/ReusableSelect";
import { useCreateSaving, useDeleteSaving } from "../../../hooks/useSavings";
import { deleteSaving } from "../../../services/savings";

export default function SavingsModal(): JSX.Element {
  const { activeEditSaving, setActiveEditSaving, changeModalState } =
    useSavingsContext();

  const {
    mutate: createMutation,
    error,
    isPending: isCreating,
  } = useCreateSaving();

  const { mutate: deleteMutation, isPending: isDeleting } = useDeleteSaving();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = activeEditSaving
    ? useForm<SavingType>({
        defaultValues: {
          source: activeEditSaving.source,
          status: activeEditSaving.status,
        },
      })
    : useForm<SavingType>();

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <form
        className={styles.savingForm}
        onSubmit={handleSubmit((data) => {
          activeEditSaving
            ? null
            : createMutation(data, { onSuccess: changeModalState });
        })}
      >
        <div className={styles.titleWrapper}>
          <h2 className={styles.formHeading}>
            {activeEditSaving ? "Edit saving" : "Add saving"}
          </h2>
          <button
            onClick={() => {
              setActiveEditSaving(null);
              changeModalState();
            }}
          >
            Close
          </button>
        </div>
        <div className={styles.separator}></div>

        <ReusableInput
          inputType="text"
          placeholder="Saving's source"
          register={{
            ...register("source", {
              required: "Please provide saving source",
            }),
          }}
          error={errors.source?.message}
        />

        {!activeEditSaving && (
          <ReusableInput
            inputType="number"
            placeholder="Saving value"
            register={{
              ...register("saving_value", {
                required: "Please provide savings value",
              }),
            }}
            error={errors.saving_value?.message}
          />
        )}

        <ReusableSelect
          error={errors.status && "Please select savings status"}
          firstDisabledOption="Savings status"
          register={{
            ...register("status", {
              validate: (value: string) => value !== "null",
            }),
          }}
          options={["completed", "processing", "canceled"]}
          defaultValue="null"
        />

        <div className={styles.btnWrapper}>
          <button>{activeEditSaving ? "Save changes" : "Add saving"}</button>
          {activeEditSaving && (
            <button
              className={styles.deleteSaving}
              onClick={async () => {
                deleteMutation(activeEditSaving._id, {
                  onSuccess: () => {
                    changeModalState();
                    setActiveEditSaving(null);
                  },
                });
              }}
            >
              Delete savings
            </button>
          )}
        </div>
      </form>
    </div>,
    document.querySelector(".global-layout")!
  );
}
