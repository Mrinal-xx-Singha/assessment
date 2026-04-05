import React from "react";
import { useState, useEffect } from "react";
import { useFinance } from "../../context/FinanceContext";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const { setTransactionData, editingTransaction, setEditingTransaction } =
    useFinance();

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setType(editingTransaction.type);
      setDescription(editingTransaction.description);
    } else {
      setAmount("");
      setCategory("");
      setType("");
      setDescription("");
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      const updatedTransaction = {
        ...editingTransaction,
        amount,
        category,
        type,
        description,
      };
      setTransactionData((prevTransactions) =>
        prevTransactions.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t,
        ),
      );
      setEditingTransaction(null);
    } else {
      const newTransaction = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        amount,
        category,
        type,
        description,
      };
      setTransactionData((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
      // for form reset
      setAmount("");
      setCategory("");
      setType("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end"
    >
      <div className="col-span-1 sm:col-span-1 lg:col-span-2 flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Amount
        </label>
        <input
          type="number"
          className="border border-gray-300 p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0"
          value={amount}
          required
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="col-span-1 sm:col-span-1 lg:col-span-2 flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Category
        </label>
        <select
          className="border border-gray-300 p-2 rounded-md w-full bg-white outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Housing">Housing</option>
          <option value="Shopping">Shopping</option>
          <option value="Freelance">Freelance</option>
          <option value="Utilities">Utilities</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <div className="col-span-1 sm:col-span-1 lg:col-span-2 flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Type
        </label>
        <select
          className="border border-gray-300 p-2 rounded-md w-full bg-white outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
          value={type}
          required
          onChange={(e) => setType(e.target.value)}
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="col-span-1 sm:col-span-1 lg:col-span-4 flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Description
        </label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What was this for?"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col sm:flex-row gap-2">
        <button
          type="submit"
          className={`w-full ${editingTransaction ? "bg-yellow-500 hover:bg-yellow-600 text-sm" : "bg-green-500 hover:bg-green-600"} text-white font-medium px-4 py-2 rounded-md transition-colors shadow-sm`}
        >
          {editingTransaction ? "Save Changes" : "Add"}
        </button>
        {editingTransaction && (
          <button
            type="button"
            onClick={() => setEditingTransaction(null)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md transition-colors shadow-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
