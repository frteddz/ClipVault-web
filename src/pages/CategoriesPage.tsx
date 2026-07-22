import React, { useState } from 'react';
import type { Category } from '../services/clipboardService';
import { EmptyState } from '../components/EmptyState';

interface CategoriesPageProps {
  categories: Category[];
  onAddCategory: (name: string, color: string) => Category;
  onRemoveCategory: (id: string) => void;
  getClipCount: (categoryId: string) => number;
}

const PRESET_COLORS = [
  '#6366f1',
  '#22c55e',
  '#3b82f6',
  '#f59e0b',
  '#ec4899',
  '#ef4444',
  '#14b8a6',
  '#a855f7',
];

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  form: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: 160,
    padding: '8px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
    fontSize: 13,
    outline: 'none',
    fontFamily: 'inherit',
  },
  addBtn: {
    padding: '8px 16px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'opacity var(--transition-fast)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 16,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    animation: 'fadeIn 0.3s ease forwards',
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--color-text)',
  },
  itemCount: {
    fontSize: 12,
    color: 'var(--color-text-tertiary)',
    marginLeft: 8,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-tertiary)',
    cursor: 'pointer',
    padding: '4px 6px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 16,
    lineHeight: 1,
    fontFamily: 'inherit',
    transition: 'color var(--transition-fast)',
  },
  colorPicker: {
    display: 'flex',
    gap: 6,
  },
  colorOption: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  },
};

export function CategoriesPage({
  categories,
  onAddCategory,
  onRemoveCategory,
  getClipCount,
}: CategoriesPageProps) {
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(PRESET_COLORS[0]);

  const handleAdd = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    onAddCategory(trimmed, newColor);
    setNewName('');
    setNewColor(PRESET_COLORS[0]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.header}>
        <h2 style={styles.title}>Categories</h2>
      </div>

      <div style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Category name..."
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="New category name"
        />
        <div style={styles.colorPicker}>
          {PRESET_COLORS.map(color => (
            <button
              key={color}
              style={{
                ...styles.colorOption,
                backgroundColor: color,
                borderColor: newColor === color ? 'var(--color-text)' : 'transparent',
              }}
              onClick={() => setNewColor(color)}
              aria-label={`Color ${color}`}
            />
          ))}
        </div>
        <button
          style={styles.addBtn}
          onClick={handleAdd}
          disabled={!newName.trim()}
        >
          Add
        </button>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          icon="🏷️"
          title="No categories"
          description="Create categories to organize your clipboard items."
        />
      ) : (
        <div style={styles.list}>
          {categories.map(cat => (
            <div key={cat.id} style={styles.item}>
              <div style={styles.itemLeft}>
                <div style={{ ...styles.colorDot, backgroundColor: cat.color }} />
                <span style={styles.itemName}>{cat.name}</span>
                <span style={styles.itemCount}>
                  {getClipCount(cat.id)} {getClipCount(cat.id) === 1 ? 'clip' : 'clips'}
                </span>
              </div>
              <button
                style={styles.removeBtn}
                onClick={() => onRemoveCategory(cat.id)}
                aria-label={`Remove ${cat.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
