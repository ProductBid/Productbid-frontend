"use client";

import React from "react";
import { formatCurrency } from "@/lib/formatters";
import { Sparkles, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroPriceCardProps {
  price?: number;
  label?: string;
  subtext?: string;
  className?: string;
}

export function HeroPriceCard({
  price = 0,
  label = "CURRENT #1 PRICE",
  subtext = "Bid higher to take the top spot",
  className,
}: HeroPriceCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-7 sm:p-9 transition-all border",
        // Light mode: soft lavender tint/gradient + lavender border + #5B4FE8 text
        "bg-gradient-to-br from-[#EDEBFA] via-[#F2EFFD] to-[#F7F6FB] border-[#E4E1F0] shadow-card",
        // Dark mode: dark navy #1F1B3A + dark border + #B7AEFA text
        "dark:bg-[#1F1B3A] dark:from-[#1F1B3A] dark:to-[#17142B] dark:border-[#2A2640]",
        className
      )}
    >
      {/* Subtle decorative background glow */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#5B4FE8]/10 dark:bg-[#B7AEFA]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col justify-between h-full space-y-4">
        {/* Top Header line */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-[#5B4FE8] dark:text-[#B7AEFA]" />
            <span className="text-xs font-bold tracking-wider text-[#6E6889] dark:text-[#8B87A8] uppercase font-sora">
              {label}
            </span>
          </div>
          <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#5B4FE8]/10 dark:bg-[#B7AEFA]/15 text-[#5B4FE8] dark:text-[#B7AEFA] text-[11px] font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>TOP RANK</span>
          </div>
        </div>

        {/* Big Price Number */}
        <div className="py-2">
          <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sora text-[#5B4FE8] dark:text-[#B7AEFA]">
            {formatCurrency(price)}
          </div>
        </div>

        {/* Bottom Subtext */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E4E1F0]/60 dark:border-[#2A2640]">
          <span className="text-xs sm:text-sm text-[#6E6889] dark:text-[#8B87A8] font-medium">
            {subtext}
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}
