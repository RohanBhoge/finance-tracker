import React from "react";
import { useDispatch } from "react-redux";
import { useCurrency } from "../../hooks/useCurrency";
import { deleteTransaction } from "./transactionsSlice";

const TransactionItem = ({ transaction, onEdit }) => {
  const { formatCurrency, convertAmount } = useCurrency();
  const dispatch = useDispatch();

  const amountInDisplayCurrency = convertAmount(
    transaction.amount,
    transaction.currency
  );
  const isExpense = transaction.type === "expense";

  return (
    <li className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md">
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isExpense
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {transaction.category.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{transaction.category}</p>
          <p className="text-sm text-gray-500">
            {transaction.note || transaction.date}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-bold ${
            isExpense ? "text-red-600" : "text-green-600"
          }`}
        >
          {isExpense ? "-" : "+"} {formatCurrency(amountInDisplayCurrency)}
        </p>
        <div className="text-xs text-gray-400">
          <button
            onClick={() => onEdit(transaction)}
            className="mr-2 hover:text-indigo-600"
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(deleteTransaction(transaction.id))}
            className="hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TransactionItem;
