import React from 'react';

interface CategoryBadgeProps {
  name: string;
  color: string;
  onRemove?: () => void;
  onClick?: () => void;
}

const badgeBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '2px 8px',
  borderRadius: 'var(--radius-sm)',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '20px',
  whiteSpace: 'nowrap',
  cursor: 'default',
  border: 'none',
  fontFamily: 'inherit',
  transition: 'opacity var(--transition-fast)',
};

export function CategoryBadge({ name, color, onRemove, onClick }: CategoryBadgeProps) {
  const style: React.CSSProperties = {
    ...badgeBase,
    backgroundColor: `${color}1A`,
    color,
    cursor: onClick ? 'pointer' : 'default',
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <span
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {name}
      {onRemove && (
        <button
          onClick={handleRemove}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: 0,
            fontSize: 14,
            lineHeight: 1,
            opacity: 0.7,
            fontFamily: 'inherit',
          }}
          aria-label={`Remove ${name}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
