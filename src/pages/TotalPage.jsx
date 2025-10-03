import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useCurrency } from "../hooks/useCurrency";
import { filterTransactionsByPeriod } from "../utils/dateUtils";
import FilterButtons from "../components/FilterButtons";
import Card from "../components/Card.jsx";
import SavingsPieChart from "../features/visualizations/SavingsPieChart.jsx";
import BudgetTracker from "../features/budget/BudgetTracker.jsx";

const TotalPage = () => {
  const allTransactions = useSelector((state) => state.transactions.items);

  const [filter, setFilter] = useState("monthly");

  const { convertAmount } = useCurrency();

  const transactions = useMemo(
    () => filterTransactionsByPeriod(allTransactions, filter),
    [allTransactions, filter]
  );

  const { totalIncome, totalExpenses } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    transactions.forEach((t) => {
      const amount = convertAmount(t.amount, t.currency);
      if (t.type === "income") {
        income += amount;
      } else {
        expenses += amount;
      }
    });
    return { totalIncome: income, totalExpenses: expenses };
  }, [transactions, convertAmount]);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black">
        <Card>
          {totalIncome > 0 ? (
            <SavingsPieChart income={totalIncome} expenses={totalExpenses} />
          ) : (
            <p className="text-center text-gray-500 py-12">
              No income data for this period to calculate savings.
            </p>
          )}
        </Card>
        <BudgetTracker />
      </div>
    </div>
  );
};

export default TotalPage;
