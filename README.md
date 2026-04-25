# lovable-nlb

PWA-портал Национальной библиотеки Беларуси. Построен на Lovable.

- 🌐 Превью: https://id-preview--3a5ebff2-151c-4b40-b357-e19a8ffa7c05.lovable.app
- 🚀 Опубликовано: https://orbit-unchained.lovable.app

## Документация

Подробная документация в папке [`docs/`](./docs):
- [docs/STACK.md](./docs/STACK.md) — технологический стек
- [docs/FEATURES.md](./docs/FEATURES.md) — функциональность приложения

## Технологический стек

### Основа
- **React 18** + **TypeScript 5** — UI и типизация
- **Vite 5** — сборщик
- **React Router v7** — маршрутизация
- **Tailwind CSS** + **tailwindcss-animate** / **tw-animate-css** — стилизация и анимации
- **shadcn/ui** (Radix UI) — базовые компоненты
- **Lucide React** + **MUI Icons** — иконки

### UI / взаимодействие
- Radix UI primitives, MUI, Embla Carousel, react-slick, Motion (Framer Motion), Sonner, react-toastify, canvas-confetti, react-dnd, react-img-mapper, react-responsive-masonry, vaul, cmdk, react-day-picker + date-fns

### Формы и данные
- react-hook-form + Zod, @tanstack/react-query, input-otp

### PWA
- **vite-plugin-pwa** + Workbox — Service Worker, манифест, оффлайн-кеш
- Баннер установки на iOS/Android/Desktop с cooldown 7 дней
- Push-уведомления
- SW автоматически отключается в Lovable-превью

### Тестирование
- Vitest + @testing-library/react + jsdom
- ESLint 9 + typescript-eslint

## Функциональность

- **Главная** (`/`) — hero, услуги, бестселлеры, события, новости, проекты, отзывы, партнёры, контакты
- **Услуги** (`/services`, `/services/:id`) + витрины: кафе, детская зона, лекторий, концертный зал
- **Полиграфия** (`/printing-services`, `/printing-services/:id`, оформление заказа)
- **События** (`/all-events`, `/all-events/:id`) — список с фильтрами и регистрацией
- **Новости** (`/all-news`, `/news/:id`) — поиск по заголовку/описанию/тегам, фильтры по категориям, шаринг, блок «Похожие новости»
- **Книги** (`/books-catalog`, `/books/:id`)
- **Карты** — интерактивная карта здания (`/interactive-map`) и карта услуг по Минску (`/minsk-map`)
- **Профиль** — `/registration`, `/profile`, `/notifications`
- **PWA** — установка на главный экран, оффлайн-режим, push-уведомления, FAB-виджет, форма обратной связи

Полный список — в [docs/FEATURES.md](./docs/FEATURES.md).

## Локальная разработка

```bash
bun install
bun run dev      # dev-сервер
bun run build    # production-сборка
bun run test     # тесты Vitest
bun run lint     # ESLint
```

## Развёртывание

Проект синхронизирован с Lovable. Изменения в этом репозитории автоматически попадают в Lovable и наоборот. Опубликовать новую версию можно через кнопку **Publish** в редакторе Lovable.