export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function formatClipPreview(content: string, maxLength = 120): string {
  const cleaned = content.replace(/\s+/g, ' ').trim();
  return truncateText(cleaned, maxLength);
}

export function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 5) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function detectContentType(content: string): 'text' | 'image' {
  if (content.startsWith('data:image/') || /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(content)) {
    return 'image';
  }
  return 'text';
}
