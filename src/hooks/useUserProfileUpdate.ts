import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import { useToast } from "@chakra-ui/react";

export function useUploadPhoto() {
	const toast = useToast()
	return useMutation({
		mutationFn: async ({ id, file }: any) => {
			try {
				const formData = new FormData();
				formData.append('file', file);
				const res = await http.put(`users/${id}/photo`, formData, {
					headers: {
					  'Content-Type': 'multipart/form-data',
					},
				  });
				  toast({
					status: "success",
					description: "Profile photo updated",
					position: "top"
				})
				  return res.data
			} catch (error) {
				toast({
					status: "info",
					description: "Could not update profile photo",
					position: "top"
				})
				return error;
			}
		},
	});
}

export function useProfileUpdate() {
	const toast = useToast()
	return useMutation({
		mutationFn: async ({ id, title, name, email, department, faculty, major, bio }: any) => {
			try {
				const res = await http.put(`users/${id}`, {
					title: title,
					name: name,
					email: email,
					department: department,
					faculty: faculty,
					major: major,
					bio: bio,
				});
				  toast({
					status: "success",
					description: "Profile updated",
					position: "top"
				})
				  return res.data
			} catch (error) {
				toast({
					status: "info",
					description: "Could not update profile.",
					position: "top"
				})
				return error;
			}
		},
	});
}