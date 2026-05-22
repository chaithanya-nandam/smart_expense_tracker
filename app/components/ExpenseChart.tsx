"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Expense = {
  title: string;
  amount: number;
  category: string;
};

type Props = {
  expenses: Expense[];
};

const COLORS: Record<string, string> = {
  Food: "#F97316",
  Travel: "#3B82F6",
  Shopping: "#8B5CF6",
  Bills: "#EF4444",
  Entertainment: "#EC4899",
  Health: "#10B981",
  Education: "#EAB308",
  Other: "#6B7280",
};

export default function ExpenseChart({
  expenses,
}: Props) {

  const categoryTotals: Record<string, number> = {};

  expenses.forEach((expense) => {

    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }

  });

  const chartData = Object.entries(categoryTotals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const total = chartData.reduce(
    (acc, item) => acc + item.value,
    0
  );

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-white text-2xl font-semibold">
            Expense Analytics
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Spending distribution by category
          </p>

        </div>

      </div>

      {chartData.length === 0 ? (

        <div className="flex items-center justify-center h-[320px]">

          <p className="text-gray-500">
            No expense data available
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[entry.name] || "#6B7280"
                      }
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="space-y-4">

            {chartData.map((item, index) => {

              const percentage = (
                (item.value / total) * 100
              ).toFixed(0);

              return (

                <div
                  key={index}
                  className="flex items-center justify-between bg-[#1E293B] p-4 rounded-2xl"
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[item.name] || "#6B7280",
                      }}
                    ></div>

                    <p className="text-white">
                      {item.name}
                    </p>

                  </div>

                  <p className="text-gray-400 text-sm">
                    {percentage}%
                  </p>

                </div>

              );
            })}

          </div>

        </div>

      )}

    </div>
  );
}