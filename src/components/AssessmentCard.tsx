import { Box, Text, Button } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

import http from "../utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@chakra-ui/react";

export default function AssessmentCard({ is_active, title, start_date, id, idx, is_marked, is_completed, overAllClick, setExamSetUp }: Partial<any>) {
	const navigate = useNavigate();
	const user = useUser();
	const toast = useToast();
	const queryClient = useQueryClient();

	const markMutation = useMutation({
		mutationFn: (id) => {
			return http.post(`/marks/${id}/`);
		},
		onSuccess: () => {
			toast({ title: "Sucessfully mark", variant: "solid" });
			queryClient.invalidateQueries({ queryKey: ["getassesments"] });
		},
		onError: (err: any) => {
			console.log("toast err", err);
			toast({ title: err?.response?.data?.detail || err?.message });
		},
	});

	const uploadMutation = useMutation({
		mutationFn: (id) => {
			return http.put(`/assessments/${id}/activate`);
		},
		onSuccess: () => {
			toast({ title: "Sucessfully updated", variant: "solid" });
			queryClient.invalidateQueries({ queryKey: ["getassesments"] });
			setExamSetUp({});
		},
		onError: (err: any) => {
			if (err?.response) {
				toast({
					status: "error",
					description: err?.response?.data?.detail,
					position: "top"
				})
			}
		},
	});

	return (
		<Box display="flex" my={4}>
			<Box bgColor="#fff" p={3} display="flex" alignItems="center" w="100%" justifyContent="space-between">
				<Box display="flex" flexDir="column" mr={2}>
					<Text mb={2}>{title}</Text>
					<Text fontSize={"0.9rem"} textColor={"#3578D3"}>{start_date?.split("T")[0]}</Text>
					<Text fontSize={"0.9rem"} textColor={"#3578D3"}>{start_date?.split("T")[1].substring(0,5)}</Text>
				</Box>

				<Box display="flex" alignItems="center" justifyContent="space-between">
					{user?.is_instructor && !is_active && !is_marked && !is_completed && (
						<>
							<Text
								as={NavLink}
								to={is_active ? `/exams/${idx}/${id}`: `/courses/${idx}/assessment/${id}` }
								mr={2}
								cursor={"pointer"}
							>
								View
							</Text>
							<Text mx={3}>|</Text>
							<Text
								cursor="pointer"
								onClick={() => {
									navigate(`/courses/${idx}/assessment/add/${id}`);
								}}
							>
								Edit
							</Text>
							<Text mx={3}>|</Text>
							<Button 
								cursor="pointer" 
								colorScheme="blue" 
								isLoading={uploadMutation.isLoading} 
								as="button" 
								onClick={() => uploadMutation.mutate(id)}
								borderRadius={10}
								size={"sm"}
							>
								Upload
							</Button>
						</>
					)}
					{user?.is_instructor && is_active && (
						<>
							<Text
								cursor="pointer"
								onClick={() => {
									navigate(`/courses/${idx}/assessment/add/${id}`);
								}}
							>
								Edit
							</Text>
							<Text mx={3}>|</Text>
							<Text
								as={NavLink}
								to={`/courses/${idx}/assessment/${id}`}
								mr={2}
								cursor={"pointer"}
							>
								View
							</Text>
						</>
					)}
					{user?.is_instructor && is_completed && (
						<>
							<Button
								onClick={() => {
									navigate(`/courses/${idx}/assessment/${id}`);
								}}
								mr={2}
								size={"sm"}
							>
								View
							</Button>
							<Button onClick={() => markMutation.mutate(id)} isLoading={markMutation?.isLoading} size={"sm"}>
								Mark
							</Button>
						</>
					)}

					{is_marked && !user?.is_instructor && overAllClick && <Button onClick={() => overAllClick()}>View Result</Button>}
				</Box>
			</Box>
		</Box>
	);
}
