"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Target, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: "trophy" | "target" | "sparkles";
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon = "trophy",
  title = "No bids yet. Be the first to claim #1.",
  subtitle = "Any bid of $1 or more instantly takes the top rank on this board.",
  ctaText = "Place a bid",
  onAction,
  className,
}: EmptyStateProps) {
  const IconComponent =
    icon === "target" ? Target : icon === "sparkles" ? Sparkles : Trophy;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed border-pb-border bg-pb-card/60 transition-colors",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-pb-primary-soft text-pb-primary flex items-center justify-center mb-4 shadow-sm">
        <IconComponent className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-pb-text-primary font-sora mb-1.5">
        {title}
      </h3>

      {subtitle && (
        <p className="text-sm text-pb-text-secondary max-w-md mb-6 leading-relaxed">
          {subtitle}
        </p>
      )}

      {ctaText && onAction && (
        <Button
          onClick={onAction}
          className="bg-pb-primary text-white dark:text-[#15131F] font-semibold px-6 h-11 rounded-xl shadow-sm hover:opacity-90 transition-all flex items-center gap-1.5"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
