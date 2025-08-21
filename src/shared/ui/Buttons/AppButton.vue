<template>
    <button
        :class="classes"
        :disabled="isDisabled"
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['on-click'])
const props = defineProps<{
    isDisabled?: boolean
}>()

const classes = computed(() => [
    'button',
    { 'button--disabled': props.isDisabled }
])

const onClick = () => emit('on-click')
</script>

<style scoped lang="scss">
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-shrink: 0;
    width: 100%;
    font-family: $global-font-family;
    font-weight: 700;
    cursor: pointer;
    border: 0;
    border-radius: 5px;
    transition: .3s;
    height: 41px;
    padding: 10px 30px;
    font-size: 17px;
    line-height: 21px;
    color: $wait-w;
    background: $green;

    :deep(svg) {
        width: 24px;
        height: 24px;
        stroke: $primary-300;
    }

    // @media (min-width: $tablet-breakpoint) {
    //     height: 32px;
    //     padding: 10px 24px;
    //     font-size: 14px;
    //     line-height: 140%;

    //     :deep(svg) {
    //         width: 20px;
    //         height: 20px;
    //     }
    // }

    // @media (min-width: $desktop-breakpoint) {
    //     height: 41px;
    //     padding: 10px 30px;
    //     font-size: 17px;
    //     line-height: 21px;

    //     :deep(svg) {
    //         width: 24px;
    //         height: 24px;
    //     }
    // }

    @media (any-hover: hover) {
        &:hover {
            background: $primary-600;

            :deep(svg) {
                stroke: $wait-w;
            }
        }
    }

    // &--wait-5 {
    //     color: $black-400;
    //     background: rgba($wait-w, .05);

    //     @media (any-hover: hover) {
    //         &:hover {
    //             color: $black-100;
    //             background: $black-700;
    //         }
    //     }

    //     :deep(svg) {
    //         stroke: $black-500;
    //     }
    // }

    // &--primary {
    //     color: $wait-w;
    //     background: $primary-500;

    //     @media (any-hover: hover) {
    //         &:hover {
    //             background: $primary-600;

    //             :deep(svg) {
    //                 stroke: $wait-w;
    //             }
    //         }
    //     }

    //     :deep(svg) {
    //         stroke: $primary-300;
    //     }
    // }

    &--disabled {
        color: $black-500;
        pointer-events: none;
        background: transparent;
        border: 1px solid $black-700;

        :deep(svg) {
            stroke: $black-500;
        }
    }

    :deep(svg) {
        transition: .3s;
    }
}
</style>
