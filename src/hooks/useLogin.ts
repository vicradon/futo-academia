import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import http from "../utils/http";

function useLogin() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async ({ username, password }: { username: string; password: string }) => {
			try {
				const res = await http.post("/login", {
					username,
					password,
				});
				return res.data;
			} catch (error) {
				return error;
			}
		},
		onError: (error) => {
			console.log(error);
		},
		onSuccess: () => {
			navigate("/");
		},
	});
}

export default useLogin;
