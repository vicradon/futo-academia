import { Box, Flex, Text } from "@chakra-ui/react";

export default function TimerBox() {
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
			<Flex alignItems="center" justifyContent="space-around">
				<Box sx={{ border: "1px solid #BEBBCE", p: "4px 6px", mx: 2, borderRadius: "8px" }}>00</Box> <Text>:</Text>{" "}
				<Box sx={{ border: "1px solid #BEBBCE", p: "4px 6px", mx: 2, borderRadius: "8px" }}>30</Box>
				<Text>:</Text>
				<Box sx={{ border: "1px solid #BEBBCE", p: "4px 6px", mx: 2, borderRadius: "8px" }}>00</Box>
			</Flex>
		</Box>
	);
}
