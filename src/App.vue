<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';

import { useRootStore } from '@/entities/root/model/store';

import AppPreloader from '@/shared/ui/Loaders/AppPreloader.vue'

const rootStore = useRootStore()
const { isLoading } = storeToRefs(rootStore)
</script>

<template>
  <AppPreloader v-if="isLoading" />
  <RouterView />
</template>

<style lang="scss">
@import '@/assets/styles/global.scss';
</style>
