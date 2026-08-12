import { Todo } from '../types';

export const INITIAL_TODOS: Todo[] = [
  {
    id: '1',
    title: '주간 업무 리포트 작성 및 검토하기',
    completed: false,
    priority: 'high',
    category: 'work',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    isPinned: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: '2',
    title: '유산소 운동 30분 달리기',
    completed: true,
    priority: 'medium',
    category: 'health',
    dueDate: new Date().toISOString().split('T')[0], // today
    isPinned: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: '3',
    title: '식료품 장보기 (우유, 계란, 야채)',
    completed: false,
    priority: 'low',
    category: 'shopping',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    isPinned: false,
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
  },
  {
    id: '4',
    title: 'TypeScript 최신 문법 및 패턴 복습',
    completed: false,
    priority: 'medium',
    category: 'study',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    isPinned: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];
