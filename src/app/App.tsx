import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import InstallPWA from './components/InstallPWA';
import { PushNotifications } from './components/ui/PushNotifications';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <InstallPWA />
      <PushNotifications />
    </>
  );
}
