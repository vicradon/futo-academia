import {
	Box,
	Text,
	Flex,
	Stack,
	Radio,
	Textarea,
	RadioGroup,
	Button,
	useToast,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import confirmAlert from "../assets/alert.gif";

import http from "../utils/http";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loader from "../components/Loaders";

import TimerBox from "../components/TimerBox";
import Countdown from "react-countdown";

export default function TakeExam() {
	const { courseId: idx, id } = useParams();
	const navigate = useNavigate();
	const toast = useToast();

	const [examDate, setExamDate] = useState<any>(Date.now());

	useEffect(() => {
		setExamDate(Date.now());
	}, []);

	const { data: answerData, isLoading } = useQuery({
		queryKey: ["getAnswersss", idx],
		queryFn: () => http.get(`/assessments/${idx}/assessment_questions`).then((r) => r.data),
		onSuccess(data) {
			console.log("Quess", data);
		},
		onError: (err: any) => {
			console.log("Error", err);
			if (err?.response?.status === 405) {
				toast({
					title: "Your submission has been recorded" || err?.response?.data?.detail,
					containerStyle: {
						backgroundColor: "red",
						color: "white",
					},
				});
				setTimeout(() => {
					navigate(`/lecturer/courses/${id}`);
				}, 1000);
			}
		},
	});

	const { data: examData } = useQuery({
		queryKey: ["getCourseID", id],
		queryFn: () => http.get(`/courses/${id}`).then((r) => r.data),
		onSuccess: (data: any) => console.log("Exam Successful", data),
		onError: (err) => console.log("error", err),
	});

	const [submissions, setSubmissions] = useState<any>([]);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const submissionMutation: any = useMutation({
		mutationFn: (question) => {
			return http.post("/submissions", question);
		},
		onSuccess: () => {
			onClose();
			toast({
				title: "Submitted",
			});
			navigate(`/lecturer/courses/${id}`);
		},
		onError: (err: any) => {
			toast({
				title: err?.response?.data?.detail,
				position: "top",
				containerStyle: {
					backgroundColor: "red",
					color: "white",
				},
			});
		},
	});

	const handleSubmit = () => {
		onOpen();
	};

	if (isLoading) {
		return (
			<>
				<Loader height="50vh" />
			</>
		);
	}

	const renderer = ({ hours, minutes, seconds, completed }: any) => {
		if (completed) {
			return (
				<Box
					sx={{
						border: "1px solid #B6B3C7",
					}}
					borderRadius="8px"
					p={4}
					my={2}
					width="20%"
				>
					<Text fontWeight={"bold"} textAlign={"center"}>
						Completed!
					</Text>
				</Box>
			);
		} else {
			return <TimerBox hours={hours} minutes={minutes} seconds={seconds} />;
		}
	};

	return (
		<>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirm Modal</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box mx="auto">
							<img
								src={confirmAlert}
								style={{
									margin: "0 auto",
								}}
								alt="success"
								width={200}
								height={200}
							/>
						</Box>
						<Text textAlign={"center"} mx="auto">
							Are you sure you want to submit?
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="solid"
							bgColor={"#696cfe"}
							color="white"
							isLoading={submissionMutation.isLoading}
							onClick={() => {
								submissionMutation.mutate({
									assessment_id: idx,
									submissions,
								});
							}}
						>
							Yes
						</Button>
						<Button ml={2} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Box bgColor={"#f3f6ff"} w="100%" minH={"100vh"}>
				<Box mx={100} py={50}>
					<Box w="50%" mx="auto" mt={10}>
						{answerData?.questions?.length > 0 && (
							<>
								<Text textAlign={"center"} color="#232455" fontWeight={"bold"}>
									{"Federal University of Technology Owerri".toUpperCase()} <br /> FACULTY OF {examData?.faculty} <br /> {examData?.semester === 1 ? "HARMATTAN" : "RAIN"} SEMESTER
									EXAMINATION (2022/2023)
								</Text>
								<Text>COURSE TITLE: {examData?.title.toString().toUpperCase()}</Text>
								<Flex justifyContent={"space-between"}>
									<Text my={1}>
										{" "}
										<b>COURSE CODE:</b> {examData?.course_code}
									</Text>
									<Text my={1}>
										{" "}
										<b>DATE:</b> {answerData.start_date.split?.("T")[0]}{" "}
									</Text>
								</Flex>
								<Flex justifyContent={"space-between"}>
									<Text my={1}>
										{" "}
										<b> NO OF CREDITS:</b> {examData?.units} UNITS
									</Text>
									<Text my={1}>
										<b>ALLOCATED TIME:</b> {answerData?.duration} MINUTES
									</Text>
								</Flex>

								<Box textAlign={"center"} my={10}>
									<b>INSTRUCTION: ANSWER ALL QUESTIONS</b>
								</Box>

								<Box mx="auto">
									{!(Math.floor(Date?.now() / 1000) > convertToEpoch(answerData?.end_date)) && (
										<Countdown
											renderer={renderer}
											onComplete={() => {
												submissionMutation.mutate({
													assessment_id: idx,
													submissions,
												});
											}}
											date={examDate + answerData?.duration * 1000 * 60}
										/>
									)}
								</Box>
							</>
						)}
						{answerData?.questions.map((x: any, i: number) => (
							<ObjectiveAnswer
								question_id={x?.id}
								question={x?.question}
								answers={x?.answers}
								submissions={submissions}
								setSubmissions={setSubmissions}
								question_type={x?.question_type}
								index={i + 1}
								{...x}
							/>
						))}
						{answerData?.questions?.length > 0 && (
							<Flex justifyContent={"end"}>
								<Button onClick={handleSubmit}>Submit</Button>
							</Flex>
						)}
						{answerData?.questions.length === 0 && (
							<Box>
								<Text textAlign={"center"}>No Questions</Text>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</>
	);
}

function ObjectiveAnswer({ question, answers, question_id, question_type, mark, index, submissions, setSubmissions }: any) {
	const [radio, setRadio] = useState("0");

	const handleAnswering = (event: any) => {
		if (question_type === "obj") setRadio(event);

		const submissionIndex = submissions.findIndex((sub: any) => sub.question_id === question_id);
		const updatedSubmission = {
			question_id,
			...(question_type === "obj" ? { stu_answer_id: event } : { stu_answer: event.target.value }),
		};

		if (submissionIndex === -1) {
			setSubmissions([...submissions, updatedSubmission]);
		} else {
			const newSubmissions = submissions.map((submission: any, index: number) => (index === submissionIndex ? { ...submission, ...updatedSubmission } : submission));
			setSubmissions(newSubmissions);
		}
	};

	return (
		<div
			style={{
				marginBottom: 6,
			}}
		>
			<Text>Q{index}.</Text>
			<Box borderWidth="0.5px" borderRadius="lg" my={2} p={3} mb={10} overflow="hidden" bgColor={"white"} border={"2px solid #C5C8FF"}>
				<Box bgColor={"#fff"} my={2} p={3}>
					<Flex alignItems={"center"} justifyContent={"space-between"}>
						<Text fontSize={"24px"} fontWeight={"400"}>
							{question}
						</Text>
						{mark && (
							<Box bgColor={"#696cfe"} height={"50px"} width={"50px"} alignItems={"center"} flexDirection={"column"} display={"flex"} justifyContent={"center"} p={4}>
								<Text fontWeight={"bold"} color={"#fff"}>
									{mark ?? "--"}
								</Text>
								<Text fontWeight={"bold"} color={"white"}>
									Marks
								</Text>
							</Box>
						)}
					</Flex>
				</Box>
				<Box p="6">
					{question_type === "obj" ? (
						<Stack spacing={4} direction="column">
							<RadioGroup onChange={handleAnswering} value={radio} dir="column" display={"flex"} flexDirection={"column"}>
								{answers?.map((x: any) => {
									return (
										<Radio value={String(x?.id)} colorScheme="brand" my={2}>
											{x?.option}
										</Radio>
									);
								})}
							</RadioGroup>
						</Stack>
					) : (
						<Textarea as={"input"} onChange={handleAnswering} type={question_type === "maths" ? "number" : ""} placeholder="Please input answer here" />
					)}
				</Box>
			</Box>
		</div>
	);
}

const convertToEpoch = (timestamp: any) => {
	const dt = new Date(timestamp);
	const epochTime = dt.getTime() / 1000;

	return Math.floor(epochTime);
};
