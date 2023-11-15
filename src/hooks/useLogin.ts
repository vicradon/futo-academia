import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";

function useLogin() {
	const toast = useToast()
	return useMutation({
		mutationFn: async ({ username, password }: { username: string; password: string }) => {
			try {
				const formData = new FormData();

				formData.append("username", username);
				formData.append("password", password);

				const res = await http.post("/login", formData);

				console.log("ress", res);

				localStorage.setItem("token", res.data.access_token);

				window.location.href = "/student/home";
			} catch (error: any) {
				if (error?.response){
					toast({
						title: 'Error',
						description: error.response.data.detail,
						status: 'error',
						position: 'top',
						duration: 3000,
						isClosable: true,
					  });
				}
				return error;
			}
		},
		onSuccess: (data) => console.log("Login data", data),
		onError: (err) => console.log("Data error", err),
	});
}

export default useLogin;
