import { Product, Category, DailyBoard, MarketStats, BidPayload } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

/**
 * ProductBid API Client Stubs
 * All endpoints point to the external Go + Fiber + PostgreSQL backend.
 * Stubs return zero/empty state by default so the UI renders in real empty state.
 */

export async function fetchMarketStats(): Promise<MarketStats> {
  // TODO: connect to Go backend (GET /api/stats)
  try {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const res = await fetch(`${API_BASE_URL}/stats`, { next: { revalidate: 10 } });
      if (res.ok) return await res.json();
    }
  } catch (err) {
    console.warn("Market stats fallback:", err);
  }
  return {
    liveCount: 0,
    totalBids: 0,
    totalVolume: 0,
    visitorsToday: 0,
  };
}

export async function fetchLeaderboard(category?: string): Promise<Product[]> {
  // TODO: connect to Go backend (GET /api/leaderboard?category=...)
  try {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const url = category && category !== "all" 
        ? `${API_BASE_URL}/leaderboard?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/leaderboard`;
      const res = await fetch(url, { next: { revalidate: 5 } });
      if (res.ok) return await res.json();
    }
  } catch (err) {
    console.warn("Leaderboard fallback:", err);
  }
  return [];
}

export async function fetchTopProduct(): Promise<Product | null> {
  // TODO: connect to Go backend (GET /api/leaderboard/top)
  try {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const res = await fetch(`${API_BASE_URL}/leaderboard/top`, { next: { revalidate: 5 } });
      if (res.ok) return await res.json();
    }
  } catch (err) {
    console.warn("Top product fallback:", err);
  }
  return null;
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: "ai-agents-infrastructure", slug: "ai-agents-infrastructure", name: "AI Agents & Infrastructure", description: "Autonomous agents, LLM tools, workflows, and compute platforms", iconName: "Bot", productCount: 0, topBid: 0 },
  { id: "seo-ai-visibility", slug: "seo-ai-visibility", name: "SEO & AI Visibility", description: "Search engine ranking, GEO, and AI search visibility tools", iconName: "Search", productCount: 0, topBid: 0 },
  { id: "marketing-advertising", slug: "marketing-advertising", name: "Marketing & Advertising", description: "Growth engines, ad tech, attribution, and acquisition tools", iconName: "Megaphone", productCount: 0, topBid: 0 },
  { id: "crypto-web3-investing", slug: "crypto-web3-investing", name: "Crypto, Web3 & Investing", description: "Decentralized finance, tokens, wallets, and asset analytics", iconName: "Coins", productCount: 0, topBid: 0 },
  { id: "developer-tools", slug: "developer-tools", name: "Developer Tools", description: "APIs, SDKs, CLIs, debugging, and software infrastructure", iconName: "Code2", productCount: 0, topBid: 0 },
  { id: "business-finance-legal", slug: "business-finance-legal", name: "Business, Finance & Legal", description: "Invoicing, contracts, accounting, and business operations", iconName: "Briefcase", productCount: 0, topBid: 0 },
  { id: "security-privacy-compliance", slug: "security-privacy-compliance", name: "Security, Privacy & Compliance", description: "Identity, auth, encryption, SOC2, and data protection", iconName: "ShieldCheck", productCount: 0, topBid: 0 },
  { id: "health-fitness-wellness", slug: "health-fitness-wellness", name: "Health, Fitness & Wellness", description: "Bio-tracking, workout apps, nutrition, and wellness tech", iconName: "HeartPulse", productCount: 0, topBid: 0 },
  { id: "social-media-creator-tools", slug: "social-media-creator-tools", name: "Social Media & Creator Tools", description: "Audience distribution, scheduling, and monetizing creators", iconName: "Share2", productCount: 0, topBid: 0 },
  { id: "leaderboards-attention-markets", slug: "leaderboards-attention-markets", name: "Leaderboards & Attention Markets", description: "Competitive rankings, bounties, and attention auctions", iconName: "Trophy", productCount: 0, topBid: 0 },
  { id: "hiring-jobs-careers", slug: "hiring-jobs-careers", name: "Hiring, Jobs & Careers", description: "Recruitment, resume tools, talent matching, and job boards", iconName: "Users", productCount: 0, topBid: 0 },
  { id: "education-learning", slug: "education-learning", name: "Education & Learning", description: "Interactive courses, study copilots, and skill builders", iconName: "GraduationCap", productCount: 0, topBid: 0 },
  { id: "agencies-studios-services", slug: "agencies-studios-services", name: "Agencies, Studios & Services", description: "Design studios, development agencies, and specialized services", iconName: "Building2", productCount: 0, topBid: 0 },
  { id: "ecommerce-retail", slug: "ecommerce-retail", name: "Ecommerce & Retail", description: "Storefronts, fulfillment, conversion rate, and inventory", iconName: "ShoppingBag", productCount: 0, topBid: 0 },
  { id: "domains-web-assets", slug: "domains-web-assets", name: "Domains & Web Assets", description: "Domain marketplaces, digital real estate, and web properties", iconName: "Globe2", productCount: 0, topBid: 0 },
  { id: "games-entertainment", slug: "games-entertainment", name: "Games & Entertainment", description: "Indie games, gaming utilities, and entertainment software", iconName: "Gamepad2", productCount: 0, topBid: 0 },
  { id: "people-profiles", slug: "people-profiles", name: "People & Profiles", description: "Bio link hubs, portfolios, and personal identity pages", iconName: "UserCheck", productCount: 0, topBid: 0 },
  { id: "productivity-personal-tools", slug: "productivity-personal-tools", name: "Productivity & Personal Tools", description: "Task managers, notes, calendars, and focus utilities", iconName: "Zap", productCount: 0, topBid: 0 },
  { id: "design-creative", slug: "design-creative", name: "Design & Creative", description: "UI kits, illustration libraries, typography, and creative apps", iconName: "Palette", productCount: 0, topBid: 0 },
  { id: "writing-content", slug: "writing-content", name: "Writing & Content", description: "Copywriting copilots, editors, blogs, and publishing tools", iconName: "PenTool", productCount: 0, topBid: 0 },
  { id: "directories-launch-discovery", slug: "directories-launch-discovery", name: "Directories, Launch & Discovery", description: "Product directories, launch platforms, and curation hubs", iconName: "Compass", productCount: 0, topBid: 0 },
  { id: "ai-media-generation", slug: "ai-media-generation", name: "AI Media Generation", description: "Image, video, 3D, and avatar synthesis platforms", iconName: "Sparkles", productCount: 0, topBid: 0 },
  { id: "audio-voice-podcasting", slug: "audio-voice-podcasting", name: "Audio, Voice & Podcasting", description: "Text-to-speech, audio mastering, voice cloning, and podcasts", iconName: "Mic", productCount: 0, topBid: 0 },
  { id: "sales-lead-generation", slug: "sales-lead-generation", name: "Sales & Lead Generation", description: "CRM, cold outreach, prospecting, and pipeline acceleration", iconName: "Target", productCount: 0, topBid: 0 },
  { id: "travel-local-lifestyle", slug: "travel-local-lifestyle", name: "Travel, Local & Lifestyle", description: "Itineraries, booking, city guides, and lifestyle companions", iconName: "Plane", productCount: 0, topBid: 0 },
  { id: "real-estate-property", slug: "real-estate-property", name: "Real Estate & Property", description: "Property listings, rental automation, and mortgage tech", iconName: "Home", productCount: 0, topBid: 0 },
  { id: "media-news", slug: "media-news", name: "Media & News", description: "Newsletters, journalism, aggregators, and media platforms", iconName: "Newspaper", productCount: 0, topBid: 0 },
  { id: "other", slug: "other", name: "Other", description: "Experimental products and unique digital projects", iconName: "Folder", productCount: 0, topBid: 0 },
];

export async function fetchCategories(): Promise<Category[]> {
  // TODO: connect to Go backend (GET /api/categories)
  try {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const res = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 30 } });
      if (res.ok) return await res.json();
    }
  } catch (err) {
    console.warn("Categories fallback:", err);
  }
  return INITIAL_CATEGORIES;
}

export async function fetchDailyBoard(date?: string): Promise<DailyBoard> {
  // TODO: connect to Go backend (GET /api/daily?date=...)
  const today = new Date();
  const dateFormatted = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  try {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const url = date ? `${API_BASE_URL}/daily?date=${date}` : `${API_BASE_URL}/daily/today`;
      const res = await fetch(url, { next: { revalidate: 10 } });
      if (res.ok) return await res.json();
    }
  } catch (err) {
    console.warn("Daily board fallback:", err);
  }

  return {
    date: today.toISOString().split("T")[0],
    formattedDate: dateFormatted,
    isLive: true,
    listingCount: 0,
    topBid: 0,
    topProduct: null,
    bids: [],
  };
}

export async function fetchHistoricalDays(): Promise<DailyBoard[]> {
  // TODO: connect to Go backend (GET /api/daily/history)
  try {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const res = await fetch(`${API_BASE_URL}/daily/history`);
      if (res.ok) return await res.json();
    }
  } catch (err) {
    console.warn("Historical days fallback:", err);
  }
  return [];
}

export async function submitBidCheckout(payload: BidPayload): Promise<{ checkoutUrl?: string; success: boolean; message: string }> {
  // TODO: connect to Go backend -> Dodo Payments hosted checkout session (POST /api/bids/checkout)
  console.log("Submitting bid payload for Dodo Payments checkout:", payload);
  
  // Stubbed placeholder
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Bid checkout initiated for ${payload.name} at $${payload.amount}. Redirecting to Dodo Payments...`,
      });
    }, 600);
  });
}
