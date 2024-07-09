import { Outlet } from "react-router-dom";
import Sidebar from "../../features/Sidebar/Sidebar";
import styles from "./AppLayout.module.scss";

export default function AppLayout(): JSX.Element {
  return (
    <>
      <section className={styles.appStyles}>
        <Sidebar />
        <div className={styles.mainPortion}>
          <Outlet />
        </div>
      </section>
    </>
  );
}
