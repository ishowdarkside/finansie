import { useForm } from "react-hook-form";
import ReusableInput from "../../ReusableInput/ReusableInput";

export default function TopupModal() {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <ReusableInput />
    </div>
  );
}
