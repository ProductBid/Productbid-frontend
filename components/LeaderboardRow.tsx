"use client";

import React, { useState } from "react";
import { useSWRConfig } from "swr";
import { Product } from "@/lib/types";
import { formatCurrency, formatRank, formatRelativeTime, formatNumber } from "@/lib/formatters";
import { ExternalLink, Sparkles, MoreHorizontal, Trash2, Loader2 } from "lucide-react";
import { deleteBid } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LeaderboardRowProps {
  product: Product;
  isRankOne?: boolean;
  onDeleted?: (deletedBidId: string) => void;
}

export function LeaderboardRow({
  product,
  isRankOne = false,
  onDeleted,
}: LeaderboardRowProps) {
  const { mutate } = useSWRConfig();
  const [imageError, setImageError] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const hasValidLogo = !!product.iconUrl && product.iconUrl.trim().length > 0 && !imageError;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteBid(product.id);
      if (res.success) {
        setIsDeleteDialogOpen(false);
        // Revalidate all active leaderboard queries to instantly update UI and re-rank
        mutate(
          (key) =>
            typeof key === "string" ||
            (Array.isArray(key) &&
              (key[0] === "leaderboard" || key[0] === "daily-today" || key[0] === "top-product")),
          undefined,
          { revalidate: true }
        );
        if (onDeleted) {
          onDeleted(product.id);
        }
      } else {
        alert(res.message || "Failed to delete bid.");
      }
    } catch (err: any) {
      console.error("Delete bid error:", err);
      alert(err.message || "Something went wrong deleting the bid.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex items-center justify-between p-3.5 sm:p-5 rounded-2xl border transition-all duration-150 mb-3",
          // Card styling
          "bg-pb-card border-pb-border hover:border-pb-primary/40 hover:shadow-card",
          // Rank #1 left accent
          isRankOne
            ? "border-l-4 border-l-pb-primary"
            : "border-l-4 border-l-transparent hover:border-l-pb-border"
        )}
      >
        <div className="flex items-center space-x-2.5 sm:space-x-4 min-w-0 flex-1 mr-2 sm:mr-4">
          {/* Rank Number */}
          <div className="shrink-0 w-6 sm:w-8 flex items-center justify-center">
            <span
              className={cn(
                "font-sora font-extrabold text-sm sm:text-lg tabular-nums tracking-tight",
                isRankOne
                  ? "text-pb-primary"
                  : "text-pb-text-muted group-hover:text-pb-text-secondary"
              )}
            >
              {formatRank(product.rank)}
            </span>
          </div>

          {/* Logo / Placeholder icon */}
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-pb-primary-soft/60 dark:bg-pb-primary-soft/20 border border-pb-primary/10 flex items-center justify-center text-pb-primary font-sora font-bold text-sm sm:text-lg overflow-hidden">
            {hasValidLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.iconUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
                onError={() => setImageError(true)}
              />
            ) : (
              (product.name?.charAt(0) || "P").toUpperCase()
            )}
          </div>

          {/* Product Details */}
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <a
                href={product.url.startsWith("http") ? product.url : `https://${product.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sora font-bold text-sm sm:text-base text-pb-text-primary group-hover:text-pb-primary transition-colors truncate flex items-center gap-1 sm:gap-1.5"
              >
                <span className="truncate">{product.name}</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0 group-hover:opacity-100 text-pb-primary shrink-0 transition-opacity" />
              </a>

              {isRankOne && (
                <span className="shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-pb-primary-soft text-pb-primary text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5" />
                  #1 Spot
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-pb-text-secondary truncate">
              {product.tagline}
            </p>

            {/* Meta text */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] sm:text-[11px] text-pb-text-muted pt-0.5">
              <span>{formatRelativeTime(product.createdAt)}</span>
              <span>·</span>
              <span className="capitalize">{product.category}</span>
              <span>·</span>
              <span>{formatNumber(product.clickCount)} clicks</span>
            </div>
          </div>
        </div>

        {/* Right Section: Bid Amount & 3-dot Menu */}
        <div className="shrink-0 flex items-center space-x-2 sm:space-x-3.5">
          <div className="text-right">
            <span
              className={cn(
                "font-sora font-extrabold text-sm sm:text-xl tracking-tight",
                isRankOne ? "text-pb-primary" : "text-pb-text-primary"
              )}
            >
              {formatCurrency(product.bidAmount)}
            </span>
            <div className="text-[9px] sm:text-[10px] font-medium text-pb-text-muted uppercase tracking-wider">
              {isRankOne ? "Top Bid" : "Bid"}
            </div>
          </div>

          {/* 3-dots Menu for Admin / Bid Management */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-1 sm:p-1.5 rounded-lg text-pb-text-muted hover:text-pb-text-primary hover:bg-pb-bg border border-transparent hover:border-pb-border transition-colors cursor-pointer"
                title="Bid options"
              >
                <MoreHorizontal className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <span className="sr-only">Options for {product.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-32 min-w-[7.5rem] bg-pb-card border border-pb-border shadow-xl p-1 rounded-xl"
            >
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-500/10 flex items-center gap-2 cursor-pointer text-xs font-semibold px-2.5 py-2 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-sora text-pb-text-primary">
              Delete Bid
            </DialogTitle>
            <DialogDescription className="text-xs text-pb-text-secondary leading-relaxed pt-1.5">
              Are you sure you want to delete this bid? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-2.5 pt-4 mt-2 border-t border-pb-border">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="rounded-xl text-xs h-9 px-4 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs h-9 px-4 gap-1.5 font-semibold"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
