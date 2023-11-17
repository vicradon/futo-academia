import { Flex, Box, Center, Heading } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import Sidebar from "./SidebarLecturer";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function UserProfile() {

	const { pathname } = useLocation()

	return (
		<Box bg={"#F3F6FF"} min-height="100vh">
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box display={"flex"} flexDir={"column"} my={8} w="100%" p={"20px"}>
						<Center width={"70%"} maxWidth={"700px"}  minWidth={"300px"} alignSelf={"center"} height={"30px"} justifyContent={"space-around"} textAlign={"center"}>
							<Heading 
								as={NavLink} 
								to={"/profile"}
								width={"50%"}
								size="24px"
								bg={ pathname === '/profile' ? '#343680' : '#DAE4FF'}
								textColor={pathname === '/profile' ? 'white' : '#585AD4'}
			 					>
								My Profile
							</Heading>
							<Heading 
								as={NavLink}
								to={"/profile/password"}
								width={"50%"}
								size="24px" 
								bg={ pathname === '/profile/password' ? '#343680' : '#DAE4FF'}
								textColor={pathname === '/profile/password' ? 'white' : '#585AD4'}
							>
								Manage password
							</Heading>
						</Center>

						<Outlet />
						
				</Box>
			</Flex>
		</Box>
	);
}
