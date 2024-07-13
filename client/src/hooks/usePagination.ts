import { useState } from "react";
import { TransactionType } from "../types/TransactionType";

export function usePagination() {
  const [page, setPage] = useState(1);
  let show = 6;

  function incrementPage(arr: TransactionType[]) {
    if (page + 1 > Math.round(arr!.length / 6 + 1)) return;
    setPage((curr) => curr + 1);
  }

  function decrementPage() {
    if (page - 1 === 0) return;
    setPage((curr) => curr - 1);
  }

  return { page, show, incrementPage, decrementPage };
}
