"use client";

import { useState } from "react";

type Props = {
  onAddExpense: (expense: {
    title: string;
    amount: string;
    date: string;
  }) => void;
};

export default function AddExpenseForm({
  onAddExpense,
}: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!title || !amount) return;

    onAddExpense({
      title,
      amount: `$${amount}`,
      date: new Date().toLocaleDateString(),
    });

    setTitle("");
    setAmount("");
  };

  return (
    <div className="bg-[#111827] p-6 rounded-2xl shadow-lg mb-10">
      <h2 className="text-white text-2xl font-bold mb-6">
        Add Expense
      </h2>

      <div className="flex flex-col gap-4">
        
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 rounded-lg bg-[#1F2937] text-white outline-none"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-4 rounded-lg bg-[#1F2937] text-white outline-none"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 transition p-4 rounded-lg text-white font-semibold"
        >
          Add Expense
        </button>

      </div>
    </div>
  );
}