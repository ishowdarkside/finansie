import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import DashboardIcon from "../../assets/grid-alt.png";
import TransactionsIcon from "../../assets/invoice-1.png";
import ListIcon from "../../assets/list-alt.png";
import SavingsIcon from "../../assets/inbox.png";
import LoanIcon from "../../assets/table.png";
import LogoutIcon from "../../assets/enter.png";

export default function Sidebar(): JSX.Element {
  return (
    <div className={styles.sidebar}>
      <h4 className={styles.companyName}>Finansie</h4>
      <ul className={styles.sidebarList}>
        <li>
          <img src={DashboardIcon} />
          <NavLink to="/app/dashboard">Dashboard</NavLink>
        </li>

        <li>
          <img src={TransactionsIcon} />
          <NavLink to="/app/transactions">Transactions</NavLink>
        </li>

        <li>
          <img src={ListIcon} />
          <NavLink to="/app/wishlist">Wishlist</NavLink>
        </li>

        <li>
          <img src={SavingsIcon} />
          <NavLink to="/app/savings">Savings</NavLink>
        </li>

        <li>
          <img src={LoanIcon} />
          <NavLink to="/app/loans">Loans</NavLink>
        </li>
        <li>
          <img src={ListIcon} />
          <NavLink to="/app/wishlist">Budget Planning</NavLink>
        </li>

        <li>
          <img src={LogoutIcon} />
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}
