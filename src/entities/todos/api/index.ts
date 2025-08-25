import { apiInstance } from "@/shared/services/api";
import type { NewTodo } from "@/entities/todos/types/todo";

export const apiTodos = {
    getTodos() {
        return apiInstance.fetch(`/todos`)
    },

    postTodo(data: NewTodo) {
        return apiInstance.fetch(`/todos`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }
 };
