import React from "react";
import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const { setTransactionData } = useFinance();

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row flex-wrap gap-4 items-end"
    >
      <div className="flex-1 min-w-[150px] flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Amount
        </label>
        <input
          type="number"
          className="border border-gray-300 p-2 rounded-md w-full   outline-none"
          placeholder="0"
          value={amount}
          required
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex-1 min-w-[150px] flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Category
        </label>
        <select
          className="border border-gray-300 p-2 rounded-md w-full bg-white   outline-none cursor-pointer"
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

      <div className="flex-1 min-w-[150px] flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Type
        </label>
        <select
          className="border border-gray-300 p-2 rounded-md w-full bg-white   outline-none cursor-pointer"
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

      <div className="flex-2 min-w-[200px] flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Description
        </label>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md w-full   outline-none"
          placeholder="What was this for?"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="min-w-[120px]">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-sm"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
