import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo } from '@/entities/todos/types/todo'

export const useTodosStore = defineStore('todos-store', () => {
    const todosList = ref<Todo[]>([])
    const filteredTodos = ref<Todo[]>([])
    const favoritesIds = ref<number[]>([])

    const SET_TODOS_LIST = (payload: Todo[]) => todosList.value = payload
    const SET_FILTERED_TODOS = (payload: Todo[]) => filteredTodos.value = payload
    const SET_FAVORITES_IDS = (payload: number[]) => favoritesIds.value = payload
    const ADD_FAVORITE = (id: number) => favoritesIds.value.push(id)
    const REMOVE_FAVORITE = (id: number) => {
        favoritesIds.value = favoritesIds.value.filter(favId => favId !== id)
    }

    return {
        todosList,
        filteredTodos,
        favoritesIds,

        SET_TODOS_LIST,
        SET_FILTERED_TODOS,
        SET_FAVORITES_IDS,
        ADD_FAVORITE,
        REMOVE_FAVORITE
    }
})
