"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import { defaultSWRConfig } from "@/lib/swr-config";
import { BidModalProvider } from "@/components/BidModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SWRConfig value={defaultSWRConfig}>
        <BidModalProvider>
          {children}
        </BidModalProvider>
      </SWRConfig>
    </ThemeProvider>
  );
}
