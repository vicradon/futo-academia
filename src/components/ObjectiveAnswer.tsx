import { Box, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

function ObjectiveAnswer() {
	const property = {
		title: "Which of these is not a type of rock?",
		question: "Igneous Rock",
	};
	return (
		<div>
			<Box maxW="sm" borderWidth="0.5px" borderRadius="lg" overflow="hidden">
				<Box p="6">
					<Box mt="2" mb="6" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
						{property.title}
					</Box>

					<Box>
						<Stack spacing={4} direction="column">
							<Checkbox colorScheme="brand">Igneous Rock</Checkbox>
							<Checkbox colorScheme="brand">Sedimentary Rock</Checkbox>
							<Checkbox colorScheme="brand">Metamorphic Rock</Checkbox>
							<Checkbox colorScheme="brand">Wood Rock</Checkbox>
						</Stack>
					</Box>
				</Box>
			</Box>
		</div>
	);
}

export default ObjectiveAnswer;
