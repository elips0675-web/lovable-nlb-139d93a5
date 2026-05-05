import { useEffect, useState } from 'react';

type Listener = () => void;

function createStore<T>(key: string, initial: T) {
  let value: T;
  try {
    const raw = localStorage.getItem(key);
    value = raw ? (JSON.parse(raw) as T) : initial;
  } catch {
    value = initial;
  }
  const listeners = new Set<Listener>();

  return {
    get: () => value,
    set: (updater: T | ((prev: T) => T)) => {
      value =
        typeof updater === 'function'
          ? (updater as (prev: T) => T)(value)
          : updater;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* ignore */
      }
      listeners.forEach((l) => l());
    },
    subscribe: (l: Listener) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

export function useStore<T>(store: ReturnType<typeof createStore<T>>) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const unsub = store.subscribe(() => setTick((t) => t + 1));
    return () => {
      unsub();
    };
  }, [store]);
  return [store.get(), store.set] as const;
}

export interface AdminBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  cover: string;
  available: boolean;
}

export interface AdminEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  capacity: number;
  registrationOpen: boolean;
}

export interface AdminNews {
  id: string;
  title: string;
  content: string;
  tags: string[];
  image: string;
  publishDate: string;
  status: 'draft' | 'published';
}

export interface AdminService {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  blocked: boolean;
  createdAt: string;
}

export interface AdminSettings {
  contactEmail: string;
  contactPhone: string;
  address: string;
  social: { facebook: string; instagram: string; telegram: string };
  seo: { title: string; description: string; keywords: string };
  pwa: { themeColor: string; backgroundColor: string };
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const booksStore = createStore<AdminBook[]>('admin:books', [
  {
    id: uid(),
    title: 'Война и мир',
    author: 'Лев Толстой',
    isbn: '978-5-17-080115-0',
    category: 'Классика',
    description: 'Эпопея о войне 1812 года.',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    available: true,
  },
  {
    id: uid(),
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    isbn: '978-5-17-090876-7',
    category: 'Классика',
    description: 'Психологический роман.',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
    available: true,
  },
  {
    id: uid(),
    title: 'Людзi на балоце',
    author: 'Іван Мележ',
    isbn: '978-985-15-1234-5',
    category: 'Беларуская проза',
    description: 'Класічны раман беларускай літаратуры.',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    available: false,
  },
]);

export const eventsStore = createStore<AdminEvent[]>('admin:events', [
  {
    id: uid(),
    title: 'Встреча с автором',
    date: '2026-05-15',
    time: '18:00',
    location: 'Конференц-зал',
    description: 'Лекция и автограф-сессия.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600',
    capacity: 100,
    registrationOpen: true,
  },
  {
    id: uid(),
    title: 'Литературный вечер',
    date: '2026-05-22',
    time: '19:00',
    location: 'Малый зал',
    description: 'Вечер поэзии.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
    capacity: 50,
    registrationOpen: true,
  },
]);

export const newsStore = createStore<AdminNews[]>('admin:news', [
  {
    id: uid(),
    title: 'Внедрение ИИ-ассистента',
    content: 'Виртуальный ИИ-ассистент готов помочь с поиском книг.',
    tags: ['технологии', 'ии'],
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600',
    publishDate: '2026-04-18',
    status: 'published',
  },
  {
    id: uid(),
    title: 'Новые поступления',
    content: 'В каталог добавлено 200 новых книг.',
    tags: ['книги', 'новости'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
    publishDate: '2026-04-10',
    status: 'draft',
  },
]);

export const servicesStore = createStore<AdminService[]>('admin:services', [
  {
    id: uid(),
    name: 'Печать А4 ч/б',
    category: 'Полиграфия',
    price: '5 BYN',
    description: 'Чёрно-белая печать формата А4.',
    image: 'https://images.unsplash.com/photo-1771173479042-810085465e49?w=400',
  },
  {
    id: uid(),
    name: 'Кафе',
    category: 'Питание',
    price: 'от 3 BYN',
    description: 'Уютное кафе на территории библиотеки.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
  },
  {
    id: uid(),
    name: 'Детская зона',
    category: 'Дети',
    price: 'Бесплатно',
    description: 'Игровая зона для детей.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
  },
]);

export const usersStore = createStore<AdminUser[]>('admin:users', [
  {
    id: uid(),
    name: 'Анна Иванова',
    email: 'admin@nlb.by',
    role: 'admin',
    blocked: false,
    createdAt: '2026-01-15',
  },
  {
    id: uid(),
    name: 'Пётр Сидоров',
    email: 'mod@nlb.by',
    role: 'moderator',
    blocked: false,
    createdAt: '2026-02-10',
  },
  {
    id: uid(),
    name: 'Мария Петрова',
    email: 'user@nlb.by',
    role: 'user',
    blocked: false,
    createdAt: '2026-03-05',
  },
]);

export const settingsStore = createStore<AdminSettings>('admin:settings', {
  contactEmail: 'info@nlb.by',
  contactPhone: '+375 17 293-00-00',
  address: 'пр. Независимости 116, Минск',
  social: {
    facebook: 'https://facebook.com/nlb.by',
    instagram: 'https://instagram.com/nlb_by',
    telegram: 'https://t.me/nlb_by',
  },
  seo: {
    title: 'Национальная библиотека Беларуси',
    description: 'Главная библиотека страны',
    keywords: 'библиотека, книги, минск, беларусь',
  },
  pwa: {
    themeColor: '#1a365d',
    backgroundColor: '#ffffff',
  },
});

export const authStore = createStore<{ isAdmin: boolean; theme: 'light' | 'dark' }>(
  'admin:auth',
  { isAdmin: true, theme: 'dark' },
);

export { uid };
