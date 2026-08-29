"use client";

import React from "react";
import { DailyBoard } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { EmptyState } from "@/components/EmptyState";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { useBidModal } from "@/components/BidModal";

interface DayCardProps {
  board: DailyBoard;
}

export function DayCard({ board }: DayCardProps) {
  const { openBidModal } = useBidModal();
  const hasBids = board.bids && board.bids.length > 0;

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-pb-border bg-pb-card shadow-card space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-pb-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pb-primary-soft text-pb-primary flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <h2 className="font-sora font-bold text-xl text-pb-text-primary">
                {board.formattedDate}
              </h2>
              {board.isLive ? (
                <Badge variant="live" className="gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </Badge>
              ) : (
                <Badge variant="muted">CLOSED</Badge>
              )}
            </div>
            <p className="text-xs text-pb-text-secondary mt-0.5">
              {board.isLive
                ? "This day is still being bid on. It closes at midnight UTC."
                : "This daily board has ended and results are permanent."}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 self-start sm:self-auto text-xs text-pb-text-secondary bg-pb-bg px-3.5 py-2 rounded-xl border border-pb-border">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-pb-text-muted" />
            <span>Open · {formatNumber(board.listingCount)} listings</span>
          </div>
          <span>·</span>
          <div className="font-sora font-semibold text-pb-text-primary">
            Top: {formatCurrency(board.topBid)}
          </div>
        </div>
      </div>

      {/* Bids List or Authentic Empty State */}
      {hasBids ? (
        <LeaderboardTable products={board.bids} />
      ) : (
        <EmptyState
          icon="target"
          title="No bids yet today. Be the first to claim #1."
          subtitle="Any bid placed before midnight UTC takes the top rank on today's board."
          ctaText="Claim a rank"
          onAction={() => openBidModal()}
        />
      )}
    </div>
  );
}
