"use client";

import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import DashboardCard from "./components/DashboardCard";
import ExpenseChart from "./components/ExpenseChart";

type Expense = {
  title: string;
  amount: number;
  date: string;
  category: string;
};

export default function Home() {

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("Food");

  const [filter, setFilter] =
    useState("All");

  const [editIndex, setEditIndex] =
    useState<number | null>(null);

  const [monthlyBudget, setMonthlyBudget] =
    useState(0);

  const [currency, setCurrency] =
    useState("$");

  useEffect(() => {

    const savedExpenses =
      localStorage.getItem("expenses");

    const savedBudget =
      localStorage.getItem("monthlyBudget");

    const savedCurrency =
      localStorage.getItem("currency");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    if (savedBudget) {
      setMonthlyBudget(Number(savedBudget));
    }

    if (savedCurrency) {
      setCurrency(savedCurrency);
    }

  }, []);

  const addExpense = () => {

    if (!title || !amount) return;

    const expense = {
      title,
      amount: Number(amount),
      date: new Date().toLocaleDateString(),
      category,
    };

    let updatedExpenses = [...expenses];

    if (editIndex !== null) {

      updatedExpenses[editIndex] =
        expense;

    } else {

      updatedExpenses.push(expense);

    }

    setExpenses(updatedExpenses);

    localStorage.setItem(
      "expenses",
      JSON.stringify(updatedExpenses)
    );

    setTitle("");
    setAmount("");
    setCategory("Food");
    setEditIndex(null);
  };

  const editExpense = (
    index: number
  ) => {

    const expense = expenses[index];

    setTitle(expense.title);

    setAmount(
      expense.amount.toString()
    );

    setCategory(expense.category);

    setEditIndex(index);
  };

  const deleteExpense = (
    indexToDelete: number
  ) => {

    const updatedExpenses =
      expenses.filter(
        (_, index) =>
          index !== indexToDelete
      );

    setExpenses(updatedExpenses);

    localStorage.setItem(
      "expenses",
      JSON.stringify(updatedExpenses)
    );
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter(
          (expense) =>
            expense.category === filter
        );

  const totalExpenses = expenses.reduce(
    (acc, item) =>
      acc + item.amount,
    0
  );

  const budgetUsedPercentage =
    monthlyBudget > 0
      ? Math.min(
          Math.round(
            (totalExpenses /
              monthlyBudget) *
              100
          ),
          100
        )
      : 0;

  const remainingBudget =
    monthlyBudget - totalExpenses;

  return (
    <main className="flex bg-[#0F172A] min-h-screen">

      <Sidebar />

      <section className="flex-1 px-8 py-7">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Welcome Back, Chaithu! 👋
            </h1>

            <p className="text-gray-400 mt-2">
              Here's your financial overview for May 2026
            </p>

          </div>

          <div className="bg-[#111827] border border-gray-800 px-5 py-3 rounded-2xl text-gray-400">
            May 2026
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="hover:scale-[1.02] transition duration-300">
            <DashboardCard
              title="Total Expenses"
              amount={`${currency}${totalExpenses}`}
            />
          </div>

          <div className="hover:scale-[1.02] transition duration-300">
            <DashboardCard
              title="Transactions"
              amount={`${expenses.length}`}
            />
          </div>

          <div className="hover:scale-[1.02] transition duration-300">
            <DashboardCard
              title="Budget Remaining"
              amount={`${currency}${remainingBudget}`}
            />
          </div>

          <div className="hover:scale-[1.02] transition duration-300">
            <DashboardCard
              title="Savings This Month"
              amount={`${currency}${remainingBudget > 0 ? remainingBudget : 0}`}
            />
          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

          <div className="xl:col-span-2 bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <ExpenseChart expenses={expenses} />

          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <h2 className="text-white text-xl font-semibold mb-6">
              Quick Add Expense
            </h2>

            <input
              type="text"
              placeholder="Expense Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-[#1E293B] p-4 rounded-xl text-white outline-none mb-4"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="w-full bg-[#1E293B] p-4 rounded-xl text-white outline-none mb-4"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full bg-[#1E293B] p-4 rounded-xl text-white outline-none mb-4"
            >

              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>

            </select>

            <button
              onClick={addExpense}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] transition duration-300 py-4 rounded-xl text-white font-medium"
            >
              {editIndex !== null
                ? "Update Expense"
                : "Add Expense"}
            </button>

          </div>

        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-white text-2xl font-semibold">
              Recent Transactions
            </h2>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="bg-[#1E293B] text-gray-300 text-sm px-4 py-2 rounded-xl outline-none"
            >

              <option value="All">
                All Categories
              </option>

              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>

            </select>

          </div>

          {filteredExpenses.length === 0 ? (

            <div className="flex flex-col items-center justify-center h-[250px] text-center">

              <h3 className="text-white text-xl font-semibold">
                No matching transactions
              </h3>

              <p className="text-gray-400 mt-3 max-w-sm">
                Try changing filter criteria.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredExpenses.map(
                (expense, index) => (

                  <div
                    key={index}
                    className={`flex justify-between items-center transition p-4 rounded-2xl border

                    ${
                      expense.category === "Food"
                        ? "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20"
                        : expense.category === "Travel"
                        ? "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20"
                        : expense.category === "Shopping"
                        ? "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                        : expense.category === "Bills"
                        ? "bg-red-500/10 border-red-500/20 hover:bg-red-500/20"
                        : expense.category === "Entertainment"
                        ? "bg-pink-500/10 border-pink-500/20 hover:bg-pink-500/20"
                        : expense.category === "Health"
                        ? "bg-green-500/10 border-green-500/20 hover:bg-green-500/20"
                        : expense.category === "Education"
                        ? "bg-yellow-500/10 border-yellow-500/20 hover:bg-yellow-500/20"
                        : "bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/20"
                    }`}
                  >

                    <div>

                      <div className="flex items-center gap-3">

                        <h3 className="text-white font-medium">
                          {expense.title}
                        </h3>

                        <span
                          className={`text-xs px-3 py-1 rounded-full
                          ${
                            expense.category === "Food"
                              ? "bg-orange-500/20 text-orange-400"
                              : expense.category === "Travel"
                              ? "bg-blue-500/20 text-blue-400"
                              : expense.category === "Shopping"
                              ? "bg-purple-500/20 text-purple-400"
                              : expense.category === "Bills"
                              ? "bg-red-500/20 text-red-400"
                              : expense.category === "Entertainment"
                              ? "bg-pink-500/20 text-pink-400"
                              : expense.category === "Health"
                              ? "bg-green-500/20 text-green-400"
                              : expense.category === "Education"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {expense.category}
                        </span>

                      </div>

                      <p className="text-gray-300 text-sm mt-2">
                        {expense.date}
                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <p className="text-white font-semibold">
                        {currency}{expense.amount}
                      </p>

                      <button
                        onClick={() =>
                          editExpense(index)
                        }
                        className="bg-blue-500/20 hover:bg-blue-500/30 transition text-blue-400 px-3 py-2 rounded-xl text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteExpense(index)
                        }
                        className="bg-red-500/20 hover:bg-red-500/30 transition text-red-400 px-3 py-2 rounded-xl text-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        <footer className="mt-10 border-t border-gray-800 pt-6 text-center">

          <h3 className="text-white font-semibold">
            Smart Expense Analytics
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Developed by Chaithu • © 2026
          </p>

        </footer>

      </section>

    </main>
  );
}