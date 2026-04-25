# Технологический стек

## Основа
- **React 18** + **TypeScript 5** — UI-фреймворк и типизация
- **Vite 5** — сборщик и dev-сервер
- **React Router v7** — маршрутизация (`createBrowserRouter`)
- **Tailwind CSS** + **tailwindcss-animate** + **tw-animate-css** — стилизация и анимации
- **shadcn/ui** (Radix UI primitives) — базовые UI-компоненты
- **Lucide React** + **MUI Icons** — иконки

## UI и взаимодействие
- **Radix UI** — accordion, dialog, dropdown, navigation, popover, select, tabs, tooltip и т.д.
- **MUI (@mui/material)** — отдельные тяжёлые компоненты
- **Embla Carousel** + **react-slick** + **slick-carousel** — карусели и слайдеры
- **Motion (Framer Motion)** — анимации
- **Sonner** + **react-toastify** — уведомления (тосты)
- **canvas-confetti** — праздничные эффекты
- **react-dnd** + **react-dnd-html5-backend** — drag-and-drop
- **react-img-mapper** — кликабельные области на изображениях (карта Минска)
- **react-responsive-masonry** — masonry-сетки
- **vaul** — мобильные drawer'ы
- **cmdk** — командная палитра
- **react-day-picker** + **date-fns** — выбор дат

## Формы и валидация
- **react-hook-form** + **@hookform/resolvers**
- **Zod** — схемы валидации
- **input-otp** — OTP-инпут

## Данные и состояние
- **@tanstack/react-query** — кеширование/фетчинг
- Локальные файлы данных в `src/app/data/`

## PWA
- **vite-plugin-pwa** + Workbox — Service Worker, манифест, оффлайн-кеш
- Автоматическое отключение SW в превью Lovable / iframe
- Баннер установки (`InstallPWA`) с инструкциями для iOS и нативным prompt для Android/Desktop
- Push-уведомления (`PushNotificationBanner`, `PushNotifications`)

## Тестирование и качество
- **Vitest** + **@testing-library/react** + **jsdom**
- **ESLint 9** + **typescript-eslint** + **eslint-plugin-react-hooks**

## Прочее
- **next-themes** — темы
- **recharts** — графики
- **react-resizable-panels** — изменяемые панели
