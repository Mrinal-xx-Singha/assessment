import { createContext, useContext, useState } from "react";
import transactions from "../mockData/transactions";

const FinanceContext = createContext();
const FinanceProvider = ({ children }) => {
  const [transactionData, setTransactionData] = useState(transactions);
  const [role, setRole] = useState("Viewer");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [editingTransaction, setEditingTransaction] = useState(null);

  return (
    <FinanceContext.Provider
      value={{
        transactions: transactionData,
        setTransactionData,
        role,
        setRole,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        editingTransaction,
        setEditingTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

const useFinance = () => {
  return useContext(FinanceContext);
};

export { FinanceProvider, useFinance };
