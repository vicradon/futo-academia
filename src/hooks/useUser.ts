import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";

export const useUser = () => {
	const { isLoading, data, error, isError } = useQuery(["user_by_id"], () => http.get("/users"), {
		enabled: true,
		onError: (error) => {
			console.log("error", error);
		},
		onSuccess() {
			// console.log("user data", data);
		},
	});
	if (isError) {
		console.log(error)
	}

	return { isLoading, ...data?.data };
};
