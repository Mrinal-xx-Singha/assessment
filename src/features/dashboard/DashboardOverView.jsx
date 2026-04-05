import { useFinance } from "../../context/FinanceContext";
import { BanknoteArrowUp, BanknoteArrowDown, IndianRupee } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

const DashboardOverView = () => {
  const { transactions } = useFinance();
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => {
      return acc + parseInt(t.amount);
    }, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + parseInt(t.amount), 0);

  // calculate the  balance
  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center">
        <span className="flex gap-2 justify-between items-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Total Income
          </p>
          <BanknoteArrowUp className="text-green-500" size={20} />
        </span>
        <p className="text-3xl font-bold text-green-600 mt-2">
          +{formatCurrency(totalIncome)}
        </p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center">
        <span className="flex gap-2 justify-between items-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Total Expense
          </p>
          <BanknoteArrowDown className="text-red-500" size={20} />
        </span>
        <p className="text-3xl font-bold text-red-600 mt-2">
          -{formatCurrency(totalExpense)}
        </p>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-16 h-16 bg-blue-50 rounded-bl-full flex items-start justify-end p-3">
          <IndianRupee className="text-blue-500" size={20} />
        </div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Balance
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-2">
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
};

export default DashboardOverView;
