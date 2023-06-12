import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import Logo from "../components/Logo";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box>
			<Container maxW={"container.xl"}>
				<Flex paddingY={"2rem"} justifyContent={"space-between"}>
					<Logo />
					<Flex>
						<Button>Log In</Button>
						<Button rounded={"sm"} colorScheme="brand">
							Sign Up
						</Button>
					</Flex>
				</Flex>
			</Container>

			{children}
		</Box>
	);
}
