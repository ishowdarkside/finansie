import RegisterPanel from "../../../features/auth/RegisterPanel/RegisterPanel";
import styles from "./Register.module.scss";

export default function Register(): JSX.Element {
  return (
    <section className={styles.registerPage}>
      <aside>
        <RegisterPanel />
      </aside>
      <div className={styles.rightContainer}>
        <h1>Financie</h1>
      </div>
    </section>
  );
}
3;
