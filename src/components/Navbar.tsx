import { Container, Flex, Image } from "@chakra-ui/react";
import Logo from "./Logo";
import Profile from "../assets/images/profile.png";
import Bell from "../assets/icons/bell.png";

interface NavbarProps {
	bgColor: string;
}

export default function Navbar({ bgColor }: NavbarProps) {
	return (
		<Container
			maxW={"100%"}
			sx={{
				bgColor: bgColor,
				zIndex: "999",
				position: "fixed",
				boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
			}}
		>
			<Flex paddingY={"1rem"} paddingX={"3rem"} justifyContent={"space-between"} alignItems={"center"}>
				<Logo />
				<Flex display={{ base: "none", md: "flex" }} columnGap={2}>
					<Image src={Bell} boxSize="35px" />
					<Image src={Profile} objectFit="cover" boxSize="35px" />
				</Flex>
			</Flex>
		</Container>
	);
}
