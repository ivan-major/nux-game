<template>
	<div class="home-page">
		<HomePageAuth />
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { apiUsers } from '@/entities/users/api'

import { useRootStore } from '@/entities/root/model/store'
import { useUserStore } from '@/entities/users/model/store'

import HomePageAuth from '@/views/Home/HomePageAuth/HomePageAuth.vue'

const userStore = useUserStore()
const rootStore = useRootStore()

const { usersList } = storeToRefs(userStore)

onMounted(async () => {
	rootStore.TOGGLE_LOADING_STATUS()

	try {
		const response = await apiUsers.getUsers()
		userStore.SET_USERS_LIST(response)
	} catch (error) {
		console.error('Error fetching users:', error)
	}

	rootStore.TOGGLE_LOADING_STATUS()
})
</script>

<style scoped>
.home-page {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	padding-inline: 20px;
}
</style>