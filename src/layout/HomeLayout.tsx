import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Logo from "../components/Logo";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box width={"80vw"}>
			<Flex justifyContent={"space-between"}>
				<Logo />
				<Flex>
					<Button>Log In</Button>
					<Button colorScheme="brand">Sign Up</Button>
				</Flex>
			</Flex>

			{children}
		</Box>
	);
}
