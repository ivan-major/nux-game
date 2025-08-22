
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodosStore } from './store'

export const useFavoritesIds = () => {
    const todosStore = useTodosStore()
    const { favoritesIds } = storeToRefs(todosStore)

    const loadFavorites = () => {
        const favorites = localStorage.getItem('favorites')
        if (favorites) {
            todosStore.SET_FAVORITES_IDS(JSON.parse(favorites))
        }
    }

    const toggleFavorite = (id: number) => {
        if (favoritesIds.value.includes(id)) {
            todosStore.REMOVE_FAVORITE(id)
        } else {
            todosStore.ADD_FAVORITE(id)
        }
    }

    const isFavorite = (id: number) => favoritesIds.value.includes(id)

    watch(favoritesIds, (newFavorites) => {
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }, { deep: true })

    return {
        loadFavorites,
        toggleFavorite,
        isFavorite
    }
}
