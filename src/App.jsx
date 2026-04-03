import React from "react";
import { FinanceProvider } from "./context/FinanceContext";
import Header from "./components/layout/Header";
import TransactionList from "./features/transactions/TransactionList";

const App = () => {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Header />
        <main className="max-w-5xl mx-auto pt-8 px-4 pb-16">
          <TransactionList />
        </main>
      </div>
    </FinanceProvider>
  );
};

export default App;
