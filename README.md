# 📝 Vue 3 Todos App

A small test project built with **Vue 3 + TypeScript + Pinia**.
Implements basic Todo list functionality with API integration, filtering, favorites, and local persistence.

---

## 🚀 Tech stack
- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) — state management
- [Vite](https://vitejs.dev/) — bundler
- [ofetch](https://github.com/unjs/ofetch) — HTTP requests

---

## 📖 Features
- 📌 Fetch Todos from [jsonplaceholder API](https://jsonplaceholder.typicode.com/todos)
- ⭐ Mark/unmark Todos as favorites (saved in `localStorage`)
- 🔍 Search by title
- 🗂 Filter by:
  - **status** (completed / not completed / all)
  - **userId** (specific user / all users)
- 🛠 Global state management via **Pinia**
- 💾 Local persistence with `localStorage`

---

## ⚙️ Setup & Run

```bash
# 1. Clone repository
git clone https://github.com/username/todos-app.git
cd todos-app

# 2. Install dependencies
npm install

# 3. Run in dev mode
npm run dev

# 4. Build for production
npm run build
