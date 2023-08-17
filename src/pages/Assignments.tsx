import { useNavigate, useParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import CourseTabs from "../layout/CourseTabs";

import { Box, Text, Input, Select, Button, useToast } from "@chakra-ui/react";

import http from "../utils/http";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import Loader from "../components/Loaders";

import { useUser } from "../hooks/useUser";
import { handleToast } from "../utils/handleToast";

export default function Assignments() {
	const { id } = useParams();
	const toast = useToast();
	const navigate = useNavigate();
	const { data, isLoading } = useQuery({
		queryKey: ["getassesments", id],
		queryFn: () => http.get(`/courses/${id}/assessments`).then((r) => r.data),
		onError: (err) => console.log("error", err),
	});

	const [examSetUp, setExamSetUp] = useState<any>({});

	const [isDisabled] = useState(false);

	const queryClient = useQueryClient();

	const user = useUser();

	useEffect(() => {
		setExamSetUp({ ...examSetUp, course_id: id, is_active: false });
	}, []);

	const examSetUpMutation = useMutation({
		mutationFn: (examSetUp) => {
			return http.post("/assessments", examSetUp);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getassesments"] });
			setExamSetUp({});
		},
		onError: (err) => {
			console.log("Mutation errror", err);
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

	const markMutation = useMutation({
		mutationFn: (id) => {
			return http.post(`/marks/${id}/`);
		},
		onSuccess: () => {
			toast({ title: "Sucessfully mark", variant: "solid" });
			queryClient.invalidateQueries({ queryKey: ["getassesments"] });
			setExamSetUp({});
		},
		onError: (err: any) => {
			console.log("Mark errr", err);
			handleToast(err);
		},
	});

	if (isLoading) return <Loader />;
	return (
		<CourseTabs>
			{user?.is_instructor && (
				<Box bgColor={"white"} p={3} mt={5}>
					<Text fontWeight="bold">Create Assessment</Text>
					<Input
						placeholder="Title"
						name="title"
						value={examSetUp["title"]}
						my={3}
						disabled={isDisabled}
						onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })}
					/>
					<Input
						placeholder="Start Date"
						name="start_date"
						disabled={isDisabled}
						value={examSetUp["start_date"]}
						my={3}
						type="datetime-local"
						onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })}
					/>
					<Input
						placeholder="Duration"
						name="duration"
						value={examSetUp["duration"]}
						disabled={isDisabled}
						my={3}
						type="number"
						onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })}
					/>
					<Input
						placeholder="Total Mark"
						name="total_mark"
						value={examSetUp["total_mark"]}
						disabled={isDisabled}
						my={3}
						type="number"
						onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })}
					/>
					<Input
						placeholder="End date"
						name="end_date"
						value={examSetUp["end_date"]}
						disabled={isDisabled}
						my={3}
						type="datetime-local"
						onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })}
					/>

					<Select
						placeholder="Assesment type"
						my={3}
						disabled={isDisabled}
						name="assessment_type"
						value={examSetUp["assessment_type"]}
						onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })}
					>
						<option value="Assignment">Assignment</option>
						<option value="Exam">Examination</option>
						<option value="Test">Test</option>
					</Select>

					<Box display="flex" justifyContent="flex-end">
						<Button
							isLoading={examSetUpMutation.isLoading}
							onClick={() => {
								examSetUpMutation.mutate(examSetUp);
							}}
							disabled={isDisabled}
						>
							Setup Exam
						</Button>
					</Box>
				</Box>
			)}
			{user?.is_instructor && (
				<>
					<Text my={2} fontWeight={"bold"} fontSize={"2xl"} color={"#343780"} mt={6}>
						Draft
					</Text>
					{data
						?.filter((x: any) => x?.is_marked === false && x?.is_active === false)
						?.map((x: any, i: number) => {
							return <CourseCard idx={id} key={i} onClick={() => uploadMutation.mutate(x?.id)} isLoading={uploadMutation?.isLoading} {...x} />;
						})}
					{data?.filter((x: any) => x?.is_marked === false && x?.is_active === false)?.length === 0 && <Text textAlign={"center"}>No Data here</Text>}
				</>
			)}

			<Text my={2} fontWeight={"bold"} fontSize={"2xl"} color={"#343780"} mt={6}>
				Active
			</Text>
			{data
				?.filter((x: any) => x?.is_active)
				.map((x: any, i: number) => {
					return (
						<CourseCard is_active={true} markMutation={markMutation} idx={id} key={i} onClick={() => uploadMutation.mutate(x?.id)} isLoading={uploadMutation?.isLoading} {...x} />
					);
				})}

			{data?.filter((x: any) => x?.is_active)?.length === 0 && <Text textAlign={"center"}>No Data here</Text>}
			<Text my={2} fontWeight={"bold"} fontSize={"2xl"} color={"#343780"} mt={6}>
				Marked
			</Text>
			{data
				?.filter((x: any) => x?.is_marked)
				.map((x: any, i: number) => {
					return (
						<CourseCard
							idx={id}
							overAllClick={() => (!user?.is_instructor ? navigate(`/exam/${x?.id}/${id}/results`) : "")}
							is_marked={true}
							key={i}
							onClick={() => uploadMutation.mutate(x?.id)}
							isLoading={uploadMutation?.isLoading}
							{...x}
						/>
					);
				})}
			{data?.filter((x: any) => x?.is_marked)?.length === 0 && <Text textAlign={"center"}>No Data here</Text>}
		</CourseTabs>
	);
}
