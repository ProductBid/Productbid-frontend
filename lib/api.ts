import {
  Product,
  Category,
  DailyBoard,
  MarketStats,
  BidPayload,
  BackendCategory,
  BackendLeaderboardEntry,
  ResolveProductResponse,
  InitiateBidResponse,
  RankPreviewResponse,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

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

/**
 * Fetch all categories from backend (GET /api/categories)
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 30 } });
    if (res.ok) {
      const data: { categories: BackendCategory[] } = await res.json();
      if (Array.isArray(data.categories) && data.categories.length > 0) {
        return data.categories.map((cat) => {
          const match = INITIAL_CATEGORIES.find((c) => c.slug === cat.slug);
          return {
            id: String(cat.id),
            slug: cat.slug,
            name: cat.name,
            description: match?.description || `${cat.name} ranking leaderboard`,
            iconName: match?.iconName || "Folder",
            productCount: 0,
            topBid: 0,
          };
        });
      }
    }
  } catch (err) {
    console.warn("Categories API offline/fallback:", err);
  }
  return INITIAL_CATEGORIES;
}

/**
 * Fetch leaderboard bids from backend (GET /api/leaderboard/all)
 */
export async function fetchLeaderboard(category?: string): Promise<Product[]> {
  try {
    const url =
      category && category !== "all"
        ? `${API_BASE_URL}/leaderboard/all?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/leaderboard/all`;

    const res = await fetch(url, { next: { revalidate: 5 } });
    if (res.ok) {
      const data: { leaderboard: BackendLeaderboardEntry[] } = await res.json();
      if (Array.isArray(data.leaderboard)) {
        return data.leaderboard.map((entry) => ({
          id: String(entry.bid_id),
          name: entry.name,
          tagline: entry.tagline || "",
          url: entry.handle_or_url,
          handle: entry.handle_or_url,
          iconUrl: entry.logo_url || "",
          category: String(entry.category_id),
          bidAmount: entry.amount,
          rank: entry.rank,
          createdAt: new Date().toISOString(),
          clickCount: 0,
        }));
      }
    }
  } catch (err) {
    console.warn("Leaderboard API offline/fallback:", err);
  }
  return [];
}

/**
 * Fetch top rank product (#1)
 */
export async function fetchTopProduct(): Promise<Product | null> {
  try {
    const leaderboard = await fetchLeaderboard();
    return leaderboard[0] || null;
  } catch (err) {
    console.warn("Top product fallback:", err);
  }
  return null;
}

/**
 * Compute aggregate market statistics from live leaderboard
 */
export async function fetchMarketStats(): Promise<MarketStats> {
  try {
    const products = await fetchLeaderboard();
    const totalVolume = products.reduce((acc, p) => acc + (p.bidAmount || 0), 0);
    return {
      liveCount: products.length,
      totalBids: products.length,
      totalVolume,
      visitorsToday: 0,
    };
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

/**
 * Fetch live daily board
 */
export async function fetchDailyBoard(date?: string): Promise<DailyBoard> {
  const today = new Date();
  const dateFormatted = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const products = await fetchLeaderboard();
  const topBid = products[0]?.bidAmount ?? 0;
  const topProduct = products[0] ?? null;

  return {
    date: date || today.toISOString().split("T")[0],
    formattedDate: dateFormatted,
    isLive: true,
    listingCount: products.length,
    topBid,
    topProduct,
    bids: products,
  };
}

/**
 * Fetch historical days
 */
export async function fetchHistoricalDays(): Promise<DailyBoard[]> {
  return [];
}

/**
 * Live Rank Preview (POST /api/bids/preview)
 */
export async function previewBidRank(
  categorySlugOrId: string | number,
  amount: number
): Promise<number> {
  try {
    const payload: { category_slug?: string; category_id?: number; amount: number } = {
      amount,
    };
    if (typeof categorySlugOrId === "number") {
      payload.category_id = categorySlugOrId;
    } else {
      payload.category_slug = categorySlugOrId;
    }

    const res = await fetch(`${API_BASE_URL}/bids/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data: RankPreviewResponse = await res.json();
      return data.predicted_rank || 1;
    }
  } catch (err) {
    console.warn("Rank preview fallback:", err);
  }
  return 1;
}

/**
 * Resolve or create product (POST /api/products/resolve)
 */
export async function resolveProduct(productData: {
  handleOrURL: string;
  name: string;
  tagline?: string;
  logoURL?: string;
  categoryID: string;
  contactEmail?: string;
}): Promise<ResolveProductResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        handle_or_url: productData.handleOrURL,
        name: productData.name,
        tagline: productData.tagline || "",
        logo_url: productData.logoURL || "",
        category_id: productData.categoryID,
        contact_email: productData.contactEmail || "",
      }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Resolve product error:", err);
  }
  return null;
}

/**
 * Submit Bid and initiate Dodo Payments checkout session (POST /api/bids/initiate)
 */
export async function submitBidCheckout(
  payload: BidPayload
): Promise<{ checkoutUrl?: string; bidId?: number; success: boolean; message: string }> {
  try {
    const returnURL =
      typeof window !== "undefined"
        ? `${window.location.origin}/?payment=success`
        : "https://productbid.space/?payment=success";

    const res = await fetch(`${API_BASE_URL}/bids/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        handle_or_url: payload.urlOrHandle,
        name: payload.name,
        tagline: payload.tagline,
        category_slug: payload.category,
        amount: payload.amount,
        customer_email: payload.email || "",
        return_url: returnURL,
      }),
    });

    if (res.ok) {
      const data: InitiateBidResponse = await res.json();
      return {
        success: true,
        checkoutUrl: data.checkout_url,
        bidId: data.bid_id,
        message: `Bid created! Redirecting to secure Dodo Payments checkout for $${payload.amount}...`,
      };
    } else {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP Error ${res.status}`);
    }
  } catch (err: any) {
    console.error("submitBidCheckout error:", err);
    return {
      success: false,
      message: err.message || "Failed to initiate payment session. Please try again.",
    };
  }
}
