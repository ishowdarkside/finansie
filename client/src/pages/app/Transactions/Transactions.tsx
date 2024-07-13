import { useState } from "react";
import CreateEditTransaction from "../../../features/Transactions/CreateTransaction/CreateEditTransaction";
import TransactionsPanel from "../../../features/Transactions/TransactionsPanel/TransactionsPanel";
import { useTransactionContext } from "../../../context/TransactionContext";

export default function Transactions(): JSX.Element {
  const { isModalOpen } = useTransactionContext();
  return (
    <>
      <TransactionsPanel />
      {isModalOpen && <CreateEditTransaction />}
    </>
  );
}
