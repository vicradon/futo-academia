import { Box, Flex, Input, Select, Text, Textarea, Button, useToast } from "@chakra-ui/react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "../utils/http";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import ObjectiveAnswer from "./ObjectiveAnswer";
import { handleToast } from "../utils/handleToast";

export default function ObjectiveQuestion() {
	const [questionChoice, setQuestionChoice] = useState("");
	const [openAnswer, setOpenAnswer] = useState(false);
	const [answers, setAnswers] = useState("");
	const [tolerence, setTolerance] = useState("");
	const [dataID, setDataID] = useState("");

	const { idx } = useParams();

	const toast = useToast();

	const queryClient = useQueryClient();

	const [questionArr, setQuestionArr] = useState<any>({
		id: uuidv4(),
		question: "",
		mark: 0,
		question_type: "",
		tolerance: questionChoice === "maths" ? tolerence : 0,
		is_multi_choice: false,
		num_answer: 0,
		assessment_id: idx,
	});

	const { data: answerData } = useQuery({
		queryKey: ["getAnswersss", idx],
		queryFn: () => http.get(`/assessments/${idx}/review`).then((r) => r.data),
		onError: (err) => handleToast(err),
	});

	const constructAnswer = (): any => {
		return {
			question_id: dataID,
			options: [
				{
					option: answers,
					is_correct: true,
				},
			],
		};
	};

	const questionMutations = useMutation({
		mutationFn: (question) => {
			return http.post("/questions", question);
		},
		onSuccess: ({ data }) => {
			setDataID(data?.id);
			setOpenAnswer(true);
			toast({
				title: "Successful saved question",
			});
			queryClient.invalidateQueries({ queryKey: ["getQuestions"] });
		},
		onError: (err) => {
			handleToast(err);
		},
	});

	const answersMutation = useMutation({
		mutationFn: (question) => {
			return http.post("/answers", question);
		},
		onSuccess: ({ data }) => {
			queryClient.invalidateQueries({ queryKey: ["getQuestions"] });
			toast({
				title: "Successful saved answer",
			});
			setQuestionArr({
				id: uuidv4(),
				question: "",
				mark: "",
				question_type: "",
				tolerance: 0,
				is_multi_choice: false,
				num_answer: 0,
				assessment_id: idx,
			});
			setOpenAnswer(false);
			setDataID("");
		},
		onError: (err) => {
			handleToast(err);
		},
	});

	const handleChange = (e: any) => {
		setQuestionArr({ ...questionArr, [e?.target?.name]: e?.target?.value });
	};

	return (
		<>
			<Box>
				<Flex alignItems="center" justifyContent={"space-between"}>
					<Text fontWeight="bold" fontSize="2xl" my={8}>
						Questions
					</Text>
				</Flex>
				<Flex w="100%" justifyContent="space-around">
					<Box width="100%">
						{answerData?.questions.map((x: any, i: number) => (
							<ObjectiveAnswer {...x} index={i + 1} />
						))}
					</Box>
				</Flex>
			</Box>
			<Box my={6} border="1px solid grey" p={4} borderRadius="8px">
				<Box>
					<Text fontWeight="bold" my={3} mt={18}>
						Question type
					</Text>
					<Textarea bgColor="#fff" name="question" value={questionArr["question"]} onChange={handleChange} placeholder="Type Question here" my={2} />
					<Flex>
						<Select
							placeholder="Question type"
							onChange={(e) => {
								setQuestionChoice(e?.target?.value);
								handleChange(e);
							}}
							name="question_type"
							value={questionArr["question_type"]}
						>
							<option value="obj">Objective</option>
							<option value="nlp">Theory</option>
							<option value="sub_obj">Subjective</option>
							<option value="maths">Maths</option>
						</Select>
					</Flex>

					<Input placeholder="Mark (in number)" name="mark" value={questionArr["mark"]} type="number" onChange={handleChange} my={2} bgColor={"white"} />
					<Box mt={3}>{questionChoice === "nlp" && openAnswer && <Textarea onChange={(e) => setAnswers(e?.target?.value)} placeholder="Hello world" bgColor="white" />}</Box>
					<Box mt={3}>{questionChoice === "sub_obj" && openAnswer && <Textarea placeholder="Hello world" onChange={(e) => setAnswers(e?.target?.value)} bgColor="white" />}</Box>
					<Box>{questionChoice === "obj" && openAnswer && <ObjectiveComponent dataId={dataID} answersMutation={answersMutation} />}</Box>
					<Box>
						{questionChoice === "maths" && questionArr["question_type"] === "maths" && (
							<Input type="number" bgColor="white" placeholder="Tolerance" onChange={(e) => setTolerance(e?.target?.value)} my={2} />
						)}
					</Box>
					<Box>{questionChoice === "maths" && openAnswer && <Input type="number" onChange={(e) => setAnswers(e?.target?.value)} bgColor="white" placeholder="Maths Answer" />}</Box>
					<Box display="flex" alignItems="center" justifyContent="flex-end">
						{!dataID ? (
							<Button
								variant="solid"
								isLoading={questionMutations.isLoading}
								onClick={() => {
									console.log("Question Args", questionArr);
									questionMutations.mutate(questionArr);
								}}
								my={2}
							>
								Save Question
							</Button>
						) : (
							<Button isLoading={answersMutation.isLoading} onClick={() => answersMutation.mutate(constructAnswer())} my={2}>
								Save answer
							</Button>
						)}
					</Box>
				</Box>
			</Box>
		</>
	);
}

const ObjectiveComponent = ({ dataId, answersMutation }: any) => {
	const [a, setA] = useState("");
	const [b, setB] = useState("");
	const [c, setC] = useState("");
	const [d, setD] = useState("");

	const [correct, setCorrect] = useState("");

	const constructObject = () => {
		return {
			question_id: dataId,
			options: [
				{
					option: a,
					is_correct: Boolean(a === correct),
				},
				{
					option: b,
					is_correct: Boolean(b === correct),
				},
				{
					option: c,
					is_correct: Boolean(c === correct),
				},
				{
					option: d,
					is_correct: Boolean(d === correct),
				},
			],
		};
	};

	return (
		<Box>
			<Flex alignItems="center" justifyContent="space-between">
				<Box w="100%">
					<Text fontWeight="bold">A</Text>
					<Input bgColor="white" name="A" onChange={(e) => setA(e?.target?.value)} />
				</Box>
				<Box w="100%">
					<Text fontWeight="bold">B.</Text>
					<Input bgColor="white" name="B" onChange={(e) => setB(e?.target?.value)} />
				</Box>
			</Flex>
			<Flex alignItems="center" justifyContent="space-between" mt={3}>
				<Box w="100%">
					<Text fontWeight="bold">C.</Text>
					<Input bgColor="white" name="C" onChange={(e) => setC(e?.target?.value)} />
				</Box>
				<Box w="100%">
					<Text fontWeight="bold">D.</Text>
					<Input bgColor="white" name="D" onChange={(e) => setD(e?.target?.value)} />
				</Box>
			</Flex>
			<Text my={3}>Question Answer</Text>
			<Select
				mt={3}
				placeholder="Correct Answer"
				bgColor="#fff"
				onChange={(e) => {
					setCorrect(e?.target?.value);
				}}
			>
				<option value={a}>A</option>
				<option value={b}>B</option>
				<option value={c}>C</option>
				<option value={d}>D</option>
			</Select>

			<Button
				isLoading={answersMutation.isLoading}
				my={8}
				onClick={() => {
					answersMutation.mutate(constructObject());

					setCorrect("");
					setA("");
					setB("");
					setC("");
					setD("");
				}}
			>
				Save Answer
			</Button>
		</Box>
	);
};

const PreviewQuestion = ({ question, mark, question_type }: any) => {
	return (
		<Box bgColor={"#fff"} my={2} p={3}>
			<Text fontSize={"2xl"}>Question: {question ?? "--"}</Text>
			<Text>Question Type: {question_type?.toUpperCase() ?? "--"}</Text>
			<Text>Mark: {mark ?? "--"}</Text>
		</Box>
	);
};

const PreviewAnswer = () => {
	return (
		<Box bgColor={"#fff"} my={2} p={3}>
			<Text fontSize={"2xl"}>Answer</Text>
			<Flex>
				<Text></Text>
			</Flex>
		</Box>
	);
};
