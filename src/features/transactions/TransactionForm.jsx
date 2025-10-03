import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useCurrency } from "../../hooks/useCurrency";
import { addTransaction, updateTransaction } from "./transactionsSlice";
const TransactionForm = ({ transactionToEdit, onDone }) => {
  const dispatch = useDispatch();
  const { rates, displayCurrency } = useCurrency();

  const [type, setType] = useState(transactionToEdit?.type || "expense");
  const [amount, setAmount] = useState(transactionToEdit?.amount || "");
  const [category, setCategory] = useState(
    transactionToEdit?.category || "Food"
  );
  const [date, setDate] = useState(
    transactionToEdit?.date || new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState(transactionToEdit?.note || "");
  const [currency, setCurrency] = useState(
    transactionToEdit?.currency || displayCurrency
  );

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Health",
    "Utilities",
    "Salary",
    "Freelance",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      id: transactionToEdit?.id, 
      type,
      amount: parseFloat(amount),
      category,
      date,
      note,
      currency,
    };

    if (transactionToEdit) {
      dispatch(updateTransaction(transactionData));
    } else {
      dispatch(addTransaction(transactionData));
    }

    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        {transactionToEdit ? "Edit" : "Add"} Transaction
      </h3>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 p-2 rounded-md ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 p-2 rounded-md ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          Expense
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <div className="flex">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-l-md w-full focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-1 p-2 border-t border-b border-r border-gray-300 rounded-r-md bg-gray-50 text-black"
          >
            {rates &&
              Object.keys(rates.conversion_rates).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        {transactionToEdit ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default TransactionForm;
