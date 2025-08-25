<template>
    <div class="todo-list">
        <TodoListHeader :user="userData" />

        <TodoListBody />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import TodoListHeader from './ui/TodoListHeader.vue'
import TodoListBody from './ui/TodoListBody.vue'

import { apiTodos } from '@/entities/todos/api'

import { useRootStore } from '@/entities/root/model/store'
import { useUserStore } from '@/entities/users/model/store'
import { useTodosStore } from '@/entities/todos/model/store'

import { useFavoritesIds } from '@/entities/todos/model/useFavoritesIds'

const rootStore = useRootStore()
const userStore = useUserStore()
const todoStore = useTodosStore()

const { userData } = storeToRefs(userStore)

const favorites = useFavoritesIds()

onMounted(async () => {
    rootStore.TOGGLE_LOADING_STATUS()

    try {
        const response = await apiTodos.getTodos()
        favorites.loadFavorites()
        todoStore.SET_TODOS_LIST(response)
        todoStore.SET_FILTERED_TODOS(response)
    } catch (error) {
        console.error('Error fetching todos:', error)
    } finally {
        rootStore.TOGGLE_LOADING_STATUS()
    }
})
</script>

<style scoped lang="scss">
.todo-list {
    max-width: $lg-desktop-breakpoint;
    margin: 0 auto;
}
</style>