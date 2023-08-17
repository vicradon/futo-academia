import { Box, Flex, Radio, Stack, Text } from "@chakra-ui/react";

function ObjectiveAnswer({ question, answers, question_type, mark, studentAnswer, index }: any) {
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
						<Text fontWeight={"bold"} fontSize={"2xl"}>
							Question: {question ?? "--"}
						</Text>
						<Box bgColor={"#696cfe"} height={"50px"} width={"50px"} alignItems={"center"} flexDirection={"column"} display={"flex"} justifyContent={"center"} p={4}>
							<Text fontWeight={"bold"} color={"#fff"}>
								{mark ?? "--"}
							</Text>
							<Text fontWeight={"bold"} color={"white"}>
								Marks
							</Text>
						</Box>
					</Flex>
					<Text>Question Type: {question_type?.toUpperCase() ?? "--"}</Text>
				</Box>
				<Box p="6">
					<Stack spacing={4} direction="column">
						{answers?.map((x: any) => {
							// console.log("X check", x);
							return (
								<Radio isChecked={Boolean(x?.is_correct)} colorScheme="brand">
									{x?.option}
								</Radio>
							);
						})}
					</Stack>
					{studentAnswer() && (
						<Text mt={5}>
							{" "}
							<b> Candidate Answer:</b> {studentAnswer()}
						</Text>
					)}
				</Box>
			</Box>
		</div>
	);
}

export default ObjectiveAnswer;
