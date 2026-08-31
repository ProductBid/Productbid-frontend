"use client";

import React from "react";
import { Product } from "@/lib/types";
import { LeaderboardRow } from "@/components/LeaderboardRow";
import { EmptyState } from "@/components/EmptyState";
import { useBidModal } from "@/components/BidModal";

interface LeaderboardTableProps {
  products: Product[];
  category?: string;
  emptyTitle?: string;
  emptySubtitle?: string;
  onDeleted?: (deletedBidId: string) => void;
}

export function LeaderboardTable({
  products,
  category,
  emptyTitle = "No bids yet. Be the first to claim #1.",
  emptySubtitle = "No products have bid on this board yet. Place a bid to take the top spot.",
  onDeleted,
}: LeaderboardTableProps) {
  const { openBidModal } = useBidModal();

  if (!products || products.length === 0) {
    return (
      <div className="space-y-4">
        {/* Table Header row */}
        <div className="flex items-center justify-between px-5 py-2.5 text-[11px] font-bold text-pb-text-muted uppercase tracking-wider font-sora">
          <div className="flex items-center space-x-6">
            <span>Rank</span>
            <span>Product</span>
          </div>
          <span>Bid</span>
        </div>

        {/* Authentic Empty State */}
        <EmptyState
          icon="trophy"
          title={emptyTitle}
          subtitle={emptySubtitle}
          ctaText="Place a bid"
          onAction={() => openBidModal({ category })}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Table Header row */}
      <div className="flex items-center justify-between px-5 py-2.5 text-[11px] font-bold text-pb-text-muted uppercase tracking-wider font-sora">
        <div className="flex items-center space-x-6">
          <span className="w-8">Rank</span>
          <span>Product</span>
        </div>
        <span>Bid</span>
      </div>

      {/* Rows */}
      {products.map((product, idx) => (
        <LeaderboardRow
          key={product.id || idx}
          product={product}
          isRankOne={idx === 0}
          onDeleted={onDeleted}
        />
      ))}
    </div>
  );
}
