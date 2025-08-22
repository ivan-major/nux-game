<template>
    <div class="todo-item">
        <p :class="titleClasses">{{ props.todo.title }}</p>
        <div :class="favoriteClasses" @click="toggleFavorite">
            <IconFavorite />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Todo } from '@/entities/todos/types/todo'
import IconFavorite from '@/shared/assets/icons/icon-favorite.svg'
import { useFavoritesIds } from '@/entities/todos/model/useFavoritesIds'

const props = defineProps<{
    todo: Todo
}>()

const favorites = useFavoritesIds()

const titleClasses = computed(() => [
    'todo-item__title',
    { 'todo-item__title---completed': props.todo.completed }
])

const favoriteClasses = computed(() => [
    'todo-item__icon',
   { 'todo-item__icon--favorite': favorites.isFavorite(props.todo.id) }
])

const toggleFavorite = () => {
    favorites.toggleFavorite(props.todo.id)
}

</script>

<style scoped lang="scss">
.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 12px;
    border: 1px solid $primary-500;
    border-radius: 5px;

    @media (min-width: $desktop-breakpoint) {
        gap: 16px;
        padding: 16px;
        border-radius: 10px;
    }


    &__title {
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
            line-height: 24px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
            line-height: 28px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 24px;
            line-height: 32px;
        }

        &---completed {
            text-decoration: line-through;
            color: $black-700;
        }
    }

    &__icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        fill: $black-100;
        stroke: $black-100;
        cursor: pointer;

        @media (min-width: $tablet-breakpoint) {
            width: 24px;
            height: 24px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 28px;
            height: 28px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: 32px;
            height: 32px;
        }

        &--favorite {
            fill: $primary-500;
            stroke: $primary-500;
        }
    }
}
</style>