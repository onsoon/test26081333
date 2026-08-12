import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Inbox } from 'lucide-react';
import { Todo, FilterStatus, SortOption, Category, Priority } from './types';
import { INITIAL_TODOS } from './data/initialTodos';
import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { TodoItem } from './components/TodoItem';

const LOCAL_STORAGE_KEY = 'aistudio_todo_app_tasks_v1';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback if localStorage read fails
    }
    return INITIAL_TODOS;
  });

  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Handle storage quota or write error gracefully
    }
  }, [todos]);

  // Handlers
  const handleAddTodo = (data: { title: string; category: Category; priority: Priority; dueDate?: string }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: data.title,
      completed: false,
      priority: data.priority,
      category: data.category,
      dueDate: data.dueDate,
      isPinned: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleTogglePin = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isPinned: !todo.isPinned } : todo))
    );
  };

  const handleEditTodo = (id: string, updated: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo))
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Filtering & Sorting
  const filteredAndSortedTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        // Filter by status
        if (filterStatus === 'active' && todo.completed) return false;
        if (filterStatus === 'completed' && !todo.completed) return false;

        // Filter by category
        if (selectedCategory !== 'all' && todo.category !== selectedCategory) return false;

        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = todo.title.toLowerCase().includes(query);
          const matchesCategory = todo.category.toLowerCase().includes(query);
          if (!matchesTitle && !matchesCategory) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Pinned items always stay at top
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        // Secondary sorting
        if (sortBy === 'createdAt') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }

        if (sortBy === 'dueDate') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }

        if (sortBy === 'priority') {
          const priorityWeight: Record<Priority, number> = { high: 3, medium: 2, low: 1 };
          return priorityWeight[b.priority] - priorityWeight[a.priority];
        }

        return 0;
      });
  }, [todos, filterStatus, selectedCategory, searchQuery, sortBy]);

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Header totalCount={totalCount} completedCount={completedCount} />

        {/* Input Card */}
        <TodoInput onAddTodo={handleAddTodo} />

        {/* Filter Controls */}
        <TodoFilter
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
        />

        {/* Todo List Items */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedTodos.length > 0 ? (
              filteredAndSortedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onTogglePin={handleTogglePin}
                  onEdit={handleEditTodo}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  할일이 없습니다
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {searchQuery
                    ? `'${searchQuery}' 검색 결과에 해당하는 할일이 없어요.`
                    : '새로운 할일을 추가하여 일정을 관리해 보세요!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Tips Footer */}
        <footer className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500 space-y-1">
          <p className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
            중요한 할일은 핀(<span className="font-semibold text-indigo-500">📌</span>) 버튼으로 상단에 고정할 수 있습니다.
          </p>
          <p>모든 데이터는 브라우저의 로컬 저장소에 안전하게 보관됩니다.</p>
        </footer>
      </div>
    </div>
  );
}
