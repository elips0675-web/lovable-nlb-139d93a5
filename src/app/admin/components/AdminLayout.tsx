import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Newspaper,
  Wrench,
  Users,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  Home,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/app/components/ui/sheet';
import { authStore, useStore } from '../lib/store';
import { toast } from 'sonner';

const nav = [
  { to: '/admin', label: 'Дашборд', icon: LayoutDashboard, end: true },
  { to: '/admin/books', label: 'Книги', icon: BookOpen },
  { to: '/admin/events', label: 'События', icon: Calendar },
  { to: '/admin/news', label: 'Новости', icon: Newspaper },
  { to: '/admin/services', label: 'Услуги', icon: Wrench },
  { to: '/admin/users', label: 'Пользователи', icon: Users },
  { to: '/admin/settings', label: 'Настройки', icon: Settings },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {nav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? 'bg-[#d69e2e] text-[#1a365d] font-medium'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  const labels: Record<string, string> = {
    admin: 'Админка',
    books: 'Книги',
    events: 'События',
    news: 'Новости',
    services: 'Услуги',
    users: 'Пользователи',
    settings: 'Настройки',
  };
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link to="/admin" className="hover:text-foreground flex items-center gap-1">
        <Home className="h-3.5 w-3.5" /> Главная
      </Link>
      {segments.slice(1).map((seg, i) => {
        const path = '/' + segments.slice(0, i + 2).join('/');
        const isLast = i === segments.length - 2;
        return (
          <span key={path} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" />
            {isLast ? (
              <span className="text-foreground">{labels[seg] ?? seg}</span>
            ) : (
              <Link to={path} className="hover:text-foreground">
                {labels[seg] ?? seg}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function AdminLayout() {
  const [auth, setAuth] = useStore(authStore);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Apply dark theme inside admin
  useEffect(() => {
    const root = document.documentElement;
    if (auth.theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    return () => root.classList.remove('dark');
  }, [auth.theme]);

  if (!auth.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Доступ запрещён</h1>
          <p className="text-muted-foreground">Требуются права администратора.</p>
          <Button onClick={() => navigate('/')}>На главную</Button>
        </div>
      </div>
    );
  }

  const Sidebar = (
    <div className="flex h-full flex-col bg-[#1a365d] text-white">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="h-8 w-8 rounded-lg bg-[#d69e2e] flex items-center justify-center text-[#1a365d] font-bold">
          Н
        </div>
        <div>
          <div className="font-semibold text-sm">НББ Админ</div>
          <div className="text-xs text-slate-300">Панель управления</div>
        </div>
      </div>
      <NavList onNavigate={() => setMobileOpen(false)} />
      <div className="border-t border-white/10 p-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
        >
          <LogOut className="h-4 w-4" /> Выйти на сайт
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 shrink-0">{Sidebar}</aside>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-[#1a365d] border-0">
          {Sidebar}
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-card px-4 py-3 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск в админке…"
              className="pl-9"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setAuth((a) => ({ ...a, theme: a.theme === 'dark' ? 'light' : 'dark' }))
            }
          >
            {auth.theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => toast('Уведомлений нет')}>
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#d69e2e] text-[#1a365d]">А</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Администратор</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                Настройки
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setAuth((a) => ({ ...a, isAdmin: false }));
                  navigate('/');
                }}
              >
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="px-4 md:px-6 py-3 border-b bg-card/50">
          <Breadcrumbs />
        </div>

        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={useLocation().pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
