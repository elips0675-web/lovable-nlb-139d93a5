import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { DataTable } from '../components/DataTable';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ImageDropZone } from '../components/ImageDropZone';
import { AdminService, servicesStore, uid, useStore } from '../lib/store';

const schema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

export default function AdminServices() {
  const [services, setServices] = useStore(servicesStore);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminService | null>(null);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', category: '', price: '', description: '', image: '' },
  });

  const openNew = () => { setEditing(null); form.reset({ name: '', category: '', price: '', description: '', image: '' }); setOpen(true); };
  const openEdit = (s: AdminService) => { setEditing(s); form.reset(s); setOpen(true); };
  const submit = (data: FormData) => {
    const clean = data as AdminService;
    if (editing) {
      setServices((l) => l.map((x) => (x.id === editing.id ? { ...editing, ...clean } : x)));
      toast.success('Услуга обновлена');
    } else {
      setServices((l) => [...l, { ...clean, id: uid() }]);
      toast.success('Услуга добавлена');
    }
    setOpen(false);
  };
  const remove = () => {
    if (!toDelete) return;
    setServices((l) => l.filter((x) => x.id !== toDelete));
    setToDelete(null);
    toast.success('Удалено');
  };

  const columns = useMemo<ColumnDef<AdminService, unknown>[]>(() => [
    {
      accessorKey: 'image', header: 'Фото',
      cell: ({ row }) => <img src={row.original.image} alt="" className="h-10 w-10 rounded object-cover" />,
    },
    { accessorKey: 'name', header: 'Название' },
    { accessorKey: 'category', header: 'Категория' },
    { accessorKey: 'price', header: 'Цена' },
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
          <h1 className="text-2xl font-semibold">Услуги</h1>
          <p className="text-sm text-muted-foreground">Управление услугами библиотеки</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Добавить</Button>
      </div>
      <DataTable data={services} columns={columns} searchPlaceholder="Поиск услуг…" exportFilename="services" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Редактировать услугу' : 'Новая услуга'}</DialogTitle></DialogHeader>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
            <div><Label>Название</Label><Input {...form.register('name')} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Категория</Label><Input {...form.register('category')} /></div>
              <div><Label>Цена</Label><Input {...form.register('price')} /></div>
            </div>
            <div><Label>Описание</Label><Textarea rows={3} {...form.register('description')} /></div>
            <div><Label>Изображение</Label>
              <ImageDropZone value={form.watch('image')} onChange={(v) => form.setValue('image', v, { shouldValidate: true })} />
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
