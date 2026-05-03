import { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, FileText, Calendar, Briefcase, Printer, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { newsItems } from '../data/news';
import { events } from '../data/events';
import { servicesData } from '../data/service-details';
import { catalogServices } from '../data/printing-services';
import { books } from '../page-templates/books-catalog';

type Result = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  type: 'Новость' | 'Мероприятие' | 'Услуга' | 'Полиграфия' | 'Книга';
};

const typeIcon: Record<Result['type'], any> = {
  'Новость': FileText,
  'Мероприятие': Calendar,
  'Услуга': Briefcase,
  'Полиграфия': Printer,
  'Книга': BookOpen,
};

const typeColor: Record<Result['type'], string> = {
  'Новость': 'text-emerald-600 bg-emerald-50',
  'Мероприятие': 'text-blue-600 bg-blue-50',
  'Услуга': 'text-purple-600 bg-purple-50',
  'Полиграфия': 'text-orange-600 bg-orange-50',
  'Книга': 'text-pink-600 bg-pink-50',
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function GlobalSearch({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const allItems = useMemo<Result[]>(() => {
    const list: Result[] = [];
    newsItems.forEach((n) => {
      list.push({
        id: `news-${n.id}`,
        title: n.title,
        subtitle: n.description,
        href: `/news/${n.id}`,
        type: 'Новость',
      });
    });
    events.forEach((e) => {
      list.push({
        id: `event-${e.id}`,
        title: e.title,
        subtitle: `${e.date} • ${e.location}`,
        href: `/all-events/${e.id}`,
        type: 'Мероприятие',
      });
    });
    Object.values(servicesData).forEach((s: any) => {
      list.push({
        id: `service-${s.id}`,
        title: s.title,
        subtitle: s.subtitle || s.description,
        href: `/services/${s.id}`,
        type: 'Услуга',
      });
    });
    catalogServices.forEach((s: any) => {
      list.push({
        id: `printing-${s.id}`,
        title: s.title,
        subtitle: s.description,
        href: `/printing-services/${s.id}`,
        type: 'Полиграфия',
      });
    });
    books.forEach((b: any) => {
      list.push({
        id: `book-${b.id}`,
        title: b.title,
        subtitle: `${b.author}${b.year ? ` • ${b.year}` : ''}`,
        href: `/books/${b.id}`,
        type: 'Книга',
      });
    });
    return list;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allItems
      .filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          (i.subtitle?.toLowerCase().includes(q) ?? false),
      )
      .slice(0, 30);
  }, [query, allItems]);

  const grouped = useMemo(() => {
    const g: Record<string, Result[]> = {};
    results.forEach((r) => {
      g[r.type] = g[r.type] || [];
      g[r.type].push(r);
    });
    return g;
  }, [results]);

  const handleSelect = (href: string) => {
    onClose();
    navigate(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-20 max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по сайту: новости, мероприятия, услуги, книги..."
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-700"
                  aria-label="Очистить"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50"
              >
                Esc
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {!query && (
                <div className="p-8 text-center text-sm text-gray-500">
                  Начните вводить запрос — поиск по новостям, мероприятиям, услугам, полиграфии и книгам.
                </div>
              )}
              {query && results.length === 0 && (
                <div className="p-8 text-center text-sm text-gray-500">
                  Ничего не найдено по запросу «{query}».
                </div>
              )}
              {Object.entries(grouped).map(([type, items]) => {
                const Icon = typeIcon[type as Result['type']];
                return (
                  <div key={type} className="py-2">
                    <div className="px-5 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {type} ({items.length})
                    </div>
                    {items.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => handleSelect(r.href)}
                        className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-start gap-3 transition-colors"
                      >
                        <span
                          className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${typeColor[r.type]}`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-gray-900 truncate">
                            {r.title}
                          </span>
                          {r.subtitle && (
                            <span className="block text-xs text-gray-500 truncate mt-0.5">
                              {r.subtitle}
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}