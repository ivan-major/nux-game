<template>
    <div class="app-input">
        <input
            v-bind="$attrs"
            :class="classes"
            :value="value"
            @input="onInput"
            @change="onChange"
        >
        <p v-if="isError" class="app-input__error">{{ errors[0].$message }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Size = 'medium' | 'large'

interface Props {
  size: Size
  value: string | number
  errors: Record<string, any>
  isError?: boolean
  isSuccess?: boolean
}


const props = defineProps<Props>()
const emit = defineEmits(['on-input', 'on-change'])

const classes = computed(() => [
    `size-${ props.size }`,
    { 'is-error': props.isError },
    { 'is-success': props.isSuccess }
])

const onInput = (event: Event) => emit('on-input', (event.target as HTMLInputElement).value)
const onChange = (event: Event) => emit('on-change', (event.target as HTMLInputElement).value)
</script>

<style scoped lang="scss">
input {
    width: 100%;
    font: inherit;
    font-weight: 700;
    color: $black;
    background-color: $wait-w;
    background-repeat: no-repeat;
    background-position: calc(100% - 14px) center;
    background-size: 24px 24px;
    // border: 2px solid $primary-200;
		border: none;
    border-radius: 5px;
    transition: .3s;
    caret-color: $primary-500;

    &[type='number'] {
        appearance: none;
        text-align: center;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            appearance: none;
        }

        &.is-error {
            background-image: none;
        }
    }

    &::placeholder {
        font: inherit;
        color: $black;
        transition: .3s;
    }

    &:focus,
    &:not(.is-disabled):hover {
        box-shadow: 0 0 0 3px rgba($primary-500, .5);

        &::placeholder {
            color: $primary-500;
        }
    }

    &::selection {
        background: $global-selection-color;
    }

    &.size-medium {
        height: 40px;
        padding: 10px;
        font-size: 16px;
        line-height: 22px;

        // &[type='number'] {
        //     width: 48px;
        //     padding-inline: 4px;
        // }
    }

    &.size-large {
        height: 41px;
        padding: 10px;
        font-size: 17px;
        line-height: 21px;

        // &[type='number'] {
        //     width: 56px;
        //     padding-inline: 6px;
        // }
    }

    &.is-error {
        color: $destructive-400;
        background-image: url('@/shared/assets/background/icon-input-error.svg');
        border-color: $destructive-400;

        &::placeholder {
            color: $destructive-400;
        }
    }

    &.is-success {
        background-image: url('@/shared/assets/background/icon-success.svg');
    }
}

.app-input {
    position: relative;

    &__error {
        position: absolute;
        bottom: -20px;
        font-size: 10px;
        color: $destructive-400;

        @media (min-width: $desktop-breakpoint) {
            font-size: 12px;
        }
    }
}
</style>
