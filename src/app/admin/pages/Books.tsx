import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { DataTable } from '../components/DataTable';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ImageDropZone } from '../components/ImageDropZone';
import { AdminBook, booksStore, uid, useStore } from '../lib/store';

const schema = z.object({
  title: z.string().min(1, 'Обязательно'),
  author: z.string().min(1, 'Обязательно'),
  isbn: z.string().min(1, 'Обязательно'),
  category: z.string().min(1, 'Обязательно'),
  description: z.string().min(1, 'Обязательно'),
  cover: z.string().url('URL').or(z.string().startsWith('data:')),
  available: z.boolean(),
});
type FormData = z.infer<typeof schema>;

export default function AdminBooks() {
  const [books, setBooks] = useStore(booksStore);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminBook | null>(null);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', author: '', isbn: '', category: '', description: '', cover: '', available: true },
  });

  const openNew = () => {
    setEditing(null);
    form.reset({ title: '', author: '', isbn: '', category: '', description: '', cover: '', available: true });
    setOpen(true);
  };

  const openEdit = (b: AdminBook) => {
    setEditing(b);
    form.reset(b);
    setOpen(true);
  };

  const submit = (data: FormData) => {
    if (editing) {
      setBooks((list) => list.map((x) => (x.id === editing.id ? { ...editing, ...data } : x)));
      toast.success('Книга обновлена');
    } else {
      setBooks((list) => [...list, { ...data, id: uid() }]);
      toast.success('Книга добавлена');
    }
    setOpen(false);
  };

  const remove = () => {
    if (!toDelete) return;
    setBooks((list) => list.filter((x) => x.id !== toDelete));
    setToDelete(null);
    toast.success('Удалено');
  };

  const columns = useMemo<ColumnDef<AdminBook, unknown>[]>(
    () => [
      {
        accessorKey: 'cover',
        header: 'Обложка',
        cell: ({ row }) => (
          <img src={row.original.cover} alt="" className="h-10 w-8 rounded object-cover" />
        ),
      },
      { accessorKey: 'title', header: 'Название' },
      { accessorKey: 'author', header: 'Автор' },
      { accessorKey: 'category', header: 'Категория' },
      { accessorKey: 'isbn', header: 'ISBN' },
      {
        accessorKey: 'available',
        header: 'Статус',
        cell: ({ row }) => (
          <span
            className={`text-xs px-2 py-0.5 rounded ${
              row.original.available
                ? 'bg-green-500/15 text-green-600'
                : 'bg-red-500/15 text-red-600'
            }`}
          >
            {row.original.available ? 'Доступна' : 'Недоступна'}
          </span>
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex gap-1 justify-end">
            <Button variant="ghost" size="icon" onClick={() => openEdit(row.original)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setToDelete(row.original.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Книги</h1>
          <p className="text-sm text-muted-foreground">Управление каталогом</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" /> Добавить
        </Button>
      </div>

      <DataTable
        data={books}
        columns={columns}
        searchPlaceholder="Поиск по названию, автору…"
        exportFilename="books"
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Редактировать книгу' : 'Новая книга'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
            <div>
              <Label>Название</Label>
              <Input {...form.register('title')} />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Автор</Label>
                <Input {...form.register('author')} />
              </div>
              <div>
                <Label>ISBN</Label>
                <Input {...form.register('isbn')} />
              </div>
            </div>
            <div>
              <Label>Категория</Label>
              <Input {...form.register('category')} />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea rows={3} {...form.register('description')} />
            </div>
            <div>
              <Label>Обложка</Label>
              <ImageDropZone
                value={form.watch('cover')}
                onChange={(v) => form.setValue('cover', v, { shouldValidate: true })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.watch('available')}
                onCheckedChange={(v) => form.setValue('available', v)}
              />
              <Label>Доступна для выдачи</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
        onConfirm={remove}
      />
    </div>
  );
}
