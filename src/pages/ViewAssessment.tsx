import { useQuery } from "@tanstack/react-query";
import CourseTabs from "../layout/CourseTabs";
import { Box, Text, Flex, Textarea } from "@chakra-ui/react";
import http from "../utils/http";
import { handleToast } from "../utils/handleToast";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// import { toast } from "react-toastify";

export default function ViewAssessment() {
	const { idx } = useParams();
	const { data: answerData, isLoading } = useQuery({
		queryKey: ["getAnswersss", idx],
		queryFn: () => http.get(`/assessments/${idx}/review`).then((r) => r.data),
		onError: (err) => handleToast(err),
	});

	useEffect(() => {
	  console.log(answerData)
	}, [isLoading])
	

	return (
		<CourseTabs>
			<Box>
				<Text fontSize="24px" color="#585AD4" fontWeight="bold" my={5}>
					Assesment
				</Text>

				{/* <Flex alignItems="center" justifyContent={"space-between"} my={5}>
					<NoOfQuestions />
					<QuestionType />
					<AllocatedTime />
				</Flex> */}

				<Flex my={3}>
					<Box width="100%">
						<Text fontWeight="bold" my={3} mt={8}>
							Instructions
						</Text>
						<Textarea
							placeholder="Type here"
							sx={{
								width: "100%",
							}}
							bgColor="#fff"
						/>
					</Box>
				</Flex>

				<Box>
				<Flex alignItems="center" justifyContent={"space-between"}>
					<Text fontWeight="bold" fontSize="2xl" my={8}>
						Questions
					</Text>
				</Flex>
				
			</Box>
			</Box>
		</CourseTabs>
	);
}

/*
const NoOfQuestions = () => {
	return (
		<Box display="flex" flexDir="column" justifyContent="center" mr={2}>
			<Text my={3} fontWeight={"bold"}>
				No of questions
			</Text>
			<Box border="1px solid #000000" p={2} borderRadius="9px">
				<Input
					m={3}
					mx="auto"
					placeholder="0"
					_placeholder={{
						mx: "auto",
					}}
				/>
			</Box>
		</Box>
	);
};

const QuestionType = () => {
	return (
		<Box>
			<Text>Question type</Text>
			<Select placeholder="Select option">
				<option value="option1">Objective</option>
				<option value="option2">Theoretical</option>
			</Select>
		</Box>
	);
};

const AllocatedTime = () => {
	return (
		<Box>
			<Text>Allocated time</Text>
			<Select placeholder="Select option">
				<option value="option1">Objective</option>
				<option value="option2">Theoretical</option>
			</Select>
		</Box>
	);
};

*/
