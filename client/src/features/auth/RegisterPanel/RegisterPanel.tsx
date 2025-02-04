import styles from "./RegisterPanel.module.scss";
import { useForm } from "react-hook-form";
import { RegistrationTypes } from "../../../types/RegistrationTypes";
import Input from "../Input/Input";
import { registerService } from "../../../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RegisterPanel(): JSX.Element {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegistrationTypes>();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const serverResponse = await registerService(data);
    if (serverResponse?.data.status === "fail") {
      return toast.error(
        serverResponse.data.errors?.[0] || serverResponse.data.message
      );
    }

    toast.success(serverResponse?.data.message);
    localStorage.setItem("token", serverResponse?.data.token);
    navigate("/app");
  });

  return (
    <div className={styles.formContainer}>
      <h3>Register to get started</h3>
      <form onSubmit={onSubmit}>
        <Input
          inputType="text"
          inputName="firstName"
          disabled={isSubmitting}
          required="Please provide your first name!"
          placeholder="First Name"
          register={register}
          errors={errors}
        />

        <Input
          inputType="text"
          inputName="lastName"
          disabled={isSubmitting}
          required="Please provide your last name!"
          placeholder="Last Name"
          register={register}
          errors={errors}
        />

        <Input
          inputType="email"
          inputName="email"
          disabled={isSubmitting}
          required="Please provide your email!"
          placeholder="Email "
          register={register}
          errors={errors}
        />

        <Input
          inputType="password"
          inputName="password"
          required="Please provide your password!"
          placeholder="Password"
          register={register}
          disabled={isSubmitting}
          errors={errors}
        />

        <Input
          inputType="password"
          disabled={isSubmitting}
          inputName="passwordConfirm"
          required="Please confirm your password!"
          placeholder="Confirm password"
          register={register}
          errors={errors}
        />

        <span className={styles.routeSwitch}>
          Already have an account? <Link to="/auth/login">Login here</Link>
        </span>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Just a moment..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
