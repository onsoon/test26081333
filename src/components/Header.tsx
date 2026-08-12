import React from 'react';
import { CheckCircle2, ListTodo, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ totalCount, completedCount }) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{dateString}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <ListTodo className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span>오늘의 할일</span>
          </h1>
        </div>

        {/* Progress Card */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 min-w-[240px]">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              진행률
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {completedCount} / {totalCount} ({percentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          {percentage === 100 && totalCount > 0 && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              오늘의 모든 할일을 마쳤습니다! 수고하셨어요 🎉
            </p>
          )}
        </div>
      </div>
    </header>
  );
};
