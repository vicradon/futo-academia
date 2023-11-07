import { Box, Button, Container, Flex } from "@chakra-ui/react";
import Logo from "../components/Logo";
import LoginModal from "../pages/Home/LoginModal";
import SignupModal from "../pages/Home/SignupModal";
import { useState } from "react";

export default function HomeLayout({ children, height, styles }: { children: React.ReactNode; height?: string | number; styles?: React.CSSProperties }) {
	const [isOpenSignUp, setIsOpenSignUp] = useState(false)
	const [isOpenLogin, setIsOpenLogin] = useState(false)

	const onOpenLogin = () => {setIsOpenLogin(true); setIsOpenSignUp(false)}
	const onOpenSignUP = () => {setIsOpenLogin(false); setIsOpenSignUp(true)}
	const onClose = () => {setIsOpenLogin(false); setIsOpenSignUp(false)}

	return (
		<Box backgroundColor={"#F3F6FF"} height={height} style={styles}>
			<Container maxW={"container.xl"}>
				<Flex paddingY={"2rem"} justifyContent={"space-between"}>
					<Logo />
					<Flex display={{ base: "none", md: "flex" }} columnGap={8}>
					<Button variant={"secondary"} onClick={onOpenLogin}>
						Login
					</Button>
					<Button colorScheme="brand" onClick={onOpenSignUP}>
						Signup
					</Button>
						<LoginModal isOpen={isOpenLogin} openSignUp={onOpenSignUP} onClose={onClose} />
						<SignupModal isOpen={isOpenSignUp} openLogin={onOpenLogin} onClose={onClose}/>
					</Flex>
				</Flex>
			</Container>

			{children}
		</Box>
	);
}
