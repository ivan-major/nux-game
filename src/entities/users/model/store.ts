import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserData } from '@/entities/users/types/user'

export const useUserStore = defineStore('user-store', () => {
    const usersList = ref<UserData[]>([])
    const userData = ref({} as UserData)

    const SET_USERS_LIST = (payload: UserData[]) => usersList.value = payload
    const SET_USER_DATA = (payload: UserData) => userData.value = payload

    return {
        userData,
        usersList,

        SET_USER_DATA,
        SET_USERS_LIST,
    }
})