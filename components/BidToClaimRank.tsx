"use client";

import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BidToClaimRankProps {
  /** The current highest bid amount to beat (optional, defaults to 0) */
  currentTopBid?: number;
  /** Fixed amount to increment/decrement per click (default: 1) */
  stepAmount?: number;
  /** Minimum allowable bid (defaults to $3 or currentTopBid + 1) */
  minBid?: number;
  /** Controlled bid amount value */
  value?: number;
  /** Callback fired whenever the bid amount changes via +/- buttons or typing */
  onChange?: (amount: number) => void;
  /** Initial starting bid for uncontrolled usage (defaults to $3 or minimum required bid) */
  initialBid?: number;
  /** Target rank number being bid on (default: 1) */
  targetRank?: number;
  /** Custom CSS classes for container wrapper */
  className?: string;
  /** Whether the widget is disabled */
  disabled?: boolean;
}

export function BidToClaimRank({
  currentTopBid = 0,
  stepAmount = 1,
  minBid,
  value,
  onChange,
  initialBid,
  targetRank = 1,
  className,
  disabled = false,
}: BidToClaimRankProps) {
  // Determine minimum required bid (defaults to $3 base, or currentTopBid + 1)
  const minRequired =
    minBid !== undefined
      ? minBid
      : Math.max(3, currentTopBid > 0 ? currentTopBid + 1 : 3);

  // Local state for uncontrolled usage
  const [internalBid, setInternalBid] = useState<number>(() => {
    if (initialBid !== undefined) return Math.max(initialBid, minRequired);
    return Math.max(3, minRequired);
  });

  const isControlled = value !== undefined;
  const currentBid = isControlled ? value : internalBid;

  // Local string representation for smooth typing (allowing backspacing and direct editing)
  const [typedValue, setTypedValue] = useState<string>(() => String(currentBid));
  const [isFocused, setIsFocused] = useState(false);

  // Synchronize typedValue when currentBid changes externally or via +/- buttons (when not actively typing)
  useEffect(() => {
    if (!isFocused) {
      setTypedValue(String(currentBid));
    }
  }, [currentBid, isFocused]);

  // Keep bid valid if currentTopBid or minRequired increases
  useEffect(() => {
    if (currentBid < minRequired) {
      if (isControlled && onChange) {
        onChange(minRequired);
      } else {
        setInternalBid(minRequired);
      }
      setTypedValue(String(minRequired));
    }
  }, [minRequired, currentBid, isControlled, onChange]);

  const updateBid = (nextAmount: number) => {
    const clamped = Math.max(minRequired, nextAmount);
    if (isControlled && onChange) {
      onChange(clamped);
    } else {
      setInternalBid(clamped);
    }
    setTypedValue(String(clamped));
  };

  const handleDecrement = () => {
    if (disabled) return;
    const currentNum = Number(typedValue) || currentBid;
    updateBid(currentNum - stepAmount);
  };

  const handleIncrement = () => {
    if (disabled) return;
    const currentNum = Number(typedValue) || currentBid;
    updateBid(currentNum + stepAmount);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // Auto-select the entire current value so typing immediately replaces it
    e.currentTarget.select();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    // Allow only numeric digits, directly setting the typed value (replacing, not concatenating)
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setTypedValue(digitsOnly);

    if (digitsOnly !== "") {
      const num = Number(digitsOnly);
      if (num >= minRequired) {
        if (isControlled && onChange) {
          onChange(num);
        } else {
          setInternalBid(num);
        }
      }
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (disabled) return;
    const num = Number(typedValue);
    if (isNaN(num) || num < minRequired || typedValue === "") {
      // Revert/clamp to minRequired if below minimum or empty
      updateBid(minRequired);
    } else {
      updateBid(num);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const canDecrement = !disabled && (Number(typedValue) || currentBid) > minRequired;

  return (
    <div
      className={cn(
        "inline-flex items-center flex-wrap gap-3 py-2 px-3 sm:px-4 rounded-2xl border border-pb-border bg-pb-card shadow-subtle transition-all duration-200",
        className
      )}
    >
      {/* Label: Claim #1 for */}
      <span className="font-sora font-extrabold text-sm sm:text-base text-pb-text-primary whitespace-nowrap tracking-tight select-none">
        Claim #{targetRank} for
      </span>

      {/* Stepper Module: [-] [$X input] [+] */}
      <div className="inline-flex items-center gap-2 bg-pb-bg/80 dark:bg-[#15131F] px-2 py-1 rounded-xl border border-pb-border/70">
        {/* Minus Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={!canDecrement}
          aria-label="Decrease bid amount"
          className={cn(
            "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shrink-0",
            // Brand purple/blue circular button
            "bg-pb-primary-soft text-pb-primary hover:bg-pb-primary/20 active:scale-95",
            "dark:bg-pb-primary-soft/40 dark:text-pb-primary dark:hover:bg-pb-primary-soft/60",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          )}
        >
          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        {/* Editable Dollar Input Field */}
        <div
          title="Click to type custom bid amount"
          className="group relative flex items-center bg-pb-card dark:bg-[#1A1826] border border-pb-border/90 hover:border-pb-primary/60 focus-within:border-pb-primary focus-within:ring-2 focus-within:ring-pb-primary/20 rounded-lg px-2 py-0.5 transition-all shadow-2xs cursor-text"
        >
          <span className="font-sora font-extrabold text-base sm:text-lg text-pb-primary select-none mr-0.5">
            $
          </span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={typedValue}
            onFocus={handleFocus}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-label="Bid amount in dollars"
            className="font-sora font-extrabold text-base sm:text-lg text-pb-primary bg-transparent outline-none tabular-nums text-left min-w-[1.8rem] max-w-[6rem] p-0 cursor-text"
            style={{
              width: `${Math.max(1.8, (typedValue.length || 1) * 1.1)}ch`,
            }}
          />
        </div>

        {/* Plus Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled}
          aria-label="Increase bid amount"
          className={cn(
            "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shrink-0",
            // Brand purple/blue circular button
            "bg-pb-primary-soft text-pb-primary hover:bg-pb-primary/20 active:scale-95",
            "dark:bg-pb-primary-soft/40 dark:text-pb-primary dark:hover:bg-pb-primary-soft/60",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          )}
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
