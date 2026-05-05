import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { settingsStore, useStore } from '../lib/store';

export default function AdminSettings() {
  const [s, setS] = useStore(settingsStore);

  const save = () => toast.success('Настройки сохранены');

  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">Настройки</h1>
        <p className="text-sm text-muted-foreground">Конфигурация портала</p>
      </div>

      <Tabs defaultValue="contacts">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="social">Соцсети</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="pwa">PWA</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <Card><CardHeader><CardTitle className="text-base">Контактные данные</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><Label>Email</Label><Input value={s.contactEmail} onChange={(e) => setS({ ...s, contactEmail: e.target.value })} /></div>
              <div><Label>Телефон</Label><Input value={s.contactPhone} onChange={(e) => setS({ ...s, contactPhone: e.target.value })} /></div>
              <div><Label>Адрес</Label><Textarea value={s.address} onChange={(e) => setS({ ...s, address: e.target.value })} /></div>
              <Button onClick={save}>Сохранить</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card><CardHeader><CardTitle className="text-base">Социальные сети</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><Label>Facebook</Label><Input value={s.social.facebook} onChange={(e) => setS({ ...s, social: { ...s.social, facebook: e.target.value } })} /></div>
              <div><Label>Instagram</Label><Input value={s.social.instagram} onChange={(e) => setS({ ...s, social: { ...s.social, instagram: e.target.value } })} /></div>
              <div><Label>Telegram</Label><Input value={s.social.telegram} onChange={(e) => setS({ ...s, social: { ...s.social, telegram: e.target.value } })} /></div>
              <Button onClick={save}>Сохранить</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card><CardHeader><CardTitle className="text-base">SEO</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><Label>Title</Label><Input value={s.seo.title} onChange={(e) => setS({ ...s, seo: { ...s.seo, title: e.target.value } })} /></div>
              <div><Label>Description</Label><Textarea value={s.seo.description} onChange={(e) => setS({ ...s, seo: { ...s.seo, description: e.target.value } })} /></div>
              <div><Label>Keywords</Label><Input value={s.seo.keywords} onChange={(e) => setS({ ...s, seo: { ...s.seo, keywords: e.target.value } })} /></div>
              <Button onClick={save}>Сохранить</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pwa">
          <Card><CardHeader><CardTitle className="text-base">PWA</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Theme color</Label>
                  <div className="flex gap-2">
                    <Input type="color" value={s.pwa.themeColor} onChange={(e) => setS({ ...s, pwa: { ...s.pwa, themeColor: e.target.value } })} className="w-16 p-1" />
                    <Input value={s.pwa.themeColor} onChange={(e) => setS({ ...s, pwa: { ...s.pwa, themeColor: e.target.value } })} />
                  </div>
                </div>
                <div>
                  <Label>Background</Label>
                  <div className="flex gap-2">
                    <Input type="color" value={s.pwa.backgroundColor} onChange={(e) => setS({ ...s, pwa: { ...s.pwa, backgroundColor: e.target.value } })} className="w-16 p-1" />
                    <Input value={s.pwa.backgroundColor} onChange={(e) => setS({ ...s, pwa: { ...s.pwa, backgroundColor: e.target.value } })} />
                  </div>
                </div>
              </div>
              <Button onClick={save}>Сохранить</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
