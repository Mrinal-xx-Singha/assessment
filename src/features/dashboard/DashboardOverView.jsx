import React from "react";
import { useFinance } from "../../context/FinanceContext";

const DashboardOverView = () => {
  const { transactions } = useFinance();
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // how to calculate the  balance ?
  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Income</p>
        <p className="text-3xl font-bold text-green-600 mt-2">+${totalIncome}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Expense</p>
        <p className="text-3xl font-bold text-red-600 mt-2">-${totalExpense}</p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-16 h-16 bg-blue-50 rounded-bl-full flex items-start justify-end p-3">
          <div className="w-4 h-4 rounded-full bg-blue-200"></div>
        </div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Balance</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">${balance}</p>
      </div>
    </div>
  );
};

export default DashboardOverView;
