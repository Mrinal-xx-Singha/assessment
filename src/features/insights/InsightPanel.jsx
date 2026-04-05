import { useFinance } from "../../context/FinanceContext";
import { formatCurrency } from "../../utils/formatCurrency";

const InsightPanel = () => {
  const { transactions } = useFinance();

  //   Most expensive category
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseInt(t.amount);
      return acc;
    }, {});
  const sortedArray = Object.entries(expensesByCategory).sort(
    (a, b) => b[1] - a[1],
  );
  const highestCategoryName = sortedArray[0];

  //   average expense value
  const expenseTransactions = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        acc.total += parseInt(t.amount);
        acc.count += 1;
        return acc;
      },
      { total: 0, count: 0 },
    );
  const averageExpense = Math.round(
    expenseTransactions.total / expenseTransactions.count,
  );

  //   savings rate percentage
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + parseInt(t.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + parseInt(t.amount), 0);
  const savingsRate = Math.round(
    ((totalIncome - totalExpense) / totalIncome) * 100,
  );
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-yellow-500 text-2xl">💡</span> AI Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg border bg-amber-50 border-amber-200 text-amber-900">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
            Highest Spending
          </h3>
          <p className="text-2xl font-bold capitalize">
            {highestCategoryName || "None"}
          </p>
        </div>
        <div className="p-5 rounded-lg border bg-blue-50 border-blue-200 text-blue-900">
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
            Avg Expense
          </h3>
          <p className="text-2xl font-bold">{formatCurrency(averageExpense || 0)}</p>
        </div>
        <div
          className={`p-5 rounded-lg border ${
            totalExpense > totalIncome
              ? "bg-red-50 border-red-200 text-red-900"
              : "bg-emerald-50 border-emerald-200 text-emerald-900"
          }`}
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">
            Savings Rate
          </h3>
          <p className="text-2xl font-bold">
            {totalExpense > totalIncome
              ? "Overspending!"
              : `${savingsRate}% Saved`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightPanel;
