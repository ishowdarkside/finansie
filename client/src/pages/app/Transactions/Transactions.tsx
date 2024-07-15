import { useTransactionContext } from "../../../context/TransactionContext";
import CreateEditTransaction from "../../../features/Transactions/CreateTransaction/CreateEditTransaction";
import TransactionsPanel from "../../../features/Transactions/TransactionsPanel/TransactionsPanel";

export default function Transactions(): JSX.Element {
  const { isModalOpen } = useTransactionContext();
  return (
    <>
      <TransactionsPanel />
      {isModalOpen && <CreateEditTransaction />}
    </>
  );
}
