import { Flex, Button, Box, Container } from "@chakra-ui/react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";

import AddCourse from "../../components/AddCourse";
import JoinCourse from "../../components/JoinCourse";

export default function LecturerCourses() {
	const { pathname } = useLocation()
	return (
		<Box bg={"#F3F6FF"}>
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box my={8}  w={"100%"}>
					<Container w={"100%"} maxW={"73vw"} display={"flex"} flexDir={"column"}>
						<Flex my={8} justifyContent={"center"}>
							<Button
								width={"200px"}
								variant={pathname === "/lecturer/courses/" ? "solid" : "ghost"}
								colorScheme="blue"
								as={NavLink}
								to={"/lecturer/courses/"}
							>
								Harmattan
							</Button>
							<Button
								width={"200px"}
								variant={pathname === "/lecturer/courses/second-semester" ? "solid" : "ghost"}
								colorScheme="blue"
								as={NavLink}
								to={"/lecturer/courses/second-semester"}
							>
								Rain
							</Button>
						</Flex>

						<Outlet />
 
						<Flex maxWidth={"400px"} alignSelf={"center"} gap={'3'}>
							<AddCourse />
							<JoinCourse />
						</Flex>

						<Flex my={12} justifyContent={"center"}>
							<Button width={{ base: "150px", md: "200px", lg: "400px" }} colorScheme={"brand"} variant={"outline"}>
								View More
							</Button>
						</Flex>
					</Container>
				</Box>
			</Flex>
		</Box>
	);
}
