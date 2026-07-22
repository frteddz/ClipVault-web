export interface ClipItem {
  id: string;
  content: string;
  type: 'text' | 'image';
  timestamp: Date;
  categoryId: string | null;
  pinned: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

const ITEMS_KEY = 'clipvault-items';
const CATEGORIES_KEY = 'clipvault-categories';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-code', name: 'Code', color: '#6366f1' },
  { id: 'cat-text', name: 'Text', color: '#22c55e' },
  { id: 'cat-links', name: 'Links', color: '#3b82f6' },
  { id: 'cat-images', name: 'Images', color: '#f59e0b' },
  { id: 'cat-notes', name: 'Notes', color: '#ec4899' },
];

const DEMO_SAMPLES = [
  'https://github.com/example/repo',
  'const greeting = "Hello, World!";',
  'npx create-react-app my-app',
  'git commit -m "fix: resolve issue with timing"',
  'Thanks for the update! I will review the PR shortly.',
  '{"userId": 1, "id": 1, "title": "delectus aut autem"}',
  '# Heading\n\nMarkdown content with **bold** text.',
  '127.0.0.1 localhost',
  'ssh-keygen -t rsa -b 4096 -C "user@example.com"',
  'docker compose up -d --build',
  '<div className="container">\n  <h1>Hello World</h1>\n</div>',
  'npm install @tauri-apps/api @tauri-apps/plugin-shell',
  'The quick brown fox jumps over the lazy dog.',
  'http://localhost:5173',
  'console.log("debugging...", error);',
  'pnpm dlx create-elysia server',
  'interface User {\n  id: string;\n  name: string;\n  email: string;\n}',
  'curl -X POST https://api.example.com/v1/users \\\n  -H "Content-Type: application/json"',
  'fn main() {\n    println!("Hello, Rust!");\n}',
];

let idCounter = 0;

function generateId(): string {
  idCounter += 1;
  return Date.now().toString(36) + idCounter.toString(36);
}

export function createClipItem(
  content: string,
  type: 'text' | 'image' = 'text',
  categoryId: string | null = null,
): ClipItem {
  return {
    id: generateId(),
    content,
    type,
    timestamp: new Date(),
    categoryId,
    pinned: false,
  };
}

function reviveDates(_key: string, value: unknown): unknown {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
    return new Date(value);
  }
  return value;
}

export function loadItems(): ClipItem[] {
  try {
    const data = localStorage.getItem(ITEMS_KEY);
    if (!data) return [];
    return JSON.parse(data, reviveDates);
  } catch {
    return [];
  }
}

export function saveItems(items: ClipItem[]): void {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

export function loadCategories(): Category[] {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    if (!data) return DEFAULT_CATEGORIES;
    return JSON.parse(data);
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export function saveCategories(categories: Category[]): void {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function createCategory(name: string, color: string): Category {
  return { id: generateId(), name, color };
}

export function generateSampleContent(): string {
  return DEMO_SAMPLES[Math.floor(Math.random() * DEMO_SAMPLES.length)];
}

export function getCategoryById(
  categories: Category[],
  categoryId: string | null,
): Category | undefined {
  if (!categoryId) return undefined;
  return categories.find(c => c.id === categoryId);
}
