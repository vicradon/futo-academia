import { Flex, Box, Center, Heading } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function UserProfile() {


	return (
		<Box bg={"#F3F6FF"}>
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box display={"flex"} flexDir={"column"} my={8} w="100%" sx={{ marginRight: "50px" }} p={"10px"}>
						<Center width={"70%"} maxWidth={"700px"} bg={"yellow"} alignSelf={"center"} height={"30px"} justifyContent={"space-around"}>
							<Heading as="h1" size="24px" sx={{ color: "#585AD4", margin: "1rem 0" }}>
								My Profile
							</Heading>
							<Heading as="h1" size="24px" sx={{ color: "#585AD4", margin: "1rem 0" }}>
								My Profile
							</Heading>
						</Center>

						<Outlet />
						
				</Box>
			</Flex>
		</Box>
	);
}
