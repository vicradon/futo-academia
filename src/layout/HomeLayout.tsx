import { Box, Button, Flex, Text } from "@chakra-ui/react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box width={"100vw"}>
			<Flex justifyContent={"space-between"}>
				<Flex alignItems={"center"} flexDirection={"column"}>
					<Text>Futo</Text>
					<Text>Academia</Text>
				</Flex>
				<Flex>
					<Button>Log In</Button>
					<Button colorScheme="brand">Sign Up</Button>
				</Flex>
			</Flex>

			{children}
		</Box>
	);
}
