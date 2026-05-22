"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Expense = {
  title: string;
  amount: number;
  date: string;
  category: string;
};

export default function AnalyticsPage() {

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [monthlyBudget, setMonthlyBudget] =
    useState(5000);

  useEffect(() => {

    const savedExpenses =
      localStorage.getItem("expenses");

    const savedBudget =
      localStorage.getItem("monthlyBudget");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    if (savedBudget) {
      setMonthlyBudget(Number(savedBudget));
    }

  }, []);

  const totalExpenses = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const budgetUsedPercentage = Math.min(
    Math.round(
      (totalExpenses / monthlyBudget) * 100
    ),
    100
  );

  const remainingBudget =
    monthlyBudget - totalExpenses;

  const categoryTotals: Record<
    string,
    number
  > = {};

  expenses.forEach((expense) => {

    if (categoryTotals[expense.category]) {

      categoryTotals[expense.category] +=
        expense.amount;

    } else {

      categoryTotals[expense.category] =
        expense.amount;

    }

  });

  const sortedCategories =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    );

  const topCategory =
    sortedCategories[0]?.[0] || "No Data";

  const chartData = sortedCategories.map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  return (
    <main className="flex bg-[#0F172A] min-h-screen">

      <Sidebar />

      <section className="flex-1 px-8 py-7">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-white">
            Analytics
          </h1>

          <p className="text-gray-400 mt-2">
            Deep financial insights and spending analysis.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <p className="text-gray-400 text-sm">
              Total Expenses
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              ${totalExpenses}
            </h2>

          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <p className="text-gray-400 text-sm">
              Budget Usage
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              {budgetUsedPercentage}%
            </h2>

          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <p className="text-gray-400 text-sm">
              Remaining Budget
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-3">
              ${remainingBudget}
            </h2>

          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <p className="text-gray-400 text-sm">
              Top Category
            </p>

            <h2 className="text-3xl font-bold text-white mt-3">
              {topCategory}
            </h2>

          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

          <div className="xl:col-span-2 bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-white text-2xl font-semibold">
                Category Breakdown
              </h2>

              <p className="text-gray-400 text-sm">
                Spending Overview
              </p>

            </div>

            {sortedCategories.length === 0 ? (

              <div className="flex flex-col items-center justify-center h-[300px] text-center">

                <h3 className="text-white text-2xl font-semibold">
                  No analytics available
                </h3>

                <p className="text-gray-400 mt-3">
                  Add expenses to generate financial analytics.
                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {sortedCategories.map(
                  ([category, amount], index) => {

                    const percentage = (
                      (amount / totalExpenses) * 100
                    ).toFixed(0);

                    return (

                      <div
                        key={index}
                        className="bg-[#1E293B] p-5 rounded-2xl hover:bg-[#263244] transition"
                      >

                        <div className="flex items-center justify-between mb-3">

                          <div className="flex items-center gap-3">

                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>

                            <h3 className="text-white font-medium">
                              {category}
                            </h3>

                          </div>

                          <p className="text-gray-400 text-sm">
                            {percentage}%
                          </p>

                        </div>

                        <div className="w-full bg-[#0F172A] rounded-full h-3">

                          <div
                            className="bg-blue-500 h-3 rounded-full"
                            style={{
                              width: `${percentage}%`,
                            }}
                          ></div>

                        </div>

                        <p className="text-gray-400 text-sm mt-3">
                          ${amount}
                        </p>

                      </div>

                    );
                  }
                )}

              </div>

            )}

          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <h2 className="text-white text-2xl font-semibold mb-8">
              Financial Insights
            </h2>

            <div className="space-y-5">

              <div className="bg-[#1E293B] p-5 rounded-2xl hover:bg-[#263244] transition">

                <h3 className="text-white font-semibold">
                  Highest Spending Area
                </h3>

                <p className="text-gray-400 text-sm mt-3">
                  {topCategory} currently contributes the highest share of your monthly spending.
                </p>

              </div>

              <div className="bg-[#1E293B] p-5 rounded-2xl hover:bg-[#263244] transition">

                <h3 className="text-white font-semibold">
                  Budget Health
                </h3>

                <p className="text-gray-400 text-sm mt-3">
                  You have utilized {budgetUsedPercentage}% of your monthly budget allocation.
                </p>

              </div>

              <div className="bg-[#1E293B] p-5 rounded-2xl hover:bg-[#263244] transition">

                <h3 className="text-white font-semibold">
                  Savings Potential
                </h3>

                <p className="text-gray-400 text-sm mt-3">
                  {remainingBudget > 0
                    ? `You still have $${remainingBudget} available for this month.`
                    : "Your expenses exceeded the planned monthly budget."}
                </p>

              </div>

            </div>

            <div className="mt-8">

              <div className="flex items-center justify-between mb-5">

                <h3 className="text-white text-xl font-semibold">
                  Category Spending Analysis
                </h3>

                <p className="text-gray-400 text-sm">
                  Expense Distribution
                </p>

              </div>

              <div className="bg-[#1E293B] rounded-2xl p-5 h-[320px]">

                {chartData.length === 0 ? (

                  <div className="flex items-center justify-center h-full">

                    <p className="text-gray-500">
                      No chart data available
                    </p>

                  </div>

                ) : (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart data={chartData}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                      />

                      <XAxis
                        dataKey="category"
                        stroke="#9CA3AF"
                      />

                      <YAxis stroke="#9CA3AF" />

                      <Tooltip />

                      <Bar
                        dataKey="amount"
                        fill="#3B82F6"
                        radius={[10, 10, 0, 0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                )}

              </div>

            </div>

          </div>

        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-white text-2xl font-semibold">
              Financial Health Summary
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="bg-[#1E293B] p-5 rounded-2xl hover:bg-[#263244] transition">

              <p className="text-gray-400 text-sm">
                Expense Status
              </p>

              <h3 className="text-white text-xl font-semibold mt-3">
                {budgetUsedPercentage > 80
                  ? "High Spending"
                  : "Healthy"}
              </h3>

            </div>

            <div className="bg-[#1E293B] p-5 rounded-2xl hover:bg-[#263244] transition">

              <p className="text-gray-400 text-sm">
                Active Categories
              </p>

              <h3 className="text-white text-xl font-semibold mt-3">
                {sortedCategories.length}
              </h3>

            </div>

            <div className="bg-[#1E293B] p-5 rounded-2xl hover:bg-[#263244] transition">

              <p className="text-gray-400 text-sm">
                Monthly Balance
              </p>

              <h3 className="text-green-400 text-xl font-semibold mt-3">
                ${remainingBudget}
              </h3>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}