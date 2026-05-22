"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

type Expense = {
  title: string;
  amount: number;
  date: string;
  category: string;
};

export default function ExpensesPage() {

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [filter, setFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    const savedExpenses =
      localStorage.getItem("expenses");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

  }, []);

  const filteredExpenses =
    expenses.filter((expense) => {

      const matchesCategory =
        filter === "All"
          ? true
          : expense.category === filter;

      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesCategory && matchesSearch
      );
    });

  const totalExpenses = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  return (
    <main className="flex bg-[#0F172A] min-h-screen">

      <Sidebar />

      <section className="flex-1 px-8 py-7">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Expenses
            </h1>

            <p className="text-gray-400 mt-2">
              Manage and monitor all transactions.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">

            <p className="text-gray-400 text-sm">
              Total Expenses
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              ${totalExpenses}
            </h2>

          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">

            <p className="text-gray-400 text-sm">
              Transactions
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              {expenses.length}
            </h2>

          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">

            <p className="text-gray-400 text-sm">
              Categories
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              8
            </h2>

          </div>

        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6">

          <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">

            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="bg-[#1E293B] text-white px-4 py-3 rounded-2xl outline-none w-full md:w-[320px]"
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="bg-[#1E293B] text-gray-300 px-4 py-3 rounded-2xl outline-none"
            >

              <option value="All">
                All Categories
              </option>

              <option value="Food">
                Food
              </option>

              <option value="Travel">
                Travel
              </option>

              <option value="Shopping">
                Shopping
              </option>

              <option value="Bills">
                Bills
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

              <option value="Health">
                Health
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {filteredExpenses.length === 0 ? (

            <div className="flex flex-col items-center justify-center h-[300px] text-center">

              <h3 className="text-white text-2xl font-semibold">
                No matching expenses
              </h3>

              <p className="text-gray-400 mt-3">
                Try changing search or filter criteria.
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

                      <div className="flex items-center gap-3 flex-wrap">

                        <h3 className="text-white text-lg font-medium">
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

                      <p className="text-gray-400 text-sm mt-2">
                        {expense.date}
                      </p>

                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">

                      <p className="text-red-400 font-semibold text-lg">
                        ${expense.amount}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}