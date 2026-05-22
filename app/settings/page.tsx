"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

export default function SettingsPage() {

  const [monthlyBudget, setMonthlyBudget] =
    useState(0);

  const [defaultCategory, setDefaultCategory] =
    useState("Food");

  const [currency, setCurrency] =
    useState("$");

  useEffect(() => {

    const savedBudget =
      localStorage.getItem("monthlyBudget");

    const savedCategory =
      localStorage.getItem("defaultCategory");

    const savedCurrency =
      localStorage.getItem("currency");

    if (savedBudget) {
      setMonthlyBudget(Number(savedBudget));
    }

    if (savedCategory) {
      setDefaultCategory(savedCategory);
    }

    if (savedCurrency) {
      setCurrency(savedCurrency);
    }

  }, []);

  const saveSettings = () => {

    localStorage.setItem(
      "monthlyBudget",
      monthlyBudget.toString()
    );

    localStorage.setItem(
      "defaultCategory",
      defaultCategory
    );

    localStorage.setItem(
      "currency",
      currency
    );

    alert("Settings Saved Successfully ✅");
  };

  return (
    <main className="flex bg-[#0F172A] min-h-screen">

      <Sidebar />

      <section className="flex-1 px-8 py-7">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-white">
            Settings
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your preferences and financial settings.
          </p>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <h2 className="text-white text-2xl font-semibold mb-6">
              Finance Preferences
            </h2>

            <div className="mb-5">

              <label className="block text-gray-400 text-sm mb-3">
                Monthly Budget
              </label>

              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) =>
                  setMonthlyBudget(
                    Number(e.target.value)
                  )
                }
                className="w-full bg-[#1E293B] text-white p-4 rounded-2xl outline-none"
              />

            </div>

            <div className="mb-5">

              <label className="block text-gray-400 text-sm mb-3">
                Default Expense Category
              </label>

              <select
                value={defaultCategory}
                onChange={(e) =>
                  setDefaultCategory(
                    e.target.value
                  )
                }
                className="w-full bg-[#1E293B] text-white p-4 rounded-2xl outline-none"
              >

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

            <div className="mb-5">

              <label className="block text-gray-400 text-sm mb-3">
                Preferred Currency
              </label>

              <select
                value={currency}
                onChange={(e) =>
                  setCurrency(
                    e.target.value
                  )
                }
                className="w-full bg-[#1E293B] text-white p-4 rounded-2xl outline-none"
              >

                <option value="$">
                  USD ($)
                </option>

                <option value="₹">
                  INR (₹)
                </option>

                <option value="€">
                  EUR (€)
                </option>

                <option value="£">
                  GBP (£)
                </option>

              </select>

            </div>

            <button
              onClick={saveSettings}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] transition duration-300 py-4 rounded-2xl text-white font-medium mt-3"
            >
              Save Settings
            </button>

          </div>

          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">

            <h2 className="text-white text-2xl font-semibold mb-6">
              App Information
            </h2>

            <div className="space-y-5">

              <div className="bg-[#1E293B] rounded-2xl p-5">

                <h3 className="text-white font-medium">
                  Application
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Smart Expense Analytics Dashboard
                </p>

              </div>

              <div className="bg-[#1E293B] rounded-2xl p-5">

                <h3 className="text-white font-medium">
                  Version
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  v1.0.0
                </p>

              </div>

              <div className="bg-[#1E293B] rounded-2xl p-5">

                <h3 className="text-white font-medium">
                  Developed By
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Chaithu
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}