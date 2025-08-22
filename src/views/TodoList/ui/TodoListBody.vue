<template>
    <div class="todo-list-body">
        <div class="todo-list-body__panel">
            <div class="todo-list-body__filters">
                <div class="todo-list-body__filter">
                    <div class="todo-list-body__filter-label">Status:</div>
                    <AppSelect
                        :items="filterTodosByStatus.all"
                        :defaultValue="filterTodosByStatus.default"
                        :activeItem="activeStatusFilter"
                        @on-select="onSelectTodoStatus"
                    />
                </div>
                <div class="todo-list-body__filter">
                    <div class="todo-list-body__filter-label">User:</div>
                    <AppSelect
                        :items="selectUsersList.all"
                        :defaultValue="selectUsersList.default"
                        :activeItem="selectedUser"
                        @on-select="onSelectUser"
                    />
                </div>
            </div>
            <div class="todo-list-body__search">
                <SearchInput placeholder="Search todos..." @search-input="handleSearchInput" />
            </div>
        </div>
        <div class="todo-list-body__list">
            <TodoItem
                v-for="todo in filteredTodos"
                :key="todo.id"
                :todo="todo"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import TodoItem from '@/entities/todos/ui/TodoItem.vue'
import AppSelect from '@/shared/ui/Inputs/AppSelect.vue'
import SearchInput from '@/shared/ui/Inputs/SearchInput.vue'

import { useTodosStore } from '@/entities/todos/model/store'
import { filterTodosByStatus, getUsersList } from '@/entities/todos/utils/filters'

interface SelectItem {
    label: string
    value: string
}

const todoStore = useTodosStore()
const { todosList, filteredTodos, favoritesIds } = storeToRefs(todoStore)

const activeStatusFilter = ref({
    label: 'All',
    value: 'all'
})
const selectedUser = ref({
    label: 'All',
    value: 'all'
})

const selectUsersList = getUsersList()

const onSelectTodoStatus = (item: SelectItem) => {
    activeStatusFilter.value = item

    if (item.value === 'uncompleted') {
        filteredTodos.value = todosList.value.filter(todo => !todo.completed)
        return
    }

    if (item.value === 'completed') {
        filteredTodos.value = todosList.value.filter(todo => todo.completed)
        return
    }

    if (item.value === 'favorites') {
        filteredTodos.value = todosList.value.filter(todo => favoritesIds.value.includes(todo.id))
        return
    }

    filteredTodos.value = todosList.value
}

const onSelectUser = (item: SelectItem) => {
    selectedUser.value = item

    if (item.value === 'all') {
        filteredTodos.value = todosList.value
        return
    }

    filteredTodos.value = todosList.value.filter(todo => Number(todo.userId) === Number(item.value))
}

const handleSearchInput = (value: string) => {
    if (!value || value.length < 3) {
        filteredTodos.value = todosList.value
        return
    }

    filteredTodos.value = todosList.value.filter(todo => todo.title.toLowerCase().includes(value.toLowerCase()))
}

</script>

<style scoped lang="scss">
.todo-list-body {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
    }

    @media (min-width: $desktop-breakpoint) {
        gap: 60px;
        padding: 40px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 40px 0;
    }

    &__panel {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
            align-items: end;
            gap: 60px;
        }
    }

    &__filters {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        padding: 12px;
        border: 1px solid $primary-600;
        border-radius: 5px;

        @media (min-width: $tablet-breakpoint) {
            flex-direction: row;
            gap: 20px;
            padding: 16px;
        }
    }

    &__search {
        width: 100%;
    }

    &__filter {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            gap: 14px;
        }

        @media (min-width: $desktop-breakpoint) {
            gap: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 24px;
        }
    }
}
</style>