"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatCurrency, formatRank, formatRelativeTime, formatNumber } from "@/lib/formatters";
import { ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardRowProps {
  product: Product;
  isRankOne?: boolean;
}

export function LeaderboardRow({ product, isRankOne = false }: LeaderboardRowProps) {
  return (
    <div
      className={cn(
        "group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-150 mb-3",
        // Card styling
        "bg-pb-card border-pb-border hover:border-pb-primary/40 hover:shadow-card",
        // Rank #1 left accent
        isRankOne
          ? "border-l-4 border-l-pb-primary"
          : "border-l-4 border-l-transparent hover:border-l-pb-border"
      )}
    >
      <div className="flex items-center space-x-3.5 sm:space-x-5 min-w-0 flex-1 mr-4">
        {/* Rank Number */}
        <div className="shrink-0 flex items-center justify-center">
          <span
            className={cn(
              "font-sora font-extrabold text-base sm:text-lg tabular-nums tracking-tight",
              isRankOne
                ? "text-pb-primary"
                : "text-pb-text-muted group-hover:text-pb-text-secondary"
            )}
          >
            {formatRank(product.rank)}
          </span>
        </div>

        {/* Logo / Placeholder icon */}
        <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-pb-primary-soft/60 dark:bg-pb-primary-soft/20 border border-pb-primary/10 flex items-center justify-center text-pb-primary font-sora font-bold text-base sm:text-lg overflow-hidden">
          {product.iconUrl ? (
            <Image
              src={product.iconUrl}
              alt={product.name}
              width={48}
              height={48}
              unoptimized
              className="w-full h-full object-cover"
            />
          ) : (
            product.name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Product Details */}
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center space-x-2">
            <a
              href={product.url.startsWith("http") ? product.url : `https://${product.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sora font-bold text-base text-pb-text-primary group-hover:text-pb-primary transition-colors truncate flex items-center gap-1.5"
            >
              <span className="truncate">{product.name}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-pb-primary shrink-0 transition-opacity" />
            </a>

            {isRankOne && (
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pb-primary-soft text-pb-primary text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-2.5 h-2.5" />
                #1 Spot
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-pb-text-secondary truncate">
            {product.tagline}
          </p>

          {/* Meta text */}
          <div className="flex items-center space-x-2 text-[11px] text-pb-text-muted pt-0.5">
            <span>{formatRelativeTime(product.createdAt)}</span>
            <span>·</span>
            <span className="capitalize">{product.category}</span>
            <span>·</span>
            <span>{formatNumber(product.clickCount)} clicks</span>
          </div>
        </div>
      </div>

      {/* Right Column: Bid Amount */}
      <div className="shrink-0 text-right">
        <span
          className={cn(
            "font-sora font-extrabold text-base sm:text-xl tracking-tight",
            isRankOne ? "text-pb-primary" : "text-pb-text-primary"
          )}
        >
          {formatCurrency(product.bidAmount)}
        </span>
        <div className="text-[10px] font-medium text-pb-text-muted uppercase tracking-wider">
          {isRankOne ? "Top Bid" : "Bid"}
        </div>
      </div>
    </div>
  );
}
