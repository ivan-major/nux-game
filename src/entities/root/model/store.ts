import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRootStore = defineStore('root-store', () => {
    const isLoading = ref<Boolean>(false)

    const TOGGLE_LOADING_STATUS = () => isLoading.value = !isLoading.value

    return {
        isLoading,

        TOGGLE_LOADING_STATUS,
    }
})