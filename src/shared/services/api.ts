import { headersWithCredentials } from "@/shared/utils/apiHeaders";

import { ofetch } from "ofetch";

export const apiInstance = {
	fetch: ofetch.create({
		baseURL: import.meta.env.VITE_API_BASE,
		headers: headersWithCredentials as HeadersInit,
		credentials: "include",
	}),
}
