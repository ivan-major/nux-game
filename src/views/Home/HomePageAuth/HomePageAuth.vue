<template>
	<div class="auth-form">
		<div class="auth-form__header">
			<h1 class="auth-form__title">Login</h1>
		</div>
		<div class="auth-form__body">
			<div class="auth-form__inputs">
				<AppInput
					size="large"
					:value="fields.userName"
					:is-error="v$.userName.$error"
					:errors="v$.userName.$errors"
					placeholder="User name"
					@on-input="handleInput($event, 'userName')"
                    @on-change="validate('userName')"
				/>
				<AppInput
					size="large"
					:value="fields.phoneNumber"
					:errors="v$.phoneNumber.$errors"
					:is-error="v$.phoneNumber.$error"
					placeholder="Phone number"
					@on-input="handleInput($event, 'phoneNumber')"
                    @on-change="validate('phoneNumber')"
				/>
			</div>
			<div class="auth-form__button">
				<AppButton
					variant="primary"
					:is-disabled="isDisabledButton"
					@click="onLogin"
				>
					Login
				</AppButton>
				<p v-if="isUserNotFound" class="auth-form__error">User not found</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useVuelidate } from '@vuelidate/core'

import AppInput from '@/shared/ui/Inputs/AppInput.vue';
import AppButton from '@/shared/ui/Buttons/AppButton.vue';

import { useUserStore } from '@/entities/users/model/store'
import { returnAuthFormRules } from './utils/auth-form-rules';

const userStore = useUserStore()
const { usersList } = storeToRefs(userStore)
const router = useRouter()

const fields = ref({
	userName: '',
	phoneNumber: ''
})
const isLogging = ref(false)
const isUserNotFound = ref(false)

const isDisabledButton = computed(() => !fields.value.userName || !fields.value.phoneNumber || isLogging.value)
const rules = computed(() => returnAuthFormRules())

const v$ = useVuelidate(rules, fields)
const handleInput = (value: string, key: 'userName' | 'phoneNumber') => {
	fields.value[key] = value
	isUserNotFound.value = false
}
const validate = (key: 'userName' | 'phoneNumber') => v$.value[key].$touch()

const onLogin = () => {
	isLogging.value = true

	if (v$.value.$invalid) {
		isLogging.value = false
		return
	}

	const user = usersList.value.find(user => user.username === fields.value.userName && user.phone === fields.value.phoneNumber)

	if (user) {
		userStore.SET_USER_DATA(user)
		router.push('/todos')
	} else {
		isUserNotFound.value = true
	}

	isLogging.value = false
}
</script>

<style scoped lang="scss">
.auth-form {
	width: 100%;
	max-width: 447px;
	border-radius: 5px;
	background-color: $grey-100;
	overflow: hidden;

	&__header {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
		height: 51px;
		background-color: $grey-200;
	}

	&__title {
		font-size: 17px;
		font-weight: 700;
		line-height: 21px;
		color: $grey-300;
	}

	&__body {
		display: flex;
		flex-direction: column;
		gap: 30px;
		padding: 30px 20px;

		@media (min-width: $desktop-breakpoint) {
			gap: 40px;
			padding: 40px 30px;
		}
	}

	&__inputs {
		display: flex;
		flex-direction: column;
		gap: 30px;

		@media (min-width: $desktop-breakpoint) {
			gap: 40px;
		}
	}

	&__button {
		position: relative;
	}

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