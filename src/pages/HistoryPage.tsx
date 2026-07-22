import React from 'react';
import type { ClipItem, Category } from '../services/clipboardService';
import { ClipItem as ClipItemComponent } from '../components/ClipItem';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { EmptyState } from '../components/EmptyState';

interface HistoryPageProps {
  items: ClipItem[];
  filteredItems: ClipItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryFilter: string | null;
  onCategoryFilterChange: (id: string | null) => void;
  categories: Category[];
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onAssignCategory: (itemId: string, categoryId: string | null) => void;
  onClearAll: () => void;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  clearBtn: {
    padding: '8px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-error)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all var(--transition-fast)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 16,
  },
  hintBar: {
    display: 'flex',
    gap: 16,
    padding: '8px 12px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    fontSize: 12,
    color: 'var(--color-text-tertiary)',
  },
  hint: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  kbd: {
    padding: '1px 4px',
    borderRadius: 3,
    border: '1px solid var(--color-border)',
    fontSize: 10,
    lineHeight: '16px',
    fontFamily: 'var(--font-mono)',
  },
};

export function HistoryPage({
  items,
  filteredItems,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  onPin,
  onDelete,
  onAssignCategory,
  onClearAll,
}: HistoryPageProps) {
  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>History</h2>
        {items.length > 0 && (
          <button
            style={styles.clearBtn}
            onClick={onClearAll}
          >
            Clear All
          </button>
        )}
      </div>

      <SearchBar value={searchQuery} onChange={onSearchChange} />

      <CategoryFilter
        categories={categories}
        selected={categoryFilter}
        onSelect={onCategoryFilterChange}
      />

      {filteredItems.length === 0 ? (
        <EmptyState
          icon={searchQuery || categoryFilter ? '🔍' : '📋'}
          title={searchQuery || categoryFilter ? 'No matches found' : 'No clipboard history'}
          description={
            searchQuery || categoryFilter
              ? 'Try a different search or filter.'
              : 'Copy something to start building your history. Clips appear here automatically.'
          }
        />
      ) : (
        <div style={styles.list}>
          {filteredItems.map(item => (
            <ClipItemComponent
              key={item.id}
              item={item}
              categories={categories}
              onPin={onPin}
              onDelete={onDelete}
              onAssignCategory={onAssignCategory}
            />
          ))}
        </div>
      )}

      <div style={styles.hintBar}>
        <span style={styles.hint}>
          <span style={styles.kbd}>⌘K</span> Search
        </span>
        <span style={styles.hint}>
          <span style={styles.kbd}>⌘C</span> Copy
        </span>
        <span style={styles.hint}>
          <span style={styles.kbd}>⌘P</span> Pin
        </span>
        <span style={styles.hint}>
          <span style={styles.kbd}>⌘⌫</span> Delete
        </span>
      </div>
    </div>
  );
}
