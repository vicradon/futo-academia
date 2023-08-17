import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

import http from "../utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@chakra-ui/react";

export default function CourseCard({ is_active, title, start_date, id, onClick, isLoading, idx, is_marked, overAllClick }: Partial<any>) {
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
					<Text mx={3}>|</Text>
					{user?.is_instructor && !is_active && !is_marked && (
						<>
							<Button
								onClick={() => {
									is_active ? navigate(`/exams/${idx}/${id}`) : "";
								}}
								mr={2}
							>
								View Exam
							</Button>
							<Text
								cursor="pointer"
								onClick={() => {
									navigate(`/lecturer/courses/${idx}/examination/add/${id}`);
								}}
							>
								Edit
							</Text>
							<Text mx={3}>|</Text>
							<Button cursor="pointer" isLoading={isLoading} as="button" onClick={onClick}>
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
