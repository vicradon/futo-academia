import { Box, Flex, Text } from "@chakra-ui/react";

export default function TimerBox({ hours, minutes, seconds }: any) {
	return (
		<Box
			sx={{
				border: "1px solid #B6B3C7",
				mx: "auto",
			}}
			borderRadius="8px"
			p={4}
			my={2}
			width="40%"
		>
			<Flex alignItems="center" justifyContent="space-around">
				<Box sx={{ border: "1px solid #BEBBCE", p: "4px 6px", mx: 2, borderRadius: "8px" }}>{hours}</Box> <Text>:</Text>{" "}
				<Box sx={{ border: "1px solid #BEBBCE", p: "4px 6px", mx: 2, borderRadius: "8px" }}>{minutes}</Box>
				<Text>:</Text>
				<Box sx={{ border: "1px solid #BEBBCE", p: "4px 6px", mx: 2, borderRadius: "8px" }}>{seconds}</Box>
			</Flex>
		</Box>
	);
}
