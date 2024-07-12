import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useAuth";

export default function Protect({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  // check if token exists
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/auth" />;

  const { data, isPending } = useUser();

  if (isPending && !data) return <h1>LOADING...</h1>;
  if (!isPending && !data) return <Navigate to="/auth" />;
  if (!isPending && !data.email) return <Navigate to="/auth" />;

  return children;
}
