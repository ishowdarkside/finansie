import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegistrationTypes } from "../../../types/RegistrationTypes";
import styles from "./Input.module.scss";

interface InputTypes {
  inputType: string;
  inputName:
    | "email"
    | "password"
    | "passwordConfirm"
    | "email"
    | "firstName"
    | "lastName";
  placeholder: string;
  register: UseFormRegister<RegistrationTypes>;
  required: string | boolean;
  errors: FieldErrors;
}

export default function Input({
  inputType,
  placeholder,
  register,
  inputName,
  required = false,
  errors,
}: InputTypes): JSX.Element {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={inputType}
        placeholder={placeholder}
        {...register(inputName, {
          required,
        })}
      />
      {errors[inputName]?.message && (
        <span className={styles.errorMsg}>
          {errors[inputName]?.message as string}
        </span>
      )}
    </div>
  );
}
