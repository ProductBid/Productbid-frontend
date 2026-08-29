"use client";

import React, { useState } from "react";
import { Globe, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeroPriceCard } from "@/components/HeroPriceCard";
import { BidToClaimRank } from "@/components/BidToClaimRank";
import { useBidModal } from "@/components/BidModal";
import { INITIAL_CATEGORIES } from "@/lib/api";

interface HeroSectionProps {
  topPrice?: number;
}

export function HeroSection({ topPrice = 0 }: HeroSectionProps) {
  const { openBidModal } = useBidModal();
  const [handleOrUrl, setHandleOrUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bidAmount, setBidAmount] = useState(() => Math.max(3, topPrice > 0 ? topPrice + 1 : 3));

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    openBidModal({
      urlOrHandle: handleOrUrl,
      category: selectedCategory === "all" ? undefined : selectedCategory,
      initialAmount: bidAmount,
    });
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (Pitch + Form + Stepper) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-pb-text-primary tracking-tight leading-[1.15] font-sora">
              The top spot goes to the highest bidder.
            </h1>
            <p className="text-base sm:text-lg text-pb-text-secondary leading-relaxed max-w-xl">
              No accounts. No ads. Drop your product, name a price, and rank climbs instantly. Rank holds until someone bids higher.
            </p>
          </div>

          {/* Quick Bid Form */}
          <form
            onSubmit={handlePlaceBid}
            className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-2xl border border-pb-border bg-pb-card shadow-subtle max-w-xl"
          >
            <div className="relative flex-1">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-pb-text-muted" />
              <Input
                type="text"
                placeholder="yourproduct.com or @handle"
                value={handleOrUrl}
                onChange={(e) => setHandleOrUrl(e.target.value)}
                className="pl-10 h-11 border-none shadow-none focus-visible:ring-0 bg-transparent text-sm placeholder:text-pb-text-muted"
              />
            </div>

            <div className="w-full sm:w-44 shrink-0">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-11 border border-pb-border/60 bg-pb-bg sm:bg-transparent rounded-xl text-xs sm:text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {INITIAL_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="bg-[#1F1B3A] text-white hover:bg-[#2B2650] dark:bg-pb-primary dark:text-[#15131F] font-semibold h-11 px-5 rounded-xl text-sm shrink-0 flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span>Place bid</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Live Stepper widget synchronized with the Place Bid action */}
          <div className="pt-1">
            <BidToClaimRank
              currentTopBid={topPrice}
              stepAmount={1}
              value={bidAmount}
              onChange={setBidAmount}
            />
          </div>
        </div>

        {/* Right Column (Hero Price Module) */}
        <div className="lg:col-span-5">
          <HeroPriceCard price={topPrice} />
        </div>
      </div>
    </section>
  );
}
