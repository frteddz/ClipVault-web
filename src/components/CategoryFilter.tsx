import React from 'react';
import type { Category } from '../services/clipboardService';
import { CategoryBadge } from './CategoryBadge';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: 8,
    overflowX: 'auto',
    paddingBottom: 4,
    scrollbarWidth: 'thin',
    WebkitOverflowScrolling: 'touch',
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    border: '1px solid var(--color-border)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    transition: 'all var(--transition-fast)',
    flexShrink: 0,
  },
};

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div style={styles.container}>
      <button
        style={{
          ...styles.chip,
          backgroundColor: selected === null ? 'var(--color-primary)' : 'var(--color-surface)',
          color: selected === null ? 'white' : 'var(--color-text-secondary)',
          borderColor: selected === null ? 'var(--color-primary)' : 'var(--color-border)',
        }}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          style={{
            ...styles.chip,
            backgroundColor: selected === cat.id ? `${cat.color}1A` : 'var(--color-surface)',
            color: selected === cat.id ? cat.color : 'var(--color-text-secondary)',
            borderColor: selected === cat.id ? cat.color : 'var(--color-border)',
          }}
          onClick={() => onSelect(cat.id === selected ? null : cat.id)}
        >
          <CategoryBadge name={cat.name} color={cat.color} />
        </button>
      ))}
    </div>
  );
}
