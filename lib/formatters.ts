export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === 0) {
    return "$0";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number): string {
  if (isNaN(value) || value === 0) {
    return "0";
  }
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatRank(rank: number): string {
  if (!rank || rank <= 0) return "01";
  return rank.toString().padStart(2, "0");
}

export function formatRelativeTime(dateString: string): string {
  if (!dateString) return "just now";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "recently";
  }
}
