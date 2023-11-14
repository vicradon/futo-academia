import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";

export function useFetchCourses(semester: number) {
	return useQuery({
		queryKey: ["useFetchCourses", semester],
		queryFn: async () => {
			const { data } = await http.get(`/courses/enrollments?semester=${semester}`);
			return data;
		},
	});
}

export function useCreateCourse() {
	const toast = useToast()
	return useMutation({
		mutationFn: async ({ course_code, title, description, units, faculty, semester, level }: any) => {
			try {
				const response = await http.post("/courses", {
					course_code,
					title,
					description,
					units,
					faculty,
					semester,
					level,
				});
				return response
			} catch (error: any) {
				console.log(error.response.data.detail)
				if (error?.response) {
					toast({
						status: "error",
						description: error.response.data.detail,
						position: "top"
					})
				}
				throw error;
			}
		},
	});
}

export function useUploadCourseCover(courseCreated = false) {
	return useMutation({
		mutationKey: ["useUploadCourseCover", courseCreated],
		mutationFn: async ({ course_code, file }: any) => {
			try {
				const formData = new FormData();
				formData.append("file", file);
				await http.put(`/courses/${course_code}/photo`, formData);
			} catch (error) {
				return error;
			}
		},
	});
}
