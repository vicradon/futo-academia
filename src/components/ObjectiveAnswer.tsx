import { Box, Flex, Radio, Stack, Text } from "@chakra-ui/react";

function ObjectiveAnswer({ question, answers, question_type, stu_mark, mark, studentAnswer = () => {}, index }: any) {
	return (
		<div
			style={{
				marginBottom: 6,
			}}
		>
			<Box borderWidth="0.5px" borderRadius="lg" my={2} p={3} mb={10} overflow="hidden" bgColor={"white"} border={"2px solid #C5C8FF"}>
				<Box bgColor={"#fff"} my={2} p={3}>
					<Flex alignItems={"center"} justifyContent={"space-between"}>
						<Flex fontWeight={"bold"} fontSize={"2xl"}>
							<Text>Q{index}. {question ?? "--"}</Text>
						</Flex>
						<Box height={"50px"} width={"50px"} alignItems={"center"} flexDirection={"column"} display={"flex"} justifyContent={"center"} p={2} borderRadius={"5px"} alignSelf={"start"}>
							<Text fontWeight={"bold"} color={"#344D7A"}>
								{stu_mark !== undefined ? `${stu_mark}/${mark}` : mark ?? "--"}
							</Text>
							<Text color={"#344D7A"}>
								Marks
							</Text>
						</Box>
					</Flex>
					<Text>({question_type === "maths" ? "Mathematics" : question_type === "nlp" ? "Theory" : question_type === "sub_obj" ? "Subjective" : question_type === "obj" ? "Multichoice" : "" ?? "--"})</Text>
				<Box mt={5}>
					{question_type === "obj" ? <Stack spacing={4} direction="column">
						{answers?.map((x: any, i: number) => {
							return (
								<Radio isChecked={Boolean(x?.is_correct)} colorScheme="brand" key={i}>
									{x?.option}
								</Radio>
							);
						})}
					</Stack>
					:
					<>
						{answers?.map((x: any, i: number) => {
							return (
								<Flex gap={4} key={i}><Text fontWeight={"bold"}>Answer: </Text>{x?.option}</Flex>
							);
						})}
					</>
					}
					{studentAnswer() && (
						<Text mt={5}>
							{" "}
							<b> Candidate Answer:</b> {studentAnswer()}
						</Text>
					)}
				</Box>
				</Box>
			</Box>
		</div>
	);
}

export default ObjectiveAnswer;
