import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import http from "../utils/http";

function useLogin() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async ({ username, password }: { username: string; password: string }) => {
			try {
				const formData = new FormData();

				formData.append("username", username);
				formData.append("password", password);

				const res = await http.post("/login", formData);

				localStorage.setItem("token", res.data.access_token);

				navigate("/lecturer/courses");
			} catch (error) {
				return error;
			}
		},
	});
}

export default useLogin;
