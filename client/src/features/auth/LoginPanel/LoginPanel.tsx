import { useNavigate } from "react-router-dom";
import styles from "./LoginPanel.module.scss";
import { LoginTypes } from "../../../types/LoginTypes";
import { useForm } from "react-hook-form";
import { loginService } from "../../../services/auth";
import toast from "react-hot-toast";
import Input from "../Input/Input";
import { Link } from "react-router-dom";

export default function LoginPanel(): JSX.Element {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginTypes>();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const serverResponse = await loginService(data);
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
      <h3>Login to get started</h3>
      <form onSubmit={onSubmit}>
        <Input
          inputType="email"
          inputName="email"
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
          errors={errors}
        />

        <span className={styles.routeSwitch}>
          Don't have an account yet?
          <Link to="/auth/register">Register here!</Link>
        </span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
