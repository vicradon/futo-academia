import http from "../utils/http";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExamSetup } from "./Assignments";
import CourseTabs from "../layout/CourseTabs";
import { InstructionObject } from "./Instructions";

import { Box, Flex, Text, Heading, UnorderedList, ListItem, Center, Button } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { handleToast } from "../utils/handleToast";
import ObjectiveAnswer from "../components/ObjectiveAnswer";

export default function AddAssessment() {
	const { id, idx } = useParams();

	//Header
	const navigate = useNavigate();
	const [examSetUp, setExamSetUp] = useState<ExamSetup>({
		assessment_type: "",
		course_id: "",
		duration: "",
		end_date: "",
		is_active: false,
		start_date: "",
		title: "",
		total_mark: "",
	});

	const { data: assessmentData, isLoading: assessmentDataIsloading } = useQuery({
		queryKey: ["getAssessment", idx],
		queryFn: () => http.get(`/assessments/${idx}`).then((r) => r.data),
	});

	useEffect(() => {
	  setExamSetUp({
		assessment_type: assessmentData?.assessment_type,
		course_id: assessmentData?.course_id,
		duration: assessmentData?.duration,
		end_date: assessmentData?.end_date,
		is_active: assessmentData?.is_active,
		start_date: assessmentData?.start_date,
		title: assessmentData?.title,
		total_mark: assessmentData?.total_mark,
	})
	}, [assessmentDataIsloading])

	//Instructions
	const [instructionsObject, setInstructionsObject] = useState<InstructionObject[]>([]);

	const { data: instructionsData, isLoading: instructionIsLoading } = useQuery({
		queryKey: ["getInstructions", idx],
		queryFn: () => http.get(`/instructions/${idx}`).then((r) => r.data),
	});

	useEffect(() => {
	  setInstructionsObject(instructionsData)
	}, [instructionIsLoading])

	//Questions and answers

	const { data: answerData } = useQuery({
		queryKey: ["getAnswersss", idx],
		queryFn: () => http.get(`/assessments/${idx}/review`).then((r) => r.data),
		onError: (err) => handleToast(err),
	});


	return (
		<CourseTabs>
			<Box boxShadow={"md"} p={2} mt={1} display={"flex"} flexDir={"column"} alignItems={"center"}>
				<Flex alignItems={"center"} p={1} gap={4}>
					<Text fontSize="24px" color="#585AD4" textAlign={"center"} fontWeight="bold">
						{examSetUp?.title}
					</Text>
					<Text bg={"#696CFF"} borderRadius={"full"} color="#FFF" px={2} minWidth={"min-content"} fontSize={"xs"}>{examSetUp?.assessment_type}</Text>
				</Flex>
				<Text fontSize="20px" color="#585AD4" textAlign={"center"} fontWeight="bold" mb={5}>
					({examSetUp?.course_id})
				</Text>
				<Flex width={"100%"} justifyContent={"space-evenly"}>
					<Flex flexDir={"column"} width={"40%"} alignItems={"center"}>
						<Text>From: {new Date(examSetUp?.start_date).toUTCString()}</Text>
						<Text>To: {new Date(examSetUp?.end_date).toUTCString()}</Text>
					</Flex>
					<Flex width={"40%"} alignItems={"center"} flexDir={"column"}>
						<Text>Duration</Text>
						<Text>{examSetUp?.duration} minutes</Text>
					</Flex>
				</Flex>
				<Text ml={"auto"} color={"#696CFF"} onClick={() => {navigate(`/lecturer/courses/${id}/assessment/add/${idx}`)}} cursor={"pointer"} _hover={{
					transform: "scale(1.05)",
					boxShadow: "md",
				}} transition="transform 0.3s, box-shadow 0.3s">Edit assessment</Text>
			</Box>

			<Box>
				<Flex my={3} flexDir={"column"}>
						<Heading as={"h4"} size={"md"} my={5}>
							Instructions
						</Heading>
					<Box width={"100%"} bg={"whiteAlpha.900"} p={5}>
						{instructionsObject?.length === 0 ? 
							<Text><i>No instructions.</i></Text>
							: 
							<UnorderedList>
								{instructionsObject?.map((object, index) => <ListItem key={index} my={2} boxShadow={"sm"}>
									<Flex gap={2} alignItems={"start"}>
										<Text>{object.instruction}</Text>
									</Flex>
								</ListItem>)}
							</UnorderedList>
						}
					</Box>
				</Flex>
			</Box>
			<Box>
				<Flex alignItems="center" justifyContent={"space-between"}>
					<Heading as={"h4"} size={"md"} mt={5}>
						Questions
					</Heading>
				</Flex>
				<Flex w="100%" justifyContent="space-around">
					<Box width="100%">
						{answerData?.questions.map((x: any, i: number) => (
							<ObjectiveAnswer {...x} index={i + 1} key={i} />
						))}
					</Box>
				</Flex>
			</Box>

			<Center>
				<Button colorScheme="blue" onClick={() => {navigate(`/courses/${id}/assessment/add/${idx}`)}}>
					Edit
				</Button>
			</Center>

		</CourseTabs>
	);
}
