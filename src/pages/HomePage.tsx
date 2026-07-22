import React from 'react';

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    padding: '48px 24px',
    textAlign: 'center',
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
    lineHeight: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: 4,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: 16,
    color: 'var(--color-text-secondary)',
    marginBottom: 48,
    fontWeight: 400,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
    maxWidth: 880,
    width: '100%',
  },
  card: {
    padding: '24px 20px',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    textAlign: 'center',
    transition: 'all var(--transition-normal)',
    animation: 'fadeIn 0.3s ease forwards',
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 12,
    lineHeight: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: 'var(--color-text-tertiary)',
    lineHeight: 1.4,
  },
  hint: {
    marginTop: 48,
    fontSize: 13,
    color: 'var(--color-text-tertiary)',
  },
};

const features = [
  { icon: '📋', title: 'History', desc: 'Full clipboard history with search and category filtering.' },
  { icon: '🔍', title: 'Search', desc: 'Quickly find any copied item with instant search.' },
  { icon: '⭐', title: 'Favorites', desc: 'Pin important clips for quick access anytime.' },
  { icon: '🏷️', title: 'Categories', desc: 'Organize clips into custom color-coded categories.' },
  { icon: '⌨️', title: 'Shortcuts', desc: 'Keyboard-first design for power users.' },
];

export function HomePage() {
  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.icon}>🗄️</div>
      <h1 style={styles.title}>ClipVault</h1>
      <p style={styles.subtitle}>Clipboard Manager</p>

      <div style={styles.grid}>
        {features.map(f => (
          <div key={f.title} style={styles.card}>
            <div style={styles.cardIcon}>{f.icon}</div>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      <p style={styles.hint}>Select a page from the sidebar to get started</p>
    </div>
  );
}
