import { storeToRefs } from 'pinia'
import { useTodosStore } from '@/entities/todos/model/store'
import { useUserStore } from '@/entities/users/model/store'

export const filterTodosByStatus = {
    all: [
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Uncompleted', value: 'uncompleted' },
        { label: 'Favorites ', value: 'favorites' }
    ],
    default: 'all'
}

export const getUsersList = () => {
    const todoStore = useTodosStore()
    const userStore = useUserStore()
    const { todosList } = storeToRefs(todoStore)
    const { usersList } = storeToRefs(userStore)

    return {
        all: [
            { label: 'All', value: 'all' },
            ...todosList.value.map(todo => ({
                label: usersList.value.find(user => user.id === todo.userId)?.name || 'Unknown',
                value: todo.userId
            })).filter((user, index, self) =>
                index === self.findIndex((u) => u.value === user.value)
            )
        ],
        default: 'all'
    }
}