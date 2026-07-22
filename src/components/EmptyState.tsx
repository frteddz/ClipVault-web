import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '64px 24px',
    textAlign: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.6,
    lineHeight: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'var(--color-text-secondary)',
    maxWidth: 320,
    lineHeight: 1.5,
    marginBottom: 16,
  },
  action: {
    marginTop: 4,
  },
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      {action && <div style={styles.action}>{action}</div>}
    </div>
  );
}
