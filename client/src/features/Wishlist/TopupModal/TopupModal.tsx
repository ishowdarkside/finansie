import { useForm } from "react-hook-form";
import styles from "./TopupModal.module.scss";
import ReusableInput from "../../ReusableInput/ReusableInput";

export default function TopupModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ saved_balance: number }>();
  return (
    <div className={styles.overlay}>
      <form
        className={styles.wishlistForm}
        onSubmit={handleSubmit((data) => {})}
      >
        <div className={styles.titleWrapper}>
          <h2 className={styles.formHeading}>Topup item saving</h2>
          <button onClick={() => {}}>Close</button>
        </div>
        <div className={styles.separator}></div>
        <ReusableInput
          error={errors.saved_balance?.message}
          register={{
            ...register("saved_balance", {
              required: "Please provide topup balance",
            }),
          }}
          placeholder="Topup balance"
          inputType="number"
        />
        <div className={styles.btnWrapper}>
          <button>Save changes</button>
        </div>
      </form>
    </div>
  );
}
