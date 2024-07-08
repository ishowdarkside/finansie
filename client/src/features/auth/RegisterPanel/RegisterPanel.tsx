import styles from "./RegisterPanel.module.scss";
import { useForm } from "react-hook-form";

interface formValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterPanel(): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className={styles.formContainer}>
      <h3>Register to get started</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          {...register("firstName", {
            required: "Please provide your first name!",
          })}
        />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm your password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
