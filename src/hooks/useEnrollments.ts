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

export function useMakeEnrollRequest() {
	return useMutation({
		mutationKey: ["makeEnrollmentRequest"],
		mutationFn: async ({ course_code, reg_num }: any) => {
			try {
				await http.post("/students/enroll_request", {"course_code": course_code, "reg_num": reg_num});
			} catch (error) {
				return error;
			}
		},
	});
}

export function useApproveEnrollment() {
	return useMutation({
		mutationKey: ["approveEnrollment"],
		mutationFn: async ({ course_code, reg_num }: any) => {
			try {
				await http.put(`/students/approve_enrollment/${course_code}/${reg_num}`, {"course_code": course_code, "reg_num": reg_num});
			} catch (error) {
				return error;
			}
		},
	});
}
