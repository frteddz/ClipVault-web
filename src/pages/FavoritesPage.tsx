import React from 'react';
import type { ClipItem, Category } from '../services/clipboardService';
import { ClipItem as ClipItemComponent } from '../components/ClipItem';
import { EmptyState } from '../components/EmptyState';

interface FavoritesPageProps {
  pinnedItems: ClipItem[];
  categories: Category[];
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onAssignCategory: (itemId: string, categoryId: string | null) => void;
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
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  count: {
    fontSize: 13,
    color: 'var(--color-text-tertiary)',
    fontWeight: 500,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 10,
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 16,
  },
};

export function FavoritesPage({
  pinnedItems,
  categories,
  onPin,
  onDelete,
  onAssignCategory,
}: FavoritesPageProps) {
  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.header}>
        <h2 style={styles.title}>Favorites</h2>
        <span style={styles.count}>
          {pinnedItems.length} {pinnedItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {pinnedItems.length === 0 ? (
        <EmptyState
          icon="⭐"
          title="No favorites yet"
          description="Pin clips from the History page to access them here quickly."
        />
      ) : (
        <div style={styles.grid}>
          {pinnedItems.map(item => (
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
    </div>
  );
}
