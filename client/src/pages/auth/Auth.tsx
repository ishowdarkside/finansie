import { Outlet } from "react-router-dom";
import styles from "./Auth.module.scss";

export default function AuthPage(): JSX.Element {
  return (
    <section className={styles.authPage}>
      <aside>
        <Outlet />
      </aside>
      <div className={styles.rightContainer}>
        <h1>Financie</h1>
      </div>
    </section>
  );
}
3;
