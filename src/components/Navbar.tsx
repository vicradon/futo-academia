import { Container, Flex, Image } from "@chakra-ui/react";
import Logo from "./Logo";
import Bell from "../assets/icons/bell.png";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";

interface NavbarProps {
	bgColor: string;
}

export default function Navbar({ bgColor }: NavbarProps) {
	const user = useUser()
	const [userData, setUserData] = useState(user)
	useEffect(() => {
	  setUserData(user)
	}, [user.isLoading])
	
	
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
					<Image src={userData.photo_url} objectFit="cover" boxSize="35px" borderRadius={"50px"}/>
				</Flex>
			</Flex>
		</Container>
	);
}
