<template>
    <div class="select">
        <div
            class="select__heading"
            tabindex="0"
            @click="onFocusClick"
            @blur="onBlurClick"
        >
            <span class="select__title">
                {{ selectedItem.label }}
            </span>
        </div>

        <ul :class="['select__list', { 'select__list--active': focused }]">
            <li
                v-for="(item, index) in items"
                :key="item.value"
                :class="getItemClasses(item, index)"
                @click="onSelect(item)"
            >
                <slot name="item-icon" />
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Item {
    label: string
    value: string | number
}

const emit = defineEmits(['on-select'])
const props = defineProps<{
    items: Array<Item>
    defaultValue: string
    activeItem?: Item
}>()

const selectedItem = ref({
    ...getInitialItem()
})

const focused = ref(false)

const getItemClasses = (item: Item, index: number) => [
    'select__item',
    { 'select__item--first': !index },
    { 'select__item--last': index + 1 === props.items.length },
    { 'select__item--selected': selectedItem.value.value === item.value }
]

const onSelect = (value: Item) => {
    selectedItem.value = value
    emit('on-select', value)
}

function getInitialItem() {
    if (props.activeItem) {
        return { label: props.activeItem.label, value: props.activeItem.value }
    }

    if (props.defaultValue) {
        return { label: props.defaultValue, value: '' }
    }

    return { label: '', value: '' }
}

const onFocusClick = () => {
    focused.value = !focused.value
}

const onBlurClick = () => {
    focused.value = false
}

watch(() => props.activeItem, () => {
    if (!props.activeItem) return

    selectedItem.value = {
        label: props.activeItem.label,
        value: props.activeItem.value
    }
})
</script>

<style scoped lang="scss">
.select {
    position: relative;

    &__heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding-inline: 12px;
        height: 48px;
        font-weight: 900;
        font-size: 16px;
        line-height: 22px;
        color: $black-400;
        cursor: pointer;
        background: rgba($wait-w, .05);
        border-radius: 5px;
        transition: .3s;

        @media (any-hover: hover) {
            &:hover {
                color: $wait-w;
                background: $black-700;

                :deep(svg) {
                    stroke: $wait-w;
                }
            }
        }

        &:focus {
            color: $wait-w;
            background: $black-700;

            :deep(svg) {
                stroke: $black-100;
            }
        }

        :deep(svg) {
            width: 24px;
            height: 24px;
            transition: .3s;
            stroke: $black-500;
        }
    }

    &__list {
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 2;
        width: 100%;
        max-height: 220px;
        overflow-y: auto;
        visibility: hidden;
        background: $black-900;
        border-radius: 5px;
        opacity: 0;
        transition: .3s;

        &::-webkit-scrollbar {
            display: none;
        }

        &--active {
            visibility: visible;
            opacity: 1;
        }
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 6px;
        height: 40px;
        padding-inline: 12px;
        font-size: 16px;
        line-height: 22px;
        color: $black-400;
        white-space: nowrap;
        cursor: pointer;
        background: rgba($wait-w, .05);
        transition: .3s;

        @media (any-hover: hover) {
            &:hover:not(.select__item--selected) {
                color: $black-100;
                background: $black-700;

                :deep(svg) {
                    stroke: $black-100;
                }
            }
        }

        :deep(svg) {
            width: 24px;
            height: 24px;
            stroke: $black-400;
            transition: .3s;
        }

        &--selected {
            color: $black-900;
            pointer-events: none;
            background: $black-100;

            :deep(svg) {
                stroke: $black-900;
            }
        }

        &--first {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        &--last {
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
        }
    }
}
</style>
