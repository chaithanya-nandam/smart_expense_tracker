"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  FaHome,
  FaWallet,
  FaChartPie,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {

  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: <FaHome />,
    },
    {
      name: "Expenses",
      href: "/expenses",
      icon: <FaWallet />,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <FaChartPie />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside className="w-60 min-h-screen bg-[#0B1120] border-r border-gray-800 px-5 py-8 flex flex-col justify-between">

      <div>

        <div className="mb-12">

          <h1 className="text-2xl font-bold text-white leading-tight">
            Smart Expense
            <span className="block text-blue-400">
              Analytics
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Personal Finance Intelligence
          </p>

        </div>

        <ul className="space-y-3">

          {navItems.map((item) => {

            const isActive =
              pathname === item.href;

            return (

              <li key={item.name}>

                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-[#1E293B] text-white border border-gray-700"
                      : "text-gray-400 hover:text-white hover:bg-[#1E293B]"
                  }`}
                >

                  {item.icon}

                  {item.name}

                </Link>

              </li>

            );
          })}

        </ul>

      </div>

    

    </aside>
  );
}