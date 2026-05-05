import { useCallback, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

export function ImageDropZone({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => onChange(String(reader.result || ''));
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`relative rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
          drag ? 'border-primary bg-primary/5' : 'border-border'
        }`}
      >
        {value ? (
          <div className="relative inline-block">
            <img src={value} alt="preview" className="h-32 rounded object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-white"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="py-6">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Перетащите изображение или
            </p>
            <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
              Выбрать файл
            </Button>
          </div>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…или вставьте URL изображения"
      />
    </div>
  );
}
