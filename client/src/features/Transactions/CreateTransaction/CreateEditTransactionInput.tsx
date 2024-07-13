import styles from "./CreateTransaction.module.scss";

interface PropTypes {
  inputType: string;
  placeholder: string;
  register: any;
  error?: string;
}

export default function CreateEditTransactionInput({
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
