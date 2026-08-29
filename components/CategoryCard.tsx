"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/lib/types";
import { formatCurrency } from "@/lib/formatters";
import { useBidModal } from "@/components/BidModal";
import {
  Bot,
  Search,
  Megaphone,
  Coins,
  Code2,
  Briefcase,
  ShieldCheck,
  HeartPulse,
  Share2,
  Trophy,
  Users,
  GraduationCap,
  Building2,
  ShoppingBag,
  Globe2,
  Gamepad2,
  UserCheck,
  Zap,
  Palette,
  PenTool,
  Compass,
  Sparkles,
  Mic,
  Target,
  Plane,
  Home,
  Newspaper,
  Folder,
  ArrowRight,
  Plus,
} from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Megaphone: <Megaphone className="w-5 h-5" />,
  Coins: <Coins className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  Globe2: <Globe2 className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  PenTool: <PenTool className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Mic: <Mic className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Newspaper: <Newspaper className="w-5 h-5" />,
  Folder: <Folder className="w-5 h-5" />,
};

export function CategoryCard({ category }: CategoryCardProps) {
  const { openBidModal } = useBidModal();
  const icon = iconMap[category.iconName] || <Bot className="w-5 h-5" />;
  const hasListing = !!category.topProduct;

  return (
    <div className="group flex flex-col justify-between p-6 rounded-2xl border border-pb-border bg-pb-card hover:border-pb-primary/40 hover:shadow-card transition-all duration-200">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-pb-primary-soft text-pb-primary flex items-center justify-center font-bold">
            {icon}
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pb-bg border border-pb-border text-pb-text-muted">
            {category.productCount} {category.productCount === 1 ? "bid" : "bids"}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-sora font-bold text-lg text-pb-text-primary group-hover:text-pb-primary transition-colors mb-1">
          {category.name}
        </h3>
        <p className="text-xs text-pb-text-secondary line-clamp-2 mb-5">
          {category.description}
        </p>

        {/* Current #1 state */}
        <div className="p-3.5 rounded-xl bg-pb-bg/60 border border-pb-border/60 mb-5">
          <div className="text-[10px] font-bold text-pb-text-muted uppercase tracking-wider mb-1 font-sora">
            Current #1
          </div>
          {hasListing && category.topProduct ? (
            <div className="flex items-center justify-between">
              <span className="font-sora font-semibold text-sm text-pb-text-primary truncate mr-2">
                {category.topProduct.name}
              </span>
              <span className="font-sora font-bold text-sm text-pb-primary">
                {formatCurrency(category.topBid)}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-pb-text-muted">
              <span>No listings yet</span>
              <span className="font-sora font-semibold text-pb-text-muted">$0</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-pb-border/50 text-xs">
        <Link
          href={`/?category=${category.slug}`}
          className="font-medium text-pb-primary hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>view category</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={() => openBidModal({ category: category.slug })}
          className="text-pb-text-secondary hover:text-pb-primary font-medium flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Bid</span>
        </button>
      </div>
    </div>
  );
}
