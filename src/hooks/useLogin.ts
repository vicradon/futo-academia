import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";

function useLogin() {
	return useMutation({
		mutationFn: async ({ username, password }: { username: string; password: string }) => {
			try {
				const formData = new FormData();

				formData.append("username", username);
				formData.append("password", password);

				const res = await http.post("/login", formData);

				console.log("ress", res);

				localStorage.setItem("token", res.data.access_token);

				window.location.href = "/lecturer/courses";
			} catch (error) {
				return error;
			}
		},
		onSuccess: (data) => console.log("Login data", data),
		onError: (err) => console.log("Data error", err),
	});
}

export default useLogin;
