"use client";

import React, { useState } from "react";
import { Category } from "@/lib/types";
import { INITIAL_CATEGORIES } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Check,
  Search,
  Bot,
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
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-3.5 h-3.5" />,
  Search: <Search className="w-3.5 h-3.5" />,
  Megaphone: <Megaphone className="w-3.5 h-3.5" />,
  Coins: <Coins className="w-3.5 h-3.5" />,
  Code2: <Code2 className="w-3.5 h-3.5" />,
  Briefcase: <Briefcase className="w-3.5 h-3.5" />,
  ShieldCheck: <ShieldCheck className="w-3.5 h-3.5" />,
  HeartPulse: <HeartPulse className="w-3.5 h-3.5" />,
  Share2: <Share2 className="w-3.5 h-3.5" />,
  Trophy: <Trophy className="w-3.5 h-3.5" />,
  Users: <Users className="w-3.5 h-3.5" />,
  GraduationCap: <GraduationCap className="w-3.5 h-3.5" />,
  Building2: <Building2 className="w-3.5 h-3.5" />,
  ShoppingBag: <ShoppingBag className="w-3.5 h-3.5" />,
  Globe2: <Globe2 className="w-3.5 h-3.5" />,
  Gamepad2: <Gamepad2 className="w-3.5 h-3.5" />,
  UserCheck: <UserCheck className="w-3.5 h-3.5" />,
  Zap: <Zap className="w-3.5 h-3.5" />,
  Palette: <Palette className="w-3.5 h-3.5" />,
  PenTool: <PenTool className="w-3.5 h-3.5" />,
  Compass: <Compass className="w-3.5 h-3.5" />,
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  Mic: <Mic className="w-3.5 h-3.5" />,
  Target: <Target className="w-3.5 h-3.5" />,
  Plane: <Plane className="w-3.5 h-3.5" />,
  Home: <Home className="w-3.5 h-3.5" />,
  Newspaper: <Newspaper className="w-3.5 h-3.5" />,
  Folder: <Folder className="w-3.5 h-3.5" />,
};

interface CategoryTabsProps {
  categories?: Category[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export function CategoryTabs({
  categories = INITIAL_CATEGORIES,
  activeCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  // Use INITIAL_CATEGORIES fallback if empty
  const allCats = categories && categories.length > 0 ? categories : INITIAL_CATEGORIES;
  
  const visibleCategories = allCats.slice(0, 6);
  const overflowCategories = allCats.slice(6);

  const [searchTerm, setSearchTerm] = useState("");

  const activeOverflowCategory = overflowCategories.find(
    (cat) => cat.slug === activeCategory
  );
  const isOverflowActive = !!activeOverflowCategory;

  const filteredOverflow = overflowCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border-b border-pb-border mb-6">
      <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto custom-scrollbar pb-1">
        {/* "All Categories" Tab */}
        <button
          onClick={() => onSelectCategory("all")}
          className={cn(
            "relative px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors rounded-lg shrink-0",
            activeCategory === "all"
              ? "text-pb-primary font-bold"
              : "text-pb-text-secondary hover:text-pb-text-primary hover:bg-pb-primary-soft/40"
          )}
        >
          All Categories
          {activeCategory === "all" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-pb-primary" />
          )}
        </button>

        {/* First 6 Visible Category Tabs */}
        {visibleCategories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={cn(
                "relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors rounded-lg shrink-0",
                isActive
                  ? "text-pb-primary font-bold"
                  : "text-pb-text-secondary hover:text-pb-text-primary hover:bg-pb-primary-soft/40"
              )}
            >
              {cat.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-pb-primary" />
              )}
            </button>
          );
        })}

        {/* Overflow "More ▾" Dropdown for Remaining 22 Categories */}
        {overflowCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "relative flex items-center space-x-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-lg transition-colors shrink-0 outline-none",
                  isOverflowActive
                    ? "text-pb-primary font-bold"
                    : "text-pb-text-secondary hover:text-pb-text-primary hover:bg-pb-primary-soft/40"
                )}
                aria-label="More categories"
              >
                <span>{isOverflowActive ? activeOverflowCategory.name : "More"}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
                {isOverflowActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-pb-primary" />
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-72 sm:w-80 max-h-96 overflow-hidden flex flex-col p-2 bg-pb-card border border-pb-border shadow-2xl rounded-2xl"
            >
              <div className="px-2.5 py-1.5 flex items-center justify-between">
                <DropdownMenuLabel className="p-0 text-xs font-bold text-pb-text-primary font-sora">
                  All Other Categories ({overflowCategories.length})
                </DropdownMenuLabel>
              </div>

              {/* Quick Search inside More dropdown */}
              <div className="px-1 pb-2">
                <div className="relative flex items-center">
                  <Search className="absolute left-2.5 w-3.5 h-3.5 text-pb-text-muted" />
                  <input
                    type="text"
                    placeholder="Search category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-8 pl-8 pr-3 text-xs bg-pb-bg border border-pb-border/80 rounded-lg text-pb-text-primary placeholder:text-pb-text-muted outline-none focus:border-pb-primary transition-colors"
                  />
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Scrollable list of overflow categories */}
              <div className="overflow-y-auto custom-scrollbar flex-1 max-h-64 space-y-0.5 pr-1">
                {filteredOverflow.length > 0 ? (
                  filteredOverflow.map((cat) => {
                    const isSelected = activeCategory === cat.slug;
                    const catIcon = iconMap[cat.iconName] || <Folder className="w-3.5 h-3.5" />;
                    return (
                      <DropdownMenuItem
                        key={cat.slug}
                        onClick={() => onSelectCategory(cat.slug)}
                        className={cn(
                          "cursor-pointer px-2.5 py-2 rounded-xl text-xs flex items-center justify-between gap-2 transition-colors",
                          isSelected
                            ? "bg-pb-primary-soft text-pb-primary font-bold"
                            : "text-pb-text-secondary hover:bg-pb-primary-soft/50 hover:text-pb-text-primary"
                        )}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className={cn(
                            "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
                            isSelected ? "bg-pb-primary text-white dark:text-[#15131F]" : "bg-pb-primary-soft/60 text-pb-primary"
                          )}>
                            {catIcon}
                          </span>
                          <span className="truncate">{cat.name}</span>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-pb-primary shrink-0 ml-2" />
                        )}
                      </DropdownMenuItem>
                    );
                  })
                ) : (
                  <div className="text-center py-4 text-xs text-pb-text-muted">
                    No categories found matching &quot;{searchTerm}&quot;
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
