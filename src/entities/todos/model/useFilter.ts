import { storeToRefs } from 'pinia'
import { useTodosStore } from './store'
import type { SelectItem } from '@/shared/types/selectItem'
import { STATUS_FILTERS } from '@/entities/todos/utils/filters'

export const useFilter = () => {
    const todosStore = useTodosStore()
    const { todosList, favoritesIds, selectedStatus, selectedUser } =
        storeToRefs(todosStore)

    const applyFilters = (searchText: string = '') => {
        let result = [...todosList.value]

        if (selectedStatus.value !== STATUS_FILTERS.ALL) {
            if (selectedStatus.value === STATUS_FILTERS.COMPLETED) {
                result = result.filter(todo => todo.completed)
            }
            if (selectedStatus.value === STATUS_FILTERS.UNCOMPLETED) {
                result = result.filter(todo => !todo.completed)
            }
            if (selectedStatus.value === STATUS_FILTERS.FAVORITES) {
                result = result.filter(todo => favoritesIds.value.includes(todo.id))
            }
        }

        if (selectedUser.value && selectedUser.value !== STATUS_FILTERS.ALL_USERS) {
            result = result.filter(todo => Number(todo.userId) === Number(selectedUser.value))
        }

        if (searchText.trim()) {
            const query = searchText.toLowerCase()
            result = result.filter(todo => todo.title.toLowerCase().includes(query))
        }

        todosStore.SET_FILTERED_TODOS(result)
    }

    const onSelectTodoStatus = (item: SelectItem) => {
        todosStore.SET_SELECTED_STATUS(item.value)
        applyFilters()
    }

    const onSelectUser = (item: SelectItem) => {
        todosStore.SET_SELECTED_USER(item.value)
        applyFilters()
    }

    return {
        onSelectTodoStatus,
        onSelectUser,
        applyFilters,
    }
}
