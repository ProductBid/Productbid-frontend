"use client";

import React from "react";
import useSWR from "swr";
import { fetchMarketStats } from "@/lib/api";
import { formatNumber, formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function TickerBar() {
  const { data: stats } = useSWR("market-stats", fetchMarketStats);

  const liveCount = stats?.liveCount ?? 0;
  const totalBids = stats?.totalBids ?? 0;
  const totalVolume = stats?.totalVolume ?? 0;

  return (
    <div className="w-full bg-[#1F1B3A] dark:bg-[#15131F] text-white text-xs py-2 px-4 border-b border-[#2A2640] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto whitespace-nowrap custom-scrollbar py-0.5">
          <div className="flex items-center space-x-1.5 font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">{formatNumber(liveCount)}</span>
            <span className="text-[#A29DC2] text-[11px]">LIVE</span>
          </div>

          <span className="text-[#5F5A78]">·</span>

          <div className="flex items-center space-x-1.5 font-medium tracking-wide">
            <span className="font-semibold text-white">{formatNumber(totalBids)}</span>
            <span className="text-[#A29DC2] text-[11px]">BIDS PLACED</span>
          </div>

          <span className="text-[#5F5A78]">·</span>

          <div className="flex items-center space-x-1.5 font-medium tracking-wide">
            <span className="font-semibold text-white">{formatCurrency(totalVolume)}</span>
            <span className="text-[#A29DC2] text-[11px]">TOTAL VOLUME</span>
          </div>
        </div>

        <Link
          href="/about"
          className="hidden md:inline-flex items-center text-[11px] text-[#A29DC2] hover:text-[#B7AEFA] transition-colors font-medium ml-4 shrink-0 group"
        >
          <span>see market stats</span>
          <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
