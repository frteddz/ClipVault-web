import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ClipItem,
  loadItems,
  saveItems,
  createClipItem,
  generateSampleContent,
  loadCategories,
  saveCategories,
  Category,
  createCategory,
} from '../services/clipboardService';

export function useClipboardHistory() {
  const [items, setItems] = useState<ClipItem[]>(() => loadItems());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>(() => loadCategories());

  useEffect(() => {
    saveItems(items);
  }, [items]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    const interval = setInterval(() => {
      const content = generateSampleContent();
      setItems(prev => {
        if (prev.length > 0 && prev[0].content === content) return prev;
        const newItem = createClipItem(content, 'text');
        return [newItem, ...prev].slice(0, 100);
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const addItem = useCallback(
    (content: string, type: 'text' | 'image' = 'text', categoryId: string | null = null) => {
      const newItem = createClipItem(content, type, categoryId);
      setItems(prev => [newItem, ...prev].slice(0, 100));
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const togglePin = useCallback((id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, pinned: !item.pinned } : item)),
    );
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const assignCategory = useCallback((itemId: string, categoryId: string | null) => {
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, categoryId } : item)),
    );
  }, []);

  const addCategory = useCallback((name: string, color: string) => {
    const cat = createCategory(name, color);
    setCategories(prev => [...prev, cat]);
    return cat;
  }, []);

  const removeCategory = useCallback((categoryId: string) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
    setItems(prev =>
      prev.map(item =>
        item.categoryId === categoryId ? { ...item, categoryId: null } : item,
      ),
    );
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => item.content.toLowerCase().includes(q));
    }
    if (categoryFilter) {
      result = result.filter(item => item.categoryId === categoryFilter);
    }
    return result;
  }, [items, searchQuery, categoryFilter]);

  const pinnedItems = useMemo(() => items.filter(item => item.pinned), [items]);

  const getClipCountForCategory = useCallback(
    (categoryId: string) => items.filter(item => item.categoryId === categoryId).length,
    [items],
  );

  return {
    items,
    filteredItems,
    pinnedItems,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    addItem,
    removeItem,
    togglePin,
    clearAll,
    assignCategory,
    addCategory,
    removeCategory,
    getClipCountForCategory,
  };
}
