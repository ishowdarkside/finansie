import { useState } from "react";
import CreateTransaction from "../../../features/Transactions/CreateTransaction/CreateTransaction";
import TransactionsPanel from "../../../features/Transactions/TransactionsPanel/TransactionsPanel";

export default function Transactions(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function changeModalState() {
    setIsModalOpen((curr) => !curr);
  }

  return (
    <>
      <TransactionsPanel changeModalState={changeModalState} />
      {isModalOpen && <CreateTransaction changeModalState={changeModalState} />}
    </>
  );
}
