export type Priority = 'high' | 'medium' | 'low';

export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'study' | 'general';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string;
  isPinned?: boolean;
  createdAt: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export type SortOption = 'createdAt' | 'dueDate' | 'priority';

export interface CategoryInfo {
  id: Category;
  label: string;
  color: string;
  bgColor: string;
}

export const CATEGORIES: Record<Category, CategoryInfo> = {
  general: { id: 'general', label: '일반', color: 'text-slate-700 dark:text-slate-300', bgColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  work: { id: 'work', label: '업무', color: 'text-blue-700 dark:text-blue-300', bgColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  personal: { id: 'personal', label: '개인', color: 'text-emerald-700 dark:text-emerald-300', bgColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
  shopping: { id: 'shopping', label: '쇼핑', color: 'text-amber-700 dark:text-amber-300', bgColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
  health: { id: 'health', label: '건강', color: 'text-rose-700 dark:text-rose-300', bgColor: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
  study: { id: 'study', label: '공부', color: 'text-indigo-700 dark:text-indigo-300', bgColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
};

export const PRIORITIES: Record<Priority, { label: string; color: string; badgeBg: string }> = {
  high: { label: '높음', color: 'text-red-600', badgeBg: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400' },
  medium: { label: '보통', color: 'text-amber-600', badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400' },
  low: { label: '낮음', color: 'text-slate-600', badgeBg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' },
};
