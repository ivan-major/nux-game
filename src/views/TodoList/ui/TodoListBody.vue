<template>
    <div class="todo-list-body">
        <div class="todo-list-body__panel">
            <div class="todo-list-body__filters">
                <div class="todo-list-body__filters-title">Filters</div>

                <div class="todo-list-body__filters-block">
                    <div class="todo-list-body__filter">
                        <div class="todo-list-body__filter-label">Status:</div>

                        <AppSelect
                            :items="FILTER_TODOS_BY_STATUS.ALL"
                            :defaultValue="FILTER_TODOS_BY_STATUS.DEFAULT"
                            :activeItem="activeStatusFilter"
                            @on-select="onSelectFilter($event, FILTERS_TYPE.STATUS_FILTER)"
                        />
                    </div>

                    <div class="todo-list-body__filter">
                        <div class="todo-list-body__filter-label">User:</div>

                        <AppSelect
                            :items="selectUsersList.all"
                            :defaultValue="selectUsersList.default"
                            :activeItem="selectedUser"
                            @on-select="onSelectFilter($event, FILTERS_TYPE.USER_FILTER)"
                        />
                    </div>
                </div>
            </div>

            <div class="todo-list-body__search">
                <SearchInput placeholder="Search todos..." @search-input="handleSearchInput" />
            </div>
        </div>

        <CreateTodo />

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
import CreateTodo from '@/views/TodoList/ui/CreateTodo.vue'

import { useTodosStore } from '@/entities/todos/model/store'
import { useFilter } from '@/entities/todos/model/useFilter'

import { getSelectUsersList } from '@/entities/users/utils/getUsers'
import { FILTER_TODOS_BY_STATUS, FILTERS_TYPE, STATUS_FILTERS } from '@/entities/todos/utils/filters'

import type { SelectItem } from '@/shared/types/selectItem'

const todoStore = useTodosStore()
const { filteredTodos } = storeToRefs(todoStore)

const { applyFilters } = useFilter()

const activeStatusFilter = ref({
    label: 'All',
    value: STATUS_FILTERS.ALL
})
const selectedUser = ref({
    label: 'All',
    value: STATUS_FILTERS.ALL_USERS
})

const selectUsersList = computed(() => getSelectUsersList())

const onSelectFilter = (item: SelectItem, filterType: string) => {
    if (filterType === FILTERS_TYPE.STATUS_FILTER) {
        activeStatusFilter.value = item
        todoStore.SET_SELECTED_STATUS(item.value)
    }
    if (filterType === FILTERS_TYPE.USER_FILTER) {
        selectedUser.value = item
        todoStore.SET_SELECTED_USER(item.value)
    }

    applyFilters()
}

const handleSearchInput = (text: string) => {
  applyFilters(text)
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
        width: 100%;
        padding: 12px;
        border: 1px solid $primary-600;
        border-radius: 5px;

        @media (min-width: $desktop-breakpoint) {
            padding: 20px;
            border-radius: 8px;
        }
    }

    &__filters-block {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;

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

    &__filters-title {
        font-size: 20px;
        font-weight: 700;
        line-height: 24px;
        color: $black-100;
        text-align: center;

        @media (min-width: $tablet-breakpoint) {
            font-size: 24px;
            line-height: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 28px;
            line-height: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 32px;
            line-height: 36px;
        }
    }

    &__filter-label {
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        color: $black-100;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
            line-height: 24px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
            line-height: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
            line-height: 28px;
        }
    }
}
</style>