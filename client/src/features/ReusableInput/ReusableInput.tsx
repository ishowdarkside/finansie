import styles from "./Input.module.scss";

interface PropTypes {
  inputType: string;
  placeholder: string;
  register: any;
  error?: string;
}

export default function ReusableInput({
  inputType,
  placeholder,
  register,
  error,
}: PropTypes): JSX.Element {
  return (
    <div className={styles.inputWrapper}>
      <input type={inputType} placeholder={placeholder} {...register} />
      {error && <span className={styles.errorMsg}> {error}</span>}
    </div>
  );
}
