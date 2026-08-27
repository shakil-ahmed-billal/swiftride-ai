"use client";

import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

interface Transaction {
  id: number;
  carName: string;
  duration: string;
  paymentMethod: string;
  txId: string;
  status: "Success" | "Cancelled" | "Pending";
  amount: string;
  image: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    carName: "Range Rover",
    duration: "15 Mins",
    paymentMethod: "Paypal",
    txId: "#416645453773",
    status: "Success",
    amount: "$1099.00",
    image: "/admin-dashboard/dashboard_9.webp",
  },
  {
    id: 2,
    carName: "Red Toyota",
    duration: "15 Mins",
    paymentMethod: "Apple Pay",
    txId: "#147784454554",
    status: "Cancelled",
    amount: "$600.55",
    image: "/admin-dashboard/dashboard_10.webp",
  },
  {
    id: 3,
    carName: "Blue Nissan",
    duration: "15 Mins",
    paymentMethod: "Stripe",
    txId: "#147784454554",
    status: "Pending",
    amount: "$200.10",
    image: "/admin-dashboard/dashboard_11.webp",
  },
  {
    id: 4,
    carName: "Toyota Corolla",
    duration: "15 Mins",
    paymentMethod: "PayU",
    txId: "#147784454554",
    status: "Success",
    amount: "$1569.00",
    image: "/admin-dashboard/dashboard_14.webp",
  },
  {
    id: 5,
    carName: "Range Rover",
    duration: "15 Mins",
    paymentMethod: "Paytm",
    txId: "#147784454554",
    status: "Success",
    amount: "$1478.00",
    image: "/admin-dashboard/dashboard_13.webp",
  },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white rounded-[8px] border border-slate-200/80 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.03)] flex flex-col h-full overflow-hidden">
      {/* Header with View All */}
      <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#0B132A]">Recent Transactions</h2>
        <button
          type="button"
          className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-[5px] text-xs font-semibold transition-colors"
        >
          View All
        </button>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs">
          {/* Table Head */}
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-slate-100 text-slate-600 font-semibold">
              <th className="py-2.5 px-3.5 w-10">#</th>
              <th className="py-2.5 px-3.5 min-w-[170px]">Order Details</th>
              <th className="py-2.5 px-3.5 min-w-[130px]">Payment</th>
              <th className="py-2.5 px-3.5 min-w-[100px]">Status</th>
              <th className="py-2.5 px-3.5 text-right min-w-[90px]">Amount</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-slate-50/70 transition-colors group"
              >
                {/* Number */}
                <td className="py-2 px-3.5 font-semibold text-slate-400">
                  {tx.id}
                </td>

                {/* Order Details */}
                <td className="py-2 px-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-7 rounded-[5px] bg-slate-50 border border-slate-100 p-0.5 flex items-center justify-center shrink-0">
                      <Image
                        src={tx.image}
                        alt={tx.carName}
                        width={32}
                        height={24}
                        className="object-contain max-h-6 w-auto group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-[#0B132A] leading-tight">
                        {tx.carName}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{tx.duration}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Payment */}
                <td className="py-2 px-3.5">
                  <div className="font-medium text-slate-800">
                    {tx.paymentMethod}
                  </div>
                  <div className="text-[11px] font-mono text-sky-600">
                    {tx.txId}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-2 px-3.5">
                  {tx.status === "Success" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Success
                    </span>
                  )}
                  {tx.status === "Cancelled" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Cancelled
                    </span>
                  )}
                  {tx.status === "Pending" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Pending
                    </span>
                  )}
                </td>

                {/* Amount */}
                <td className="py-2 px-3.5 text-right font-extrabold text-[#0B132A] text-sm">
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
