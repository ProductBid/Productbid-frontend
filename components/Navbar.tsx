"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useBidModal } from "@/components/BidModal";
import { Plus, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Board", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Daily", href: "/daily" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const { openBidModal } = useBidModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pb-border bg-pb-bg/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-3 sm:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            {/* New "P" Arrow Logo Image */}
            <Image
              src="/logo.png"
              alt="ProductBid Logo"
              width={34}
              height={34}
              priority
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-contain shadow-sm transition-transform group-hover:scale-105"
            />
            <span className="font-sora font-extrabold text-lg sm:text-xl tracking-tight text-pb-text-primary">
              Product<span className="text-pb-primary">Bid</span>
            </span>
          </Link>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors hover:text-pb-text-primary",
                  isActive
                    ? "text-pb-text-primary font-semibold"
                    : "text-pb-text-secondary"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-pb-primary transition-all" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Theme toggle & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <ThemeToggle />
          <Button
            onClick={() => openBidModal()}
            className="bg-[#1F1B3A] text-white hover:bg-[#2F2959] dark:bg-pb-primary dark:text-[#15131F] dark:hover:opacity-90 font-semibold px-2.5 sm:px-4 h-9 sm:h-10 rounded-xl shadow-sm text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Place a bid</span>
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 text-pb-text-secondary shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-pb-border bg-pb-card px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-pb-primary-soft text-pb-primary font-semibold"
                    : "text-pb-text-secondary hover:bg-pb-bg hover:text-pb-text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
