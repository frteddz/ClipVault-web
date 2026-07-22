import React from 'react';

interface SettingsPageProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 520,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: 16,
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
  },
  toggle: {
    position: 'relative',
    width: 44,
    height: 24,
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'background-color var(--transition-fast)',
  },
  toggleThumb: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'white',
    transition: 'transform var(--transition-fast)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  shortcutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '8px 16px',
    alignItems: 'center',
  },
  shortcutLabel: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
  },
  kbd: {
    padding: '2px 6px',
    borderRadius: 4,
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-secondary)',
    fontSize: 11,
    fontWeight: 500,
    fontFamily: 'var(--font-mono)',
    color: 'var(--color-text)',
  },
  about: {
    fontSize: 12,
    color: 'var(--color-text-tertiary)',
    lineHeight: 1.5,
  },
};

const shortcuts = [
  { key: '⌘K', desc: 'Search clipboard' },
  { key: '⌘P', desc: 'Pin / Unpin item' },
  { key: '⌘⌫', desc: 'Delete item' },
  { key: '⌘⇧C', desc: 'Clear all history' },
  { key: '⌘B', desc: 'Toggle sidebar' },
  { key: '⌘T', desc: 'Toggle theme' },
];

export function SettingsPage({ theme, onToggleTheme }: SettingsPageProps) {
  return (
    <div style={styles.container} className="animate-fade-in">
      <h2 style={styles.title}>Settings</h2>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Appearance</div>
        <div style={styles.row}>
          <span style={styles.label}>Dark mode</span>
          <button
            style={{
              ...styles.toggle,
              backgroundColor: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-border)',
            }}
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
          >
            <div
              style={{
                ...styles.toggleThumb,
                transform: theme === 'dark' ? 'translateX(20px)' : 'translateX(0)',
              }}
            />
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Keyboard Shortcuts</div>
        <div style={styles.shortcutGrid}>
          {shortcuts.map(s => (
            <>
              <span key={`l-${s.key}`} style={styles.shortcutLabel}>{s.desc}</span>
              <span key={`k-${s.key}`} style={styles.kbd}>{s.key}</span>
            </>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>About</div>
        <p style={styles.about}>
          ClipVault v0.1.0<br />
          A clipboard manager built with React and Tauri.<br />
          Your clipboard history is stored locally in your browser.
        </p>
      </div>
    </div>
  );
}
