import { Box, Text, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import AdminLayout from "../layout/AdminLayout";
import ObjectiveAnswer from "../components/ObjectiveAnswer";
import Loader from "../components/Loaders";

export default function ExamResult() {
	const { id, idx } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ["getRes", id],
		queryFn: () => http.get(`assessments/${id}/stu_results`),
	});

	const { data: examData } = useQuery({
		queryKey: ["getCourseID", idx],
		queryFn: () => http.get(`/courses/${idx}`).then((r) => r.data),
		onSuccess: (data: any) => console.log("Exam Successful", data),
		onError: (err) => console.log("error", err),
	});

	const handleAns = (ans: any, type: any) => {
		if (type === "obj") {
			const val = ans?.answers?.find((x: any) => {
				return +x?.id === +ans?.stu_answers?.stu_answer_id;
			});
			return val?.option;
		}
		return ans?.stu_answers?.stu_answer;
	};

	if (isLoading) {
		return <Loader height="30%" />;
	}

	return (
		<AdminLayout>
			<Box bgColor={"#f3f6ff"} w="100%" minH={"100vh"} p={6} px={50}>
				<>
					<Text textAlign={"center"} color="#232455" fontWeight={"bold"}>
						Federal University of Technology Owerri <br /> FACULTY OF {examData?.faculty} <br /> {examData?.semester === 1 ? "HARMATTAN" : "RAIN"} SEMESTER EXAMINATION (2022/2023)
					</Text>
					<Text>
						COURSE TITLE: {data?.data?.title.toString().toUpperCase()} || {examData?.title.toString().toUpperCase()}
					</Text>
					<Flex justifyContent={"space-between"}>
						<Text my={1}>
							{" "}
							<b>COURSE CODE:</b> {data?.data?.course_id}
						</Text>
						<Text my={1}>
							{" "}
							<b>DATE:</b> {data?.data?.start_date.split("T")[0]}
						</Text>
					</Flex>
					<Flex justifyContent={"space-between"}>
						<Text my={1}>
							{" "}
							<b> NO OF CREDITS:</b> {examData?.units} UNITS
						</Text>
						<Text my={1}>
							<b>ALLOCATED TIME:</b> {data?.data?.duration} MINUTES
						</Text>
					</Flex>

					<Box textAlign={"center"} my={10}>
						<b>INSTRUCTION: ANSWER ALL QUESTIONS</b>
					</Box>
				</>
				<Flex justifyContent={"space-between"}>
					<Text fontSize={"xl"}>End Date: {data?.data?.end_date.split("T")[0]}</Text>
					<Text fontSize={"xl"}>Start Date: {data?.data?.start_date.split("T")[0]}</Text>
				</Flex>

				<Box>
					<Text fontSize={"4xl"} mb={15} fontWeight={"black"}>
						Exam Score: {data?.data?.total}/{data?.data?.total_mark}
					</Text>
				</Box>

				<Box>
					{data?.data?.questions?.map((x: any, i: any) => (
						<ObjectiveAnswer index={i + 1} {...x} studentAnswer={() => handleAns(x, x?.question_type)} />
					))}
				</Box>
			</Box>
		</AdminLayout>
	);
}
