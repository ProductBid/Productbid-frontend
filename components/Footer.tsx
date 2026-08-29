import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-pb-border bg-pb-bg py-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="ProductBid"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span className="font-sora font-extrabold text-base text-pb-text-primary">
              Product<span className="text-pb-primary">Bid</span>
            </span>
            <span className="text-xs text-pb-text-muted">· Public Bidding Leaderboard</span>
          </div>
          <p className="text-xs text-pb-text-secondary">
            Pay to rank. No accounts, no ads, transparent & open.
          </p>
        </div>

        <div className="flex items-center space-x-6 text-xs text-pb-text-secondary">
          <Link href="/" className="hover:text-pb-primary transition-colors">
            Board
          </Link>
          <Link href="/categories" className="hover:text-pb-primary transition-colors">
            Categories
          </Link>
          <Link href="/daily" className="hover:text-pb-primary transition-colors">
            Daily
          </Link>
          <Link href="/about" className="hover:text-pb-primary transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center space-x-2 text-xs text-pb-text-muted bg-pb-card px-3.5 py-1.5 rounded-full border border-pb-border">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Payments processed by <strong>Dodo Payments</strong></span>
        </div>
      </div>
    </footer>
  );
}
