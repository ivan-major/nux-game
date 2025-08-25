import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodosStore } from '@/entities/todos/model/store'
import { useUserStore } from '@/entities/users/model/store'
import { STATUS_FILTERS } from '@/entities/todos/utils/filters'

export const getSelectUsersList = () => {
    const todoStore = useTodosStore()
    const userStore = useUserStore()
    const { todosList } = storeToRefs(todoStore)
    const { usersList } = storeToRefs(userStore)

    const users = computed(() => todosList.value.map(todo => ({
        label: usersList.value.find(user => user.id === todo.userId)?.name || 'Unknown',
        value: todo.userId
    })).filter((user, index, self) =>
        index === self.findIndex((u) => u.value === user.value)
    ))

    return {
        all: [
            { label: 'All', value: STATUS_FILTERS.ALL_USERS },
            ...users.value
        ],
        form: users.value,
        default: STATUS_FILTERS.ALL_USERS
    }
}
