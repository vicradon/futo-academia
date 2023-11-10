import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";

export const useUser = () => {
	const tokenCheck =  localStorage.getItem("token")
	if (!tokenCheck) {
		window.location.href = "/"
	}
	
	try {
		const { isLoading, data, error, isError } = useQuery(["user_by_id"], () => http.get("/users"), {
			enabled: true,
			onError: (error: any) => {
				if (error.response.status === 401) {
					localStorage.clear()
					window.location.href = "/"
				}
			},
			onSuccess() {
				// console.log("user data", data);
			},
		});
		if (isError) {
			console.log("bleblobab", error)
		}
		return { isLoading, ...data?.data };
	}
	catch (error: any) {
		console.log("error baba", error)
	}

};
