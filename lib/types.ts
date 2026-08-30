export interface Product {
  id: string;
  name: string;
  tagline: string;
  url: string;
  handle?: string;
  iconUrl?: string;
  category: string;
  bidAmount: number;
  rank: number;
  createdAt: string;
  clickCount: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  topProduct?: Product | null;
  productCount: number;
  topBid: number;
}

export interface DailyBoard {
  date: string;
  formattedDate: string;
  isLive: boolean;
  listingCount: number;
  topBid: number;
  topProduct?: Product | null;
  bids: Product[];
}

export interface MarketStats {
  liveCount: number;
  totalBids: number;
  totalVolume: number;
  visitorsToday?: number;
}

export interface BidPayload {
  urlOrHandle: string;
  name: string;
  tagline: string;
  category: string;
  amount: number;
  email?: string;
}

export interface BackendCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BackendLeaderboardEntry {
  rank: number;
  bid_id: number;
  product_id: number;
  name: string;
  tagline: string;
  logo_url: string;
  handle_or_url: string;
  category_id: number;
  amount: number;
}

export interface ResolveProductResponse {
  product: {
    id: number;
    name: string;
    handle_or_url: string;
    tagline: string;
    logo_url: string;
    category_id: number;
    contact_email: string;
  };
  existed: boolean;
}

export interface InitiateBidResponse {
  success: boolean;
  checkout_url: string;
  bid_id: number;
  dodo_session_id?: string;
  product_id?: number;
  amount?: number;
}

export interface RankPreviewResponse {
  predicted_rank: number;
  category_id: number;
  amount: number;
}
