import { useQuery } from "@tanstack/react-query";
import ObjectiveQuestion from "../components/ObjectiveQuestion";
import CourseTabs from "../layout/CourseTabs";
import http from "../utils/http";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Instructions from "./Instructions";


export default function AddAssessment() {
	const { idx } = useParams();

	//The code below has to do with getting and editing assessment info.
	const { data: assessmentData, isLoading: assessmentDataIsloading } = useQuery({
		queryKey: ["getAssessment", idx],
		queryFn: () => http.get(`/assessments/${idx}`).then((r) => r.data),
	});

	useEffect(() => {
	  console.log(assessmentData)
	}, [assessmentDataIsloading])
	

	
	return (
		<CourseTabs>
				<Instructions idx={idx} />
				<ObjectiveQuestion />
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
