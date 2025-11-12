# Sellio UI — Vite + React + SWC + Tailwind (Docker-ready)

Мінімальний boilerplate з готовою інтеграцією:
- Vite
- React
- SWC (`@vitejs/plugin-react-swc`)
- Tailwind CSS
- Docker (dev і prod)

## Швидкий старт (локально)

1) Встановіть залежності:
```bash
npm install
```

2) Запустіть dev-сервер:
```bash
npm run dev
```
Відкрийте `http://localhost:5173/`.

3) Продакшн-збірка:
```bash
npm run build
npm run preview
```
Попередній перегляд буде доступний на `http://localhost:4173/`.

## Запуск у Docker

### Режим розробки (hot-reload)
```bash
docker compose up web
```
Відкрийте `http://localhost:5173/`.

### Продакшн-режим (nginx)
```bash
docker compose up --build prod
```
Продакшн-сервер працює на `http://localhost:8080/`.

## Технології
- **Vite**: швидкий dev-сервер і збірка
- **SWC**: швидка трансформація/мінімізація для React через `@vitejs/plugin-react-swc`
- **Tailwind CSS**: утилітарні класи для стилів
- **Docker**: стандартизована розробка і деплой

## Структура
```
.
├─ src/
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ tailwind.config.ts
├─ postcss.config.js
├─ vite.config.ts
├─ tsconfig.json
├─ vite-env.d.ts
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
└─ README.md
```

## Нотатки
- Скрипт `dev` запускає Vite з `--host 0.0.0.0` для роботи всередині контейнера.
- Tailwind вже налаштовано (директиви у `src/index.css`, `content` в `tailwind.config.ts`).
- Продакшн-збірка копіюється в `nginx:alpine` і сервиться як статика.


