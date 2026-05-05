import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Lock, LockOpen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { DataTable } from '../components/DataTable';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { AdminUser, usersStore, useStore } from '../lib/store';

export default function AdminUsers() {
  const [users, setUsers] = useStore(usersStore);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const updateRole = (id: string, role: AdminUser['role']) => {
    setUsers((l) => l.map((u) => (u.id === id ? { ...u, role } : u)));
    toast.success('Роль обновлена');
  };
  const toggleBlock = (id: string) => {
    setUsers((l) => l.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u)));
    toast.success('Статус обновлён');
  };
  const remove = () => {
    if (!toDelete) return;
    setUsers((l) => l.filter((x) => x.id !== toDelete));
    setToDelete(null);
    toast.success('Удалён');
  };

  const columns = useMemo<ColumnDef<AdminUser, unknown>[]>(() => [
    { accessorKey: 'name', header: 'Имя' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'createdAt', header: 'Дата регистрации' },
    {
      accessorKey: 'role', header: 'Роль',
      cell: ({ row }) => (
        <Select value={row.original.role} onValueChange={(v) => updateRole(row.original.id, v as AdminUser['role'])}>
          <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Админ</SelectItem>
            <SelectItem value="moderator">Модератор</SelectItem>
            <SelectItem value="user">Пользователь</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: 'blocked', header: 'Статус',
      cell: ({ row }) => (
        <span className={`text-xs px-2 py-0.5 rounded ${row.original.blocked ? 'bg-red-500/15 text-red-600' : 'bg-green-500/15 text-green-600'}`}>
          {row.original.blocked ? 'Заблокирован' : 'Активен'}
        </span>
      ),
    },
    {
      id: 'actions', header: '',
      cell: ({ row }) => (
        <div className="flex gap-1 justify-end">
          <Button variant="ghost" size="icon" onClick={() => toggleBlock(row.original.id)}>
            {row.original.blocked ? <LockOpen className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setToDelete(row.original.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Пользователи</h1>
        <p className="text-sm text-muted-foreground">Управление учётными записями</p>
      </div>
      <DataTable data={users} columns={columns} searchPlaceholder="Поиск пользователей…" exportFilename="users" />
      <ConfirmDialog open={!!toDelete} onOpenChange={(v) => !v && setToDelete(null)} onConfirm={remove} title="Удалить пользователя?" />
    </div>
  );
}
