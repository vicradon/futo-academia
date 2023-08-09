import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../utils/http";

function useSignUp() {
	const navigate = useNavigate();
	const notify = () => toast("one step closer");
	return useMutation({
		mutationFn: async ({ name, regNo, faculty, department, email }: { name: string; regNo: string; faculty: string; department: string; email: string }) => {
			try {
				const formData = { name, regNo, faculty, department, email };

				const res = await http.post("/users", formData);

				navigate("/lecturer/courses");
			} catch (error) {
				return error;
			}
		},
		onSuccess: (data) => console.log("Success data", data),
	});
}
export default useSignUp;
