import { apiInstance } from "@/shared/services/api";

export const apiUsers = {
	getUsers() {
		return apiInstance.fetch(`/users`)
	},
};
