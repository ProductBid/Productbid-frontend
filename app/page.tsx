"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { HeroSection } from "@/components/HeroSection";
import { CategoryTabs } from "@/components/CategoryTabs";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { fetchLeaderboard, fetchCategories, fetchTopProduct, INITIAL_CATEGORIES } from "@/lib/api";

export default function BoardPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: categories = INITIAL_CATEGORIES } = useSWR("categories", fetchCategories, {
    fallbackData: INITIAL_CATEGORIES,
  });
  const { data: products = [] } = useSWR(
    ["leaderboard", selectedCategory],
    () => fetchLeaderboard(selectedCategory)
  );
  const { data: topProduct } = useSWR("top-product", fetchTopProduct);

  const topPrice = topProduct?.bidAmount ?? 0;

  return (
    <div className="space-y-8">
      {/* 2-Column Hero */}
      <HeroSection topPrice={topPrice} />

      {/* Main Leaderboard Section */}
      <section className="space-y-4">
        {/* Category Filter Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Leaderboard Table with zero-data empty state */}
        <LeaderboardTable
          products={products}
          category={selectedCategory === "all" ? undefined : selectedCategory}
          emptyTitle="No bids yet. Be the first to claim #1."
          emptySubtitle="No products have bid on this board yet. Name your price and claim the top rank instantly."
        />
      </section>
    </div>
  );
}
