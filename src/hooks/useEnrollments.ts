import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";

export function useEnrollStudents(courseCreated = false) {
	return useMutation({
		mutationKey: ["useEnrollStudents", courseCreated],
		mutationFn: async ({ file, course_code }: any) => {
			try {
				const formData = new FormData();

				formData.append("course_code", course_code);
				formData.append("file", file);

				await http.post("/students", formData);
			} catch (error) {
				return error;
			}
		},
	});
}
