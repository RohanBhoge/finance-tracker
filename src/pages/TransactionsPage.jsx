import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Modal from "../components/Modal";
import TransactionItem from "../features/transactions/TransactionItem";
import TransactionForm from "../features/transactions/TransactionForm";

const TransactionsPage = () => {
  const transactions = useSelector((state) => state.transactions.items);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const handleEdit = (transaction) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setTransactionToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Card>
        <ul className="divide-y divide-gray-200">
          {transactions.map((t) => (
            <TransactionItem key={t.id} transaction={t} onEdit={handleEdit} />
          ))}
        </ul>
      </Card>
      <button
        className="w-12 h-12 bg-red-600 text-white text-2xl flex items-center justify-center rounded-full absolute bottom-8 right-8 shadow-lg hover:bg-red-700 hover:scale-105 transition-all"
        onClick={handleAdd}
      >
        +
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionForm
          transactionToEdit={transactionToEdit}
          onDone={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TransactionsPage;
