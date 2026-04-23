import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Share, Plus, Smartphone } from 'lucide-react';

const DISMISS_KEY = 'pwa-install-dismissed-at';
const DISMISS_DAYS = 7;

const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(display-mode: standalone)').matches ||
    // @ts-ignore - iOS Safari
    window.navigator.standalone === true);

const isIOS = () =>
  typeof window !== 'undefined' &&
  /iphone|ipad|ipod/i.test(window.navigator.userAgent) &&
  // @ts-ignore - msStream
  !window.MSStream;

const wasRecentlyDismissed = () => {
  try {
    const ts = localStorage.getItem(DISMISS_KEY);
    if (!ts) return false;
    const diffDays = (Date.now() - Number(ts)) / (1000 * 60 * 60 * 24);
    return diffDays < DISMISS_DAYS;
  } catch {
    return false;
  }
};

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone() || wasRecentlyDismissed()) return;

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    const onInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    // iOS не поддерживает beforeinstallprompt — показываем подсказку через 2 сек
    if (isIOS()) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => {
        clearTimeout(t);
        window.removeEventListener('beforeinstallprompt', onBeforeInstall);
        window.removeEventListener('appinstalled', onInstalled);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setVisible(false);
    setIosHint(false);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setVisible(false);
      } else {
        dismiss();
      }
      setDeferredPrompt(null);
    } else if (isIOS()) {
      setIosHint(true);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pwa-banner"
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed left-1/2 -translate-x-1/2 bottom-4 z-[1000] w-[calc(100%-1.5rem)] max-w-md"
          role="dialog"
          aria-label="Установка приложения"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
            {/* Декоративный градиент */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />

            <button
              onClick={dismiss}
              aria-label="Закрыть"
              className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    Установите Библиотеку 2026
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 leading-snug">
                    Быстрый доступ с домашнего экрана, работа без браузера и push-уведомления.
                  </p>
                </div>
              </div>

              {!iosHint ? (
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={dismiss}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                  >
                    Не сейчас
                  </button>
                  <button
                    onClick={handleInstallClick}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Установить
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-900"
                >
                  <p className="font-medium mb-2">Чтобы установить на iPhone:</p>
                  <ol className="space-y-1.5 text-blue-800">
                    <li className="flex items-center gap-2">
                      <span className="font-semibold">1.</span> Нажмите
                      <Share className="inline-block w-4 h-4" />
                      «Поделиться»
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-semibold">2.</span> Выберите
                      <Plus className="inline-block w-4 h-4" />
                      «На экран Домой»
                    </li>
                  </ol>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPWA;
