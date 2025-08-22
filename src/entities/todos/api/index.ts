import { apiInstance } from "@/shared/services/api";

export const apiTodos = {
    getTodos() {
        return apiInstance.fetch(`/todos`)
    },
};
