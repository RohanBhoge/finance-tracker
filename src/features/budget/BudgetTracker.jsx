import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCurrency } from "../../hooks/useCurrency";
import { setBudgetGoal } from "./budgetSlice";
import Card from "../../components/Card";
import Modal from "../../components/Modal";

const BudgetGoalForm = ({ onDone }) => {
  const dispatch = useDispatch();
  const { displayCurrency, rates } = useCurrency(); // Get currency info
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const budgetCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Health",
    "Utilities",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    // --- NEW: Convert the input amount to the base currency (USD) before saving ---
    let amountInBaseCurrency = parseFloat(amount);
    if (displayCurrency !== "USD" && rates) {
      const rateToUSD =
        rates.conversion_rates["USD"] / rates.conversion_rates[displayCurrency];
      amountInBaseCurrency = parseFloat(amount) * rateToUSD;
    }

    // Dispatch the Redux action with the amount in the base currency
    dispatch(setBudgetGoal({ category, amount: amountInBaseCurrency }));
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Set Budget Goal</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          {budgetCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Monthly Budget (in {displayCurrency})
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 500"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Save Goal
      </button>
    </form>
  );
};

const BudgetTracker = () => {
  const { goals } = useSelector((state) => state.budget);
  const transactions = useSelector((state) => state.transactions.items);
  const { convertAmount, formatCurrency } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const expensesByCategory = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const amount = convertAmount(t.amount, t.currency);
        if (!acc[t.category]) {
          acc[t.category] = 0;
        }
        acc[t.category] += amount;
        return acc;
      }, {});
  }, [transactions, convertAmount]);

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-black text-lg font-semibold">Budget Progress</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm bg-gray-300 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-400"
          >
            Set Goal
          </button>
        </div>

        <div className="space-y-4 text-black">
          {Object.keys(goals).length > 0 ? (
            Object.entries(goals).map(([category, goalInBaseCurrency]) => {
              const spent = expensesByCategory[category] || 0;

              // --- UPDATED: Convert the stored goal to the display currency ---
              const goalInDisplayCurrency = convertAmount(
                goalInBaseCurrency,
                "USD"
              );

              const progress = Math.min(
                (spent / goalInDisplayCurrency) * 100,
                100
              );
              const isOverBudget = spent > goalInDisplayCurrency;

              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{category}</span>
                    <span>
                      {formatCurrency(spent)} /{" "}
                      {formatCurrency(goalInDisplayCurrency)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        isOverBudget ? "bg-red-500" : "bg-indigo-600"
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 py-8">
              No budget goals set. Click 'Set Goal' to add one.
            </p>
          )}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BudgetGoalForm onDone={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default BudgetTracker;
