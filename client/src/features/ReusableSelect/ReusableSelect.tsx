import styles from "./ReusableSelect.module.scss";

interface PropTypes {
  register: any;
  error?: string;
  defaultValue: string;
  options?: string[];
  firstDisabledOption: string;
}

export default function ReusableSelect({
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
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}
