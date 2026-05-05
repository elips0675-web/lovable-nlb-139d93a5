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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { DataTable } from '../components/DataTable';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ImageDropZone } from '../components/ImageDropZone';
import { type AdminNews, newsStore, uid, useStore } from '../lib/store';

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tagsStr: z.string(),
  image: z.string().min(1),
  publishDate: z.string().min(1),
  status: z.enum(['draft', 'published']),
});
type FormData = z.infer<typeof schema>;

export default function AdminNews() {
  const [news, setNews] = useStore(newsStore);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminNews | null>(null);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', content: '', tagsStr: '', image: '', publishDate: '', status: 'draft' },
  });

  const openNew = () => {
    setEditing(null);
    form.reset({ title: '', content: '', tagsStr: '', image: '', publishDate: new Date().toISOString().slice(0, 10), status: 'draft' });
    setOpen(true);
  };
  const openEdit = (n: AdminNews) => {
    setEditing(n);
    form.reset({ ...n, tagsStr: n.tags.join(', ') });
    setOpen(true);
  };
  const submit = (data: FormData) => {
    const item: AdminNews = {
      id: editing?.id ?? uid(),
      title: data.title,
      content: data.content,
      tags: data.tagsStr.split(',').map((t) => t.trim()).filter(Boolean),
      image: data.image,
      publishDate: data.publishDate,
      status: data.status,
    };
    if (editing) {
      setNews((l) => l.map((x) => (x.id === editing.id ? item : x)));
      toast.success('Новость обновлена');
    } else {
      setNews((l) => [...l, item]);
      toast.success('Новость добавлена');
    }
    setOpen(false);
  };
  const remove = () => {
    if (!toDelete) return;
    setNews((l) => l.filter((x) => x.id !== toDelete));
    setToDelete(null);
    toast.success('Удалено');
  };

  const columns = useMemo<ColumnDef<AdminNews, unknown>[]>(() => [
    { accessorKey: 'title', header: 'Заголовок' },
    { accessorKey: 'publishDate', header: 'Дата' },
    {
      accessorKey: 'tags', header: 'Теги',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.tags.map((t) => (
            <span key={t} className="text-xs bg-muted px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'status', header: 'Статус',
      cell: ({ row }) => (
        <span className={`text-xs px-2 py-0.5 rounded ${row.original.status === 'published' ? 'bg-green-500/15 text-green-600' : 'bg-amber-500/15 text-amber-600'}`}>
          {row.original.status === 'published' ? 'Опубликовано' : 'Черновик'}
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
          <h1 className="text-2xl font-semibold">Новости</h1>
          <p className="text-sm text-muted-foreground">Управление публикациями</p>
        </div>
        <Button onClick={openNew}><Plus className="h-4 w-4" /> Добавить</Button>
      </div>
      <DataTable data={news} columns={columns} searchPlaceholder="Поиск по заголовку, тегам…" exportFilename="news" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Редактировать' : 'Новая новость'}</DialogTitle></DialogHeader>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
            <div><Label>Заголовок</Label><Input {...form.register('title')} /></div>
            <div><Label>Текст</Label><Textarea rows={5} {...form.register('content')} /></div>
            <div><Label>Теги (через запятую)</Label><Input {...form.register('tagsStr')} placeholder="новости, технологии" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Дата публикации</Label><Input type="date" {...form.register('publishDate')} /></div>
              <div>
                <Label>Статус</Label>
                <Select value={form.watch('status')} onValueChange={(v) => form.setValue('status', v as 'draft' | 'published')}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Черновик</SelectItem>
                    <SelectItem value="published">Опубликовано</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
