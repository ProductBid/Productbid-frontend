"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, DollarSign, Sparkles, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { submitBidCheckout, INITIAL_CATEGORIES } from "@/lib/api";

interface BidModalContextType {
  isOpen: boolean;
  openBidModal: (initialData?: { urlOrHandle?: string; category?: string; initialAmount?: number }) => void;
  closeBidModal: () => void;
}

const BidModalContext = createContext<BidModalContextType | undefined>(undefined);

export function useBidModal() {
  const context = useContext(BidModalContext);
  if (!context) {
    throw new Error("useBidModal must be used within a BidModalProvider");
  }
  return context;
}

export function BidModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [urlOrHandle, setUrlOrHandle] = useState("");
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState("developer-tools");
  const [amount, setAmount] = useState<number | "">(3);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const openBidModal = (initialData?: { urlOrHandle?: string; category?: string; initialAmount?: number }) => {
    if (initialData?.urlOrHandle) setUrlOrHandle(initialData.urlOrHandle);
    if (initialData?.category) setCategory(initialData.category);
    if (initialData?.initialAmount !== undefined) {
      setAmount(Math.max(3, initialData.initialAmount));
    } else {
      setAmount((prev) => (prev === "" || Number(prev) < 3 ? 3 : prev));
    }
    setSuccessMessage(null);
    setIsOpen(true);
  };

  const closeBidModal = () => {
    setIsOpen(false);
    setSuccessMessage(null);
    setIsLoading(false);
  };

  // Form Validation logic
  const isUrlValid = urlOrHandle.trim().length > 0;
  const isNameValid = name.trim().length > 0;
  const isCategoryValid = category.trim().length > 0;
  const isTaglineValid = tagline.trim().length > 0;
  const isAmountValid = typeof amount === "number" && !isNaN(amount) && amount >= 3;

  const isFormValid = isUrlValid && isNameValid && isCategoryValid && isTaglineValid && isAmountValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await submitBidCheckout({
        name: name.trim(),
        tagline: tagline.trim(),
        urlOrHandle: urlOrHandle.trim(),
        category,
        amount: Number(amount),
      });

      if (res.success) {
        setSuccessMessage(res.message);
      }
    } catch (err) {
      console.error("Bid error:", err);
      alert("Something went wrong initiating the bid. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BidModalContext.Provider value={{ isOpen, openBidModal, closeBidModal }}>
      {children}
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeBidModal()}>
        <DialogContent className="max-w-md">
          {successMessage ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <DialogTitle className="text-2xl font-bold">Ready to Checkout!</DialogTitle>
              <p className="text-sm text-pb-text-secondary leading-relaxed px-4">
                {successMessage}
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <Button
                  onClick={closeBidModal}
                  className="w-full bg-pb-primary hover:bg-opacity-90 font-semibold"
                >
                  Done
                </Button>
                <p className="text-[11px] text-pb-text-muted">
                  Payments securely processed by Dodo Payments hosted checkout.
                </p>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-2 text-pb-primary text-xs font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Public Bidding</span>
                </div>
                <DialogTitle className="text-2xl font-bold">Place a Product Bid</DialogTitle>
                <DialogDescription>
                  Rank climbs instantly. No login required — just enter your product details and name your price.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-pb-text-secondary uppercase tracking-wider mb-1.5">
                    Product URL or @Handle
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-pb-text-muted" />
                    <Input
                      required
                      placeholder="https://yourproduct.com or @handle"
                      value={urlOrHandle}
                      onChange={(e) => setUrlOrHandle(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-pb-text-secondary uppercase tracking-wider mb-1.5">
                      Product Name
                    </label>
                    <Input
                      required
                      placeholder="ProductBid"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-pb-text-secondary uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {INITIAL_CATEGORIES.map((cat) => (
                          <SelectItem key={cat.slug} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pb-text-secondary uppercase tracking-wider mb-1.5">
                    Tagline / Pitch (1 line)
                  </label>
                  <Input
                    required
                    placeholder="No-login, no-ads public bidding leaderboard"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pb-text-secondary uppercase tracking-wider mb-1.5">
                    Bid Amount ($ USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-pb-text-muted" />
                    <Input
                      required
                      type="number"
                      min="3"
                      step="1"
                      placeholder="3"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  {amount !== "" && Number(amount) < 3 && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">
                      Minimum bid amount is $3.
                    </p>
                  )}
                </div>

                <div className="rounded-xl bg-pb-primary-soft/50 dark:bg-pb-primary-soft/20 p-3 border border-pb-primary/10">
                  <p className="text-xs text-pb-text-secondary leading-relaxed">
                    💡 <strong className="text-pb-text-primary">Rule:</strong> Rank #1 starts at $3. Bidding $3 or more instantly claims the #1 spot. Rank holds until someone bids higher.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    title={!isFormValid ? "Please fill all fields (bid must be at least $3) to place a bid" : undefined}
                    className="w-full bg-pb-primary text-white dark:text-[#15131F] font-semibold h-12 rounded-xl text-base shadow-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Connecting to Dodo Checkout...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay & Bid</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-center text-[11px] text-pb-text-muted">
                  Secured & processed by Dodo Payments hosted checkout.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </BidModalContext.Provider>
  );
}
