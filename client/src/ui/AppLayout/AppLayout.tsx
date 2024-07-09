import { Outlet } from "react-router-dom";

export default function AppLayout(): JSX.Element {
  return (
    <>
      <div>OVO JE MAIN PAGE</div>
      <Outlet />
    </>
  );
}
