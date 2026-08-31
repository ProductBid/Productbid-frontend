"use client";

import React from "react";
import useSWR from "swr";
import { fetchMarketStats } from "@/lib/api";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { useBidModal } from "@/components/BidModal";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Shield,
  Layers,
  Heart,
  ArrowRight,
  Zap,
  TrendingUp,
  Activity,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export default function AboutPage() {
  const { data: stats } = useSWR("market-stats", fetchMarketStats);
  const { openBidModal } = useBidModal();

  const totalBids = stats?.totalBids ?? 0;
  const liveCount = stats?.liveCount ?? 0;
  const totalVolume = stats?.totalVolume ?? 0;

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4">
      {/* Header & Intro */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pb-primary-soft text-pb-primary text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About ProductBid</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sora text-pb-text-primary tracking-tight">
          About
        </h1>
        <p className="text-lg sm:text-xl text-pb-text-secondary leading-relaxed">
          ProductBid is an open source project designed to help startups get visibility through a bidding-based product discovery system.
        </p>
      </div>

      {/* "Then it went live" section */}
      <div className="p-5 sm:p-8 rounded-3xl border border-pb-border bg-pb-card shadow-card space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pb-primary-soft text-pb-primary flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-sora font-bold text-lg sm:text-xl text-pb-text-primary">
              Then it went live
            </h2>
            <p className="text-xs text-pb-text-secondary">
              A transparent, open leaderboard where products compete purely on bids.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
          <div className="space-y-2 p-4 rounded-2xl bg-pb-bg/60 border border-pb-border/60">
            <div className="flex items-center gap-2 font-sora font-bold text-sm text-pb-text-primary">
              <Shield className="w-4 h-4 text-pb-primary shrink-0" />
              <span>No Accounts</span>
            </div>
            <p className="text-xs text-pb-text-secondary leading-relaxed">
              Anyone can bid by simply submitting a product URL or handle. Zero signups, passwords, or cookies needed.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-pb-bg/60 border border-pb-border/60">
            <div className="flex items-center gap-2 font-sora font-bold text-sm text-pb-text-primary">
              <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Pure Bidding</span>
            </div>
            <p className="text-xs text-pb-text-secondary leading-relaxed">
              Highest bid holds rank #1. No algorithmic curation, no ad networks, and no decay timers.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-pb-bg/60 border border-pb-border/60">
            <div className="flex items-center gap-2 font-sora font-bold text-sm text-pb-text-primary">
              <Activity className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Instant Updates</span>
            </div>
            <p className="text-xs text-pb-text-secondary leading-relaxed">
              When a bid is confirmed via Dodo Payments, the leaderboard refreshes automatically across all viewers.
            </p>
          </div>
        </div>
      </div>

      {/* Three Stat Cards (all default to 0) */}
      <div className="space-y-4">
        <h2 className="font-sora font-bold text-xl text-pb-text-primary">
          Market Stats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Total bids placed */}
          <div className="p-5 sm:p-6 rounded-2xl border border-pb-border bg-pb-card shadow-subtle space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-pb-text-muted font-sora">
              Total Bids Placed
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-sora text-pb-text-primary">
              {formatNumber(totalBids)}
            </div>
            <p className="text-xs text-pb-text-secondary">
              All bids submitted across boards
            </p>
          </div>

          {/* Card 2: Live listings today */}
          <div className="p-5 sm:p-6 rounded-2xl border border-pb-border bg-pb-card shadow-subtle space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-pb-text-muted font-sora">
              Live Listings Today
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-sora text-pb-text-primary">
              {formatNumber(liveCount)}
            </div>
            <p className="text-xs text-pb-text-secondary">
              Active listings on today&apos;s board
            </p>
          </div>

          {/* Card 3: Total volume */}
          <div className="p-5 sm:p-6 rounded-2xl border border-pb-border bg-pb-card shadow-subtle space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-pb-text-muted font-sora">
              Total Volume
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-sora text-pb-primary">
              {formatCurrency(totalVolume)}
            </div>
            <p className="text-xs text-pb-text-secondary">
              Total bid volume processed
            </p>
          </div>
        </div>
      </div>

      {/* Community Thank-You Card */}
      <div className="p-5 sm:p-8 rounded-3xl bg-pb-primary-soft/60 dark:bg-pb-primary-soft/20 border border-pb-primary/20 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pb-primary text-white dark:text-[#15131F] flex items-center justify-center shadow-sm">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-sora font-bold text-lg text-pb-text-primary">
              Built for makers, hackers & products
            </h3>
            <p className="text-xs text-pb-text-secondary">
              Thank you for being part of the open bidding movement.
            </p>
          </div>
        </div>

        <p className="text-sm text-pb-text-secondary leading-relaxed">
          ProductBid is designed to give every product — from independent weekend projects to venture-backed startups — a direct, transparent way to be discovered without needing ad accounts or review bottlenecks.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Button
            onClick={() => openBidModal()}
            className="bg-pb-primary text-white dark:text-[#15131F] font-semibold px-5 h-11 rounded-xl shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <span>Place a bid now</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            asChild
            className="h-11 rounded-xl font-medium text-xs sm:text-sm"
          >
            <a href="https://dodo.pe" target="_blank" rel="noopener noreferrer">
              About Dodo Payments
            </a>
          </Button>
        </div>
      </div>

      {/* Builder Credit Line & Links */}
      <div className="text-center pt-2 pb-6 space-y-2.5">
        <p className="text-xs text-pb-text-muted font-medium">
          Built by <span className="text-pb-text-secondary font-semibold">Aditya Singh</span>
        </p>
        <div className="flex items-center justify-center gap-3.5 text-xs">
          <a
            href="https://x.com/AdityaS888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-pb-text-secondary hover:text-pb-primary transition-colors font-medium"
          >
            <TwitterIcon className="w-3.5 h-3.5 text-pb-primary" />
            <span>X</span>
          </a>
          <span className="text-pb-text-muted text-xs select-none">·</span>
          <a
            href="https://github.com/ProductBid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-pb-text-secondary hover:text-pb-primary transition-colors font-medium"
          >
            <GithubIcon className="w-3.5 h-3.5 text-pb-primary" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
