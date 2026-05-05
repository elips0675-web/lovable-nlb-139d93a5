import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes';
import InstallPWA from './components/InstallPWA';
import { PushNotifications } from './components/ui/PushNotifications';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <InstallPWA />
      <PushNotifications />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
