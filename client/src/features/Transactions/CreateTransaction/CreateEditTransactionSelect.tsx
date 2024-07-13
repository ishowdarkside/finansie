import styles from "./CreateTransaction.module.scss";

interface PropTypes {
  register: any;
  error?: string;
  defaultValue: string;
  options?: string[];
  firstDisabledOption: string;
}

export default function CreateEditTransactionSelect({
  register,
  error,
  options,
  defaultValue,

  firstDisabledOption,
}: PropTypes): JSX.Element {
  return (
    <div className={styles.inputWrapper}>
      <select {...register} defaultValue={defaultValue}>
        <option disabled value="null">
          {firstDisabledOption}
        </option>
        {options?.map((e) => (
          <option value={e}>{e}</option>
        ))}
      </select>
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}
