import { useEffect, useState } from "react";
import ObjectiveQuestion from "../components/ObjectiveQuestion";
import CourseTabs from "../layout/CourseTabs";
import { Box, Text, Flex, Textarea, Input, Select, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";

import { useToast } from "@chakra-ui/react";

// import { toast } from "react-toastify";

export default function AddExam() {
	const [examSetUp, setExamSetUp] = useState<any>({});

	const [isDisabled, setIsDisabled] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		setExamSetUp({ ...examSetUp, course_id: id, is_active: false });
	}, []);

	const examSetUpMutation = useMutation({
		mutationFn: (examSetUp) => {
			return http.post("/assessments", examSetUp);
		},
		onSuccess: ({ data }) => {
			setIsDisabled(true);
			setExamSetUp(data);
		},
		onError: (err) => {
			console.log("Mutation errror", err);
		},
	});

	return (
		<CourseTabs>
			<Box>
				<Text fontSize="24px" color="#585AD4" fontWeight="bold" my={5}>
					Assesment
				</Text>

				<Box bgColor={"white"} p={3}>
					<Text fontWeight="bold">Create Exam</Text>
					<Input placeholder="Title" name="title" my={3} disabled={isDisabled} onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })} />
					<Input
						placeholder="Start Date"
						name="start_date"
						disabled={isDisabled}
						my={3}
						type="datetime-local"
						onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })}
					/>
					<Input
						placeholder="Duration"
						name="duration"
						disabled={isDisabled}
						my={3}
						type="number"
						onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })}
					/>
					<Input
						placeholder="Total Mark"
						name="total_mark"
						disabled={isDisabled}
						my={3}
						type="number"
						onChange={(e) => setExamSetUp({ ...examSetUp, [e.target.name]: e?.target?.value })}
					/>
					<Input
						placeholder="End date"
						name="end_date"
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

				<ObjectiveQuestion />
			</Box>
		</CourseTabs>
	);
}

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
