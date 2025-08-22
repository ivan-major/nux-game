import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo } from '@/entities/todos/types/todo'

export const useTodosStore = defineStore('todos-store', () => {
    const todosList = ref<Todo[]>([])

    const SET_TODOS_LIST = (payload: Todo[]) => todosList.value = payload

    return {
        todosList,

        SET_TODOS_LIST,
    }
})
