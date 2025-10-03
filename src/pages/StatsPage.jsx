import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useCurrency } from "../hooks/useCurrency";
import { filterTransactionsByPeriod } from "../utils/dateUtils";
import Card from "../components/Card.jsx";
import SpendingPieChart from "../features/visualizations/SpendingPieChart.jsx";

const CATEGORY_COLORS = {
  Food: "#0088FE",
  Transport: "#00C49F",
  Shopping: "#FFBB28",
  Entertainment: "#FF8042",
  Health: "#8884d8",
  Utilities: "#ff4d4d",
  Other: "#cccccc",
};

const StatsPage = () => {
  const allTransactions = useSelector((state) => state.transactions.items);
  const [filter, setFilter] = useState("monthly");
  const { convertAmount, formatCurrency } = useCurrency();

  const transactions = useMemo(
    () => filterTransactionsByPeriod(allTransactions, filter),
    [allTransactions, filter]
  );

  const { totalIncome, totalExpenses, spendingData } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    const spending = {};

    transactions.forEach((t) => {
      const amount = convertAmount(t.amount, t.currency);
      if (t.type === "income") {
        income += amount;
      } else {
        expenses += amount;
        if (spending[t.category]) {
          spending[t.category] += amount;
        } else {
          spending[t.category] = amount;
        }
      }
    });

    const sortedSpending = Object.entries(spending)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      totalIncome: income,
      totalExpenses: expenses,
      spendingData: sortedSpending,
    };
  }, [transactions, convertAmount]);

  const savings = totalIncome - totalExpenses;

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <h4 className="text-gray-500">Total Income</h4>
          <p className="text-2xl font-semibold text-green-600">
            {formatCurrency(totalIncome)}
          </p>
        </Card>
        <Card>
          <h4 className="text-gray-500">Total Expenses</h4>
          <p className="text-2xl font-semibold text-red-600">
            {formatCurrency(totalExpenses)}
          </p>
        </Card>
        <Card>
          <h4 className="text-gray-500">Savings</h4>
          <p className="text-2xl font-semibold text-indigo-600">
            {formatCurrency(savings)}
          </p>
        </Card>
      </div>

      {/* --- Main Visualization Card --- */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
        {spendingData.length > 0 ? (
          <>
            <SpendingPieChart data={spendingData} />

            {/* --- NEW: Category Track Bars --- */}
            <div className="mt-6 space-y-4">
              {spendingData.map((item) => {
                const percentage = (item.value / totalExpenses) * 100;
                const color =
                  CATEGORY_COLORS[item.name] || CATEGORY_COLORS["Other"];

                return (
                  <div key={item.name}>
                    <div className="flex text-black justify-between text-sm mb-1">
                      <span className="font-medium ">{item.name}</span>
                      <span>{formatCurrency(item.value)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: color,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No expense data for this period.
          </p>
        )}
      </Card>
    </div>
  );
};

export default StatsPage;
