<template>
    <div class="create-todo">
        <div class="create-todo__title">Create todo</div>

        <div class="create-todo__container">
            <div class="create-todo__block">
                <AppInput
                    size="large"
                    :value="titleTodo"
                    placeholder="Create todo"
                    @on-input="handleInput($event)"
                />

                <div class="create-todo__select-user">
                    <AppSelect
                        :items="selectUsersList.form"
                        :defaultValue="selectUsersList.default"
                        :activeItem="selectedUser"
                        @on-select="onSelectUser"
                    />
                </div>
            </div>

            <div class="create-todo__button">
                <AppButton
                    variant="primary"
                    :is-disabled="isDisabledButton"
                    @click="onAddTodo"
                >
                    Add
                </AppButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import AppInput from '@/shared/ui/Inputs/AppInput.vue';
import AppSelect from '@/shared/ui/Inputs/AppSelect.vue';
import AppButton from '@/shared/ui/Buttons/AppButton.vue';

import { apiTodos } from '@/entities/todos/api'

import { useTodosStore } from '@/entities/todos/model/store'
import { useRootStore } from '@/entities/root/model/store'

import { getSelectUsersList } from '@/entities/users/utils/getUsers'
import type { SelectItem } from '@/shared/types/selectItem'

const rootStore = useRootStore()

const todoStore = useTodosStore()
const { todosList, filteredTodos } = storeToRefs(todoStore)

const titleTodo = ref<string>('');
const selectedUser = ref({
    label: 'Select user',
    value: ''
})
const selectUsersList = computed(() => getSelectUsersList())

const isDisabledButton = computed(() => !titleTodo.value.trim().length || !selectedUser.value.value);

const handleInput = (title: string) => {
    titleTodo.value = title;
}

const onSelectUser = (item: SelectItem) => {
    selectedUser.value = item
}

const onAddTodo = async () => {
    rootStore.TOGGLE_LOADING_STATUS()

    const newTodo = {
        title: titleTodo.value,
        completed: false,
        userId: Number(selectedUser.value.value)
    };

    try {
        const response = await apiTodos.postTodo(newTodo);
        todoStore.SET_TODOS_LIST([response, ...todosList.value]);
        todoStore.SET_FILTERED_TODOS([response, ...filteredTodos.value]);
    } catch (error) {
        console.error('Error creating todo:', error);
    } finally {
        titleTodo.value = '';
        selectedUser.value = {
            label: 'Select user',
            value: ''
        };

        rootStore.TOGGLE_LOADING_STATUS()
    }
}
</script>

<style scoped lang="scss">
.create-todo {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 12px;
    border: 1px solid $primary-600;
    border-radius: 5px;

    @media (min-width: $desktop-breakpoint) {
        padding: 20px;
        border-radius: 8px;
    }

    &__container {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
        }
    }

    &__title {
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

    &__block {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
    }

    &__button {
        display: flex;
        justify-content: flex-end;

        @media (min-width: $desktop-breakpoint) {
            flex-shrink: 0;
            width: 100px;
        }
    }
}
</style>