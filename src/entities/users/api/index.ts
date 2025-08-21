import { apiInstance } from "@/shared/services/api";

export const apiUsers = {
	getUsers() {
		return apiInstance.fetch(`/users`)
	},

	getUserId(id: number) {
		return apiInstance.fetch(`/users/${id}`)
	},
};
