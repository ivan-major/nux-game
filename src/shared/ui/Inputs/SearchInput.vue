<template>
    <div class="search-input">
        <input
            ref="input"
            v-model="prompt"
            class="search-input__control"
            type="search"
            :placeholder="placeholder"
            @input="handleInput"
        >
        <div class="search-input__icon">
            <IconSearch />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import IconSearch from '@/shared/assets/icons/icon-search.svg'

import { debounce } from '@/shared/utils/helpers.js'
// import { useUsersStore } from '@/views/UsersPage/model/usersStore.js'
// import { storeToRefs } from 'pinia'

// const usersStore = useUsersStore()
// const { usersList } = storeToRefs(usersStore)
// const basedUsersList = usersList.value
const emit = defineEmits(['search-input'])

defineProps<{
    placeholder: string
}>()

const input = ref(null)
const prompt = ref('')

const handleInput = debounce(async () => {
    const string = prompt.value.trim()

    // if (!string || string.length < 3) {
    //     // usersStore.SET_USERS_LIST(basedUsersList)
    //     return
    // }

    emit('search-input', string)

    // const usersFiltered = usersList.value.filter(user => user.name.toLowerCase().includes(string.toLowerCase()))
    // usersStore.SET_USERS_LIST(usersFiltered)
})

// onMounted(() => input.value.focus())
</script>

<style scoped lang="scss">
.search-input {
    position: relative;

    &__icon {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;

        @media (min-width: $tablet-breakpoint) {
            width: 32px;
            height: 32px;
        }

        @media (min-width: $desktop-breakpoint) {
            width: 40px;
            height: 40px;
        }

        :deep(svg) {
            width: 100%;
            height: 100%;
            stroke: $primary-500;
        }
    }

    &__control {
        width: 100%;
        height: 40px;
        padding-right: 32px;
        font-size: 18px;
        font-weight: 900;
        line-height: 140%;
        color: $wait-w;
        background: $black-900;
        border: none;
        border-bottom: 2px solid $primary-200;
        outline: none;
        caret-color: $primary-500;
        transition: .3s;
    
        @media (min-width: $tablet-breakpoint) {
            height: 48px;
            padding-right: 40px;
            font-size: 20px;
            line-height: 120%;
            background-size: 32px 32px;
            border-bottom-width: 3px;
        }
    
        @media (min-width: $desktop-breakpoint) {
            height: 80px;
            padding-right: 48px;
            font-size: 32px;
            line-height: 110%;
            background-size: 40px 40px;
            border-bottom-width: 4px;
        }
    
        &::-webkit-search-cancel-button {
            display: none;
        }
    
        &:focus {
            border-color: $wait-w;
        }
    
        &:not(:focus):not(:placeholder-shown) {
            border-color: $primary-500;
        }
    }
}
</style>