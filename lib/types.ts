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
