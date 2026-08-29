"use client";

import React from "react";
import useSWR from "swr";
import { fetchCategories, fetchMarketStats, INITIAL_CATEGORIES } from "@/lib/api";
import { CategoryCard } from "@/components/CategoryCard";
import { formatNumber } from "@/lib/formatters";
import Link from "next/link";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";
import { useBidModal } from "@/components/BidModal";

export default function CategoriesPage() {
  const { data: categories = INITIAL_CATEGORIES } = useSWR("categories", fetchCategories, {
    fallbackData: INITIAL_CATEGORIES,
  });
  const { data: stats } = useSWR("market-stats", fetchMarketStats);
  const { openBidModal } = useBidModal();

  const totalBids = stats?.totalBids ?? 0;

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-sora text-pb-text-primary tracking-tight">
            Categories
          </h1>
          <p className="text-base text-pb-text-secondary leading-relaxed max-w-2xl">
            Every category has its own ranking. Pick one to see who leads it or place a bid to take the top spot.
          </p>
        </div>

        {/* Live stats line */}
        <div className="flex items-center space-x-2 text-xs text-pb-text-secondary">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <strong className="text-pb-text-primary">{formatNumber(categories.length)}</strong> active categories
          </span>
          <span className="text-pb-text-muted">·</span>
          <span className="font-medium">
            <strong className="text-pb-text-primary">{formatNumber(totalBids)}</strong> total listings placed
          </span>
          <span className="text-pb-text-muted">·</span>
          <Link
            href="/"
            className="text-pb-primary hover:underline flex items-center gap-1 font-semibold"
          >
            <span>view all-time board</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Categories Grid (Top 6 visible cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.slice(0, 6).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* "New categories coming soon" banner card */}
      <div className="rounded-3xl p-8 bg-pb-primary-soft/60 dark:bg-pb-primary-soft/20 border border-pb-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-pb-primary text-white dark:text-[#15131F] flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="font-sora font-bold text-lg text-pb-text-primary">
                New categories coming soon
              </h3>
              <Sparkles className="w-4 h-4 text-pb-primary" />
            </div>
            <p className="text-xs sm:text-sm text-pb-text-secondary mt-1">
              Need a dedicated board for your niche? Bid across existing boards or suggest a new category.
            </p>
          </div>
        </div>

        <button
          onClick={() => openBidModal()}
          className="shrink-0 bg-pb-primary text-white dark:text-[#15131F] font-semibold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-all shadow-sm flex items-center gap-2"
        >
          <span>Bid on a category</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
