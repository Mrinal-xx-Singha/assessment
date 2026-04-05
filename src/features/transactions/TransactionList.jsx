import React from "react";
import { useFinance } from "../../context/FinanceContext";
import TransactionForm from "./TransactionForm";

const TransactionList = () => {
  const {
    transactions,
    role,
    setTransactionData,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
  } = useFinance();

  const handleDeleteTransaction = (id) => {
    if (role !== "Admin") {
      alert("You are not authorized to delete transactions");
    } else {
      setTransactionData((previousTransactions) =>
        previousTransactions.filter((t) => t.id !== id),
      );
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    // check if filteredType is "All ", or if the transaction type matches the filterType
    const matchesTypes =
      filterType === "All" || transaction.type === filterType.toLowerCase();
    // check if the description includes  the searchTerm
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTypes && matchesSearch;
  });

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6 mt-3">
        <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sm:w-48">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>
      {role === "Admin" && <TransactionForm />}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto p-4 m-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Description</th>
                {role === "Admin" && (
                  <th className="px-6 py-4 text-center">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${transaction.type === "income" ? "text-green-600" : "text-gray-900"}`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.description}
                  </td>
                  {role === "Admin" && (
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
