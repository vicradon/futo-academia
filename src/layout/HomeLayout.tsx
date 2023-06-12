import { Box, Container, Flex } from "@chakra-ui/react";
import Logo from "../components/Logo";
import LoginModal from "../pages/Home/LoginModal";
import SignupModal from "../pages/Home/SignupModal";

export default function HomeLayout({ children, height, styles }: { children: React.ReactNode; height?: string | number; styles?: React.CSSProperties }) {
	return (
		<Box backgroundColor={"#F3F6FF"} height={height} style={styles}>
			<Container maxW={"container.xl"}>
				<Flex paddingY={"2rem"} justifyContent={"space-between"}>
					<Logo />
					<Flex display={{ base: "none", md: "flex" }} columnGap={8}>
						<LoginModal />
						<SignupModal />
					</Flex>
				</Flex>
			</Container>

			{children}
		</Box>
	);
}
