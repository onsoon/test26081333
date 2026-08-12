import React, { useState } from 'react';
import { Check, Trash2, Edit2, Pin, Calendar, Tag, AlertCircle, X, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { Todo, Category, Priority, CATEGORIES, PRIORITIES } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onEdit: (id: string, updated: Partial<Todo>) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onTogglePin,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editCategory, setEditCategory] = useState<Category>(todo.category);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(todo.id, {
      title: editTitle.trim(),
      category: editCategory,
      priority: editPriority,
      dueDate: editDueDate || undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditCategory(todo.category);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setIsEditing(false);
  };

  const categoryInfo = CATEGORIES[todo.category] || CATEGORIES.general;
  const priorityInfo = PRIORITIES[todo.priority] || PRIORITIES.medium;

  // Due date status formatting
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date(new Date().setHours(0,0,0,0)) && !todo.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`group relative bg-white dark:bg-slate-900 border rounded-2xl p-4 transition-all shadow-sm hover:shadow-md ${
        todo.completed
          ? 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 opacity-75'
          : todo.isPinned
          ? 'border-indigo-200 dark:border-indigo-900/60 ring-1 ring-indigo-500/20'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {isEditing ? (
        /* Edit Mode */
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value as Category)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
            >
              {Object.values(CATEGORIES).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
            >
              {(Object.keys(PRIORITIES) as Priority[]).map((pKey) => (
                <option key={pKey} value={pKey}>
                  {PRIORITIES[pKey].label}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs rounded-lg px-2 py-1.5 text-slate-800 dark:text-slate-200"
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> 취소
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> 저장
            </button>
          </div>
        </div>
      ) : (
        /* View Mode */
        <div className="flex items-start gap-3.5">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border transition-all flex items-center justify-center cursor-pointer ${
              todo.completed
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 bg-white dark:bg-slate-800'
            }`}
          >
            {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {/* Category Badge */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${categoryInfo.bgColor}`}>
                <Tag className="w-3 h-3" />
                {categoryInfo.label}
              </span>

              {/* Priority Badge */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${priorityInfo.badgeBg}`}>
                <AlertCircle className="w-3 h-3" />
                {priorityInfo.label}
              </span>

              {/* Due Date Tag */}
              {todo.dueDate && (
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${
                    isOverdue
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 font-semibold'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  <Calendar className="w-3 h-3" />
                  {todo.dueDate} {isOverdue && '(기한 초과)'}
                </span>
              )}
            </div>

            {/* Todo Title */}
            <p
              className={`text-sm font-medium leading-snug break-words transition-all ${
                todo.completed
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              {todo.title}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Pin Toggle */}
            <button
              onClick={() => onTogglePin(todo.id)}
              title={todo.isPinned ? '고정 해제' : '상단 고정'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                todo.isPinned
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Pin className="w-4 h-4 fill-current" />
            </button>

            {/* Edit */}
            <button
              onClick={() => setIsEditing(true)}
              title="수정"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(todo.id)}
              title="삭제"
              className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
