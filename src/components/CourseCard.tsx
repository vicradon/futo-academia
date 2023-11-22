import { Box, Text, Button } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

import http from "../utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@chakra-ui/react";
import { handleToast } from "../utils/handleToast";

export default function CourseCard({ is_active, title, start_date, id, idx, is_marked, overAllClick, setExamSetUp }: Partial<any>) {
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
			handleToast(err);
		},
	});

	return (
		<Box display="flex" my={4}>
			<Box bgColor="grey" width="100px" height="90px" display="flex" alignItems="center" justifyContent="center">
				<Text fontSize={"80px"} color={"#fff"}>
					{title?.["0"].toUpperCase("")}
				</Text>
			</Box>
			<Box bgColor="#fff" p={3} display="flex" alignItems="center" w="100%" justifyContent="space-between">
				<Box display="flex" flexDir="column">
					<Text>{title}</Text>
					<Text>{start_date?.split("T")[0]}</Text>
				</Box>

				<Box display="flex" alignItems="center" justifyContent="space-between">
					{user?.is_instructor && !is_active && !is_marked && (
						<>
							<Text
								as={NavLink}
								to={is_active ? `/exams/${idx}/${id}`: `/lecturer/courses/${idx}/assessment/${id}` }
								mr={2}
								cursor={"pointer"}
							>
								View Exam
							</Text>
							<Text mx={3}>|</Text>
							<Text
								cursor="pointer"
								onClick={() => {
									navigate(`/lecturer/courses/${idx}/assessment/add/${id}`);
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
							>
								Upload
							</Button>
						</>
					)}
					{user?.is_instructor && is_active && (
						<>
							<Button
								onClick={() => {
									is_active ? navigate(`/exams/${idx}/${id}`) : "";
								}}
								mr={2}
							>
								View Exam
							</Button>
							<Button onClick={() => markMutation.mutate(id)} isLoading={markMutation?.isLoading}>
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
