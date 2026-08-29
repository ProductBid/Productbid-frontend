"use client";

import React from "react";
import useSWR from "swr";
import { fetchDailyBoard, fetchHistoricalDays, fetchMarketStats } from "@/lib/api";
import { HeroPriceCard } from "@/components/HeroPriceCard";
import { DayCard } from "@/components/DayCard";
import { formatNumber } from "@/lib/formatters";
import Link from "next/link";
import { ArrowRight, History } from "lucide-react";

export default function DailyPage() {
  const { data: stats } = useSWR("market-stats", fetchMarketStats);
  const { data: todayBoard } = useSWR("daily-today", () => fetchDailyBoard());
  const { data: history = [] } = useSWR("daily-history", fetchHistoricalDays);

  const onlineCount = stats?.liveCount ?? 0;
  const visitorsToday = stats?.visitorsToday ?? 0;
  const todayTopBid = todayBoard?.topBid ?? 0;

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-sora text-pb-text-primary tracking-tight">
              Daily
            </h1>
            <p className="text-base text-pb-text-secondary leading-relaxed max-w-xl">
              Each UTC day gets its own board. Rank is what you spent that day. Today stays live until midnight UTC, then the day closes.
            </p>
          </div>

          {/* Live stats line */}
          <div className="flex items-center space-x-2 text-xs text-pb-text-secondary pt-2">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-pb-text-primary">{formatNumber(onlineCount)}</strong> online
            </span>
            <span className="text-pb-text-muted">·</span>
            <span className="font-medium">
              <strong className="text-pb-text-primary">{formatNumber(visitorsToday)}</strong> visitors today
            </span>
            <span className="text-pb-text-muted">·</span>
            <Link
              href="/about"
              className="text-pb-primary hover:underline flex items-center gap-1 font-semibold"
            >
              <span>see stats</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right: Hero Price Module for Daily */}
        <div className="lg:col-span-5">
          <HeroPriceCard
            price={todayTopBid}
            label="TODAY'S #1 PRICE"
            subtext="bid today before midnight UTC"
          />
        </div>
      </div>

      {/* Today's Active Board Card */}
      {todayBoard && <DayCard board={todayBoard} />}

      {/* Historical Days Section */}
      {history && history.length > 0 ? (
        <div className="space-y-6 pt-6 border-t border-pb-border">
          <div className="flex items-center space-x-2 text-pb-text-secondary">
            <History className="w-5 h-5 text-pb-primary" />
            <h2 className="font-sora font-bold text-xl text-pb-text-primary">
              Previous Days
            </h2>
          </div>
          <div className="space-y-6">
            {history.map((day) => (
              <DayCard key={day.date} board={day} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
