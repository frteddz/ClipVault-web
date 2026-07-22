import React, { lazy, Suspense, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useClipboardHistory } from './hooks/useClipboardHistory';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const HistoryPage = lazy(() => import('./pages/HistoryPage').then(m => ({ default: m.HistoryPage })));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage').then(m => ({ default: m.FavoritesPage })));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })));

type Page = 'home' | 'history' | 'favorites' | 'categories' | 'settings';

const sidebarStyles: Record<string, React.CSSProperties> = {
  app: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  sidebar: {
    width: 220,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    padding: '16px 12px',
    gap: 4,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  logoIcon: {
    fontSize: 22,
    lineHeight: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 10px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--color-text-secondary)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'all var(--transition-fast)',
    fontFamily: 'inherit',
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    lineHeight: 1,
  },
  spacer: {
    flex: 1,
  },
  themeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 10px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--color-text-tertiary)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'all var(--transition-fast)',
    fontFamily: 'inherit',
    marginTop: 8,
  },
  main: {
    flex: 1,
    padding: '24px 28px',
    overflowY: 'auto',
    backgroundColor: 'var(--color-background)',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: 'var(--color-text-tertiary)',
    fontSize: 14,
  },
};

function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function LoadingFallback() {
  return <div style={sidebarStyles.loading}>Loading...</div>;
}

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'history', label: 'History', icon: <HistoryIcon /> },
  { id: 'favorites', label: 'Favorites', icon: <StarIcon /> },
  { id: 'categories', label: 'Categories', icon: <TagIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { theme, toggleTheme } = useTheme();
  const clipboard = useClipboardHistory();

  const activeStyle: React.CSSProperties = {
    ...sidebarStyles.navItem,
    backgroundColor: 'var(--color-primary-light)',
    color: 'var(--color-primary)',
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'history':
        return (
          <HistoryPage
            items={clipboard.items}
            filteredItems={clipboard.filteredItems}
            searchQuery={clipboard.searchQuery}
            onSearchChange={clipboard.setSearchQuery}
            categoryFilter={clipboard.categoryFilter}
            onCategoryFilterChange={clipboard.setCategoryFilter}
            categories={clipboard.categories}
            onPin={clipboard.togglePin}
            onDelete={clipboard.removeItem}
            onAssignCategory={clipboard.assignCategory}
            onClearAll={clipboard.clearAll}
          />
        );
      case 'favorites':
        return (
          <FavoritesPage
            pinnedItems={clipboard.pinnedItems}
            categories={clipboard.categories}
            onPin={clipboard.togglePin}
            onDelete={clipboard.removeItem}
            onAssignCategory={clipboard.assignCategory}
          />
        );
      case 'categories':
        return (
          <CategoriesPage
            categories={clipboard.categories}
            onAddCategory={clipboard.addCategory}
            onRemoveCategory={clipboard.removeCategory}
            getClipCount={clipboard.getClipCountForCategory}
          />
        );
      case 'settings':
        return (
          <SettingsPage theme={theme} onToggleTheme={toggleTheme} />
        );
    }
  };

  return (
    <div style={sidebarStyles.app}>
      <aside style={sidebarStyles.sidebar}>
        <div style={sidebarStyles.logo}>
          <span style={sidebarStyles.logoIcon}>🗄️</span>
          ClipVault
        </div>

        <nav>
          {navItems.map(item => (
            <button
              key={item.id}
              style={currentPage === item.id ? activeStyle : sidebarStyles.navItem}
              onClick={() => setCurrentPage(item.id)}
            >
              <span style={sidebarStyles.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={sidebarStyles.spacer} />

        <button style={sidebarStyles.themeBtn} onClick={toggleTheme}>
          <span style={sidebarStyles.navIcon}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </span>
          {theme === 'dark' ? 'Light' : 'Dark'} mode
        </button>
      </aside>

      <main style={sidebarStyles.main}>
        <Suspense fallback={<LoadingFallback />}>
          {renderPage()}
        </Suspense>
      </main>
    </div>
  );
}
