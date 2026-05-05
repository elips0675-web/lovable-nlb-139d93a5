import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Newspaper,
  Users,
  Plus,
  TrendingUp,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import {
  booksStore,
  eventsStore,
  newsStore,
  usersStore,
  useStore,
} from '../lib/store';

const visits = [
  { day: 'Пн', v: 320 },
  { day: 'Вт', v: 410 },
  { day: 'Ср', v: 380 },
  { day: 'Чт', v: 520 },
  { day: 'Пт', v: 610 },
  { day: 'Сб', v: 740 },
  { day: 'Вс', v: 690 },
];

export default function AdminDashboard() {
  const [books] = useStore(booksStore);
  const [events] = useStore(eventsStore);
  const [news] = useStore(newsStore);
  const [users] = useStore(usersStore);

  const stats = [
    { label: 'Книг', value: books.length, icon: BookOpen, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Событий', value: events.length, icon: Calendar, color: 'bg-purple-500/10 text-purple-500' },
    { label: 'Новостей', value: news.length, icon: Newspaper, color: 'bg-green-500/10 text-green-500' },
    { label: 'Пользователей', value: users.length, icon: Users, color: 'bg-amber-500/10 text-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Дашборд</h1>
        <p className="text-sm text-muted-foreground">Обзор активности портала</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4" /> Посещаемость за неделю
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visits}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d69e2e" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#d69e2e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                  }}
                />
                <Area type="monotone" dataKey="v" stroke="#d69e2e" fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Последние события</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {events.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-center justify-between border-b last:border-0 py-2">
                <div>
                  <div className="font-medium text-sm">{e.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {e.date} в {e.time}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{e.location}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Последние новости</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {news.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-center justify-between border-b last:border-0 py-2">
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.publishDate}</div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    n.status === 'published'
                      ? 'bg-green-500/15 text-green-600'
                      : 'bg-amber-500/15 text-amber-600'
                  }`}
                >
                  {n.status === 'published' ? 'Опубл.' : 'Черновик'}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/admin/books">
              <Plus className="h-4 w-4" /> Книгу
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/events">
              <Plus className="h-4 w-4" /> Событие
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/news">
              <Plus className="h-4 w-4" /> Новость
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
