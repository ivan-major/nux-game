import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import HomePage from '@/views/Home/HomePage.vue'
import TodoListPage from '@/views/TodoList/TodoListPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/todos', component: TodoListPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
