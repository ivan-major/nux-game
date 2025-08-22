<template>
    <div class="todo-list-header">
        <div class="todo-list-header__container">
            <div class="todo-list-header__block">
                <div class="todo-list-header__icon">
                    <IconUser />
                </div>

                <div class="todo-list-header__title">{{ user.name }}</div>
            </div>

            <div class="todo-list-header__block">
                <div class="todo-list-header__icon">
                    <IconCompany />
                </div>

                <div class="todo-list-header__title">{{ user.company.name }}</div>
            </div>
        </div>

        <div class="todo-list-header__container">
            <div class="todo-list-header__block">
                <div class="todo-list-header__icon">
                    <IconEmail />
                </div>

                <a :href="`mailto:${user.email}`" class="todo-list-header__title">{{ user.email }}</a>
            </div>

            <div class="todo-list-header__block">
                <div class="todo-list-header__icon">
                    <IconPhone />
                </div>

                <a :href="`tel:${user.phone}`" class="todo-list-header__title">{{ user.phone }}</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { UserData } from '@/entities/users/types/user'

import IconCompany from '@/shared/assets/icons/icon-company.svg'
import IconEmail from '@/shared/assets/icons/icon-email.svg'
import IconPhone from '@/shared/assets/icons/icon-phone.svg'
import IconUser from '@/shared/assets/icons/icon-user.svg'

defineProps<{
    user: UserData
}>()
</script>

<style scoped lang="scss">
.todo-list-header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 20px;
    background-color: $black-850;

    @media (min-width: $tablet-breakpoint) {
        gap: 14px;
        padding: 30px;
    }

    &__container {
        display: flex;
        flex-direction: column;
        gap: 16px;

        @media (min-width: $desktop-breakpoint) {
            flex-direction: row;
            gap: 30px;
        }
    }

    &__block {
        display: flex;
        align-items: center;
        gap: 10px;

        @media (min-width: $tablet-breakpoint) {
            gap: 14px;
        }

        a {
            text-decoration: none;
            transition: all 0.3s;

            @media (hover: hover) {
                &:hover {
                    color: $primary-600;
                }
            }
        }
    }

    &__icon{
        width: 20px;
        height: 20px;
        fill: $primary-600;
        stroke: $primary-600;

        @media (min-width: $desktop-breakpoint) {
            width: 24px;
            height: 24px;
        }
    }

    &__title {
        font-size: 14px;
        line-height: 20px;
        color: $black-100;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
            line-height: 24px;
        }
    }
}
</style>