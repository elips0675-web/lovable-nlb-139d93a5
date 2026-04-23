
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

export const PushNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (Notification.permission === 'default') {
      requestPermission();
    }
  }, []);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermission(permission);
  };

  const showNotification = () => {
    if (permission === 'granted') {
      new Notification('Уведомление!', {
        body: 'Это тестовое уведомление.',
      });
    }
  };

  if (permission === 'denied') {
    return null;
  }

  return (
    <button 
      onClick={showNotification} 
      className="fixed bottom-20 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
    >
      <Bell className="w-6 h-6" />
    </button>
  );
};
