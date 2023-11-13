import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../utils/http";

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
	return useMutation({
		mutationFn: async ({ course_code, title, description, units, faculty, semester, level }: any) => {
			try {
				await http.post("/courses", {
					course_code,
					title,
					description,
					units,
					faculty,
					semester,
					level,
				});
			} catch (error) {
				return error;
			}
		},
	});
}

export function useUploadCourseCover(courseCreated = false) {
	return useMutation({
		mutationKey: ["useUploadCourseCover", courseCreated],
		mutationFn: async ({ course_code, file }: any) => {
			console.log(file, course_code)
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
