import React from 'react';
import type { ClipItem, Category } from '../services/clipboardService';
import { formatClipPreview, formatTimestamp } from '../utils/clipboardUtils';
import { CategoryBadge } from './CategoryBadge';

interface ClipItemProps {
  item: ClipItem;
  categories: Category[];
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onAssignCategory?: (itemId: string, categoryId: string | null) => void;
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '14px 16px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    animation: 'fadeIn 0.3s ease forwards',
  },
  content: {
    fontSize: 13,
    color: 'var(--color-text)',
    lineHeight: 1.5,
    wordBreak: 'break-word',
    fontFamily: 'var(--font-mono)',
    maxHeight: 60,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  timestamp: {
    fontSize: 11,
    color: 'var(--color-text-tertiary)',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 6px',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-tertiary)',
    fontSize: 14,
    lineHeight: 1,
    transition: 'all var(--transition-fast)',
    fontFamily: 'inherit',
  },
  pinned: {
    color: 'var(--color-primary)',
  },
  categorySelect: {
    fontSize: 11,
    padding: '2px 6px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-secondary)',
    fontFamily: 'inherit',
    cursor: 'pointer',
    outline: 'none',
  },
};

function PinIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

export function ClipItem({ item, categories, onPin, onDelete, onAssignCategory }: ClipItemProps) {
  const category = item.categoryId
    ? categories.find(c => c.id === item.categoryId)
    : undefined;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.content);
    } catch {
      // fallback for Tauri environments
    }
  };

  return (
    <div
      style={styles.card}
      className="animate-fade-in"
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCopy();
        }
      }}
    >
      <div style={styles.content}>
        {formatClipPreview(item.content)}
      </div>

      <div style={styles.meta}>
        <div style={styles.left}>
          <span style={styles.timestamp}>{formatTimestamp(item.timestamp)}</span>
          {category && (
            <CategoryBadge name={category.name} color={category.color} />
          )}
          {onAssignCategory && (
            <select
              style={styles.categorySelect}
              value={item.categoryId ?? ''}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                e.stopPropagation();
                onAssignCategory(item.id, e.target.value || null);
              }}
              aria-label="Assign category"
            >
              <option value="">No category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div style={styles.actions}>
          <button
            style={{ ...styles.actionBtn, ...(item.pinned ? styles.pinned : {}) }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onPin(item.id);
            }}
            aria-label={item.pinned ? 'Unpin' : 'Pin'}
          >
            <PinIcon filled={item.pinned} />
          </button>
          <button
            style={styles.actionBtn}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            aria-label="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
