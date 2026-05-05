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
import { AdminEvent, eventsStore, uid, useStore } from '../lib/store';

const schema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  capacity: z.coerce.number().min(0),
  registrationOpen: z.boolean(),
});
type FormData = z.infer<typeof schema>;

export default function AdminEvents() {
  const [events, setEvents] = useStore(eventsStore);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminEvent | null>(null);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '', date: '', time: '', location: '', description: '', image: '', capacity: 0, registrationOpen: true,
    },
  });

  const openNew = () => {
    setEditing(null);
    form.reset({ title: '', date: '', time: '', location: '', description: '', image: '', capacity: 0, registrationOpen: true });
    setOpen(true);
  };
  const openEdit = (e: AdminEvent) => {
    setEditing(e);
    form.reset(e);
    setOpen(true);
  };
  const submit = (data: FormData) => {
    const clean = data as AdminEvent;
    if (editing) {
      setEvents((l) => l.map((x) => (x.id === editing.id ? { ...editing, ...clean } : x)));
      toast.success('Событие обновлено');
    } else {
      setEvents((l) => [...l, { ...clean, id: uid() }]);
      toast.success('Событие добавлено');
    }
    setOpen(false);
  };
  const remove = () => {
    if (!toDelete) return;
    setEvents((l) => l.filter((x) => x.id !== toDelete));
    setToDelete(null);
    toast.success('Удалено');
  };

  const columns = useMemo<ColumnDef<AdminEvent, unknown>[]>(() => [
    { accessorKey: 'title', header: 'Название' },
    { accessorKey: 'date', header: 'Дата' },
    { accessorKey: 'time', header: 'Время' },
    { accessorKey: 'location', header: 'Место' },
    { accessorKey: 'capacity', header: 'Мест' },
    {
      accessorKey: 'registrationOpen',
      header: 'Регистрация',
      cell: ({ row }) => (
        <span className={`text-xs px-2 py-0.5 rounded ${row.original.registrationOpen ? 'bg-green-500/15 text-green-600' : 'bg-red-500/15 text-red-600'}`}>
          {row.original.registrationOpen ? 'Открыта' : 'Закрыта'}
        </span>
      ),
    },
    {
      id: 'actions', header: '',
      cell: ({ row }) => (
        <div className="flex gap-1 justify-end">
          <Button variant="ghost" size="icon" onClick={() => openEdit(row.original)}><Pencil className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => setToDelete(row.original.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">События</h1>
          <p className="text-sm text-muted-foreground">Управление мероприятиями</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Добавить</Button>
      </div>
      <DataTable data={events} columns={columns} searchPlaceholder="Поиск событий…" exportFilename="events" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Редактировать' : 'Новое событие'}</DialogTitle></DialogHeader>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
            <div><Label>Название</Label><Input {...form.register('title')} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Дата</Label><Input type="date" {...form.register('date')} /></div>
              <div><Label>Время</Label><Input type="time" {...form.register('time')} /></div>
            </div>
            <div><Label>Место</Label><Input {...form.register('location')} /></div>
            <div><Label>Вместимость</Label><Input type="number" {...form.register('capacity')} /></div>
            <div><Label>Описание</Label><Textarea rows={3} {...form.register('description')} /></div>
            <div><Label>Изображение</Label>
              <ImageDropZone value={form.watch('image')} onChange={(v) => form.setValue('image', v, { shouldValidate: true })} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.watch('registrationOpen')} onCheckedChange={(v) => form.setValue('registrationOpen', v)} />
              <Label>Регистрация открыта</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <ConfirmDialog open={!!toDelete} onOpenChange={(v) => !v && setToDelete(null)} onConfirm={remove} />
    </div>
  );
}
