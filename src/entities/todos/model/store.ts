import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo } from '@/entities/todos/types/todo'

export const useTodosStore = defineStore('todos-store', () => {
    const todosList = ref<Todo[]>([])
    const filteredTodos = ref<Todo[]>([])
    const favoritesIds = ref<number[]>([])
    const selectedStatus = ref<string | null>(null)
    const selectedUser = ref<string | null>(null)

    const SET_TODOS_LIST = (payload: Todo[]) => todosList.value = payload
    const SET_FILTERED_TODOS = (payload: Todo[]) => filteredTodos.value = payload

    const SET_FAVORITES_IDS = (payload: number[]) => favoritesIds.value = payload
    const ADD_FAVORITE = (id: number) => favoritesIds.value.push(id)
    const REMOVE_FAVORITE = (id: number) => {
        favoritesIds.value = favoritesIds.value.filter(favId => favId !== id)
    }
    const SET_SELECTED_STATUS = (payload: string | null) => selectedStatus.value = payload
    const SET_SELECTED_USER = (payload: string | null) => selectedUser.value = payload

    return {
        todosList,
        filteredTodos,
        favoritesIds,
        selectedStatus,
        selectedUser,

        SET_TODOS_LIST,
        SET_FILTERED_TODOS,
        SET_FAVORITES_IDS,
        ADD_FAVORITE,
        REMOVE_FAVORITE,
        SET_SELECTED_STATUS,
        SET_SELECTED_USER
    }
})
