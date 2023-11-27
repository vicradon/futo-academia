import { NavLink, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import CourseTabs from "../layout/CourseTabs";
import { Text, Flex } from "@chakra-ui/react";
import Enrolled from "./Enrolled";
import EnrollmentRequests from "./EnrollmentRequests";


export default function CourseStudents() {
	const { id } = useParams();
	const { pathname } = useLocation()

	return (
		<CourseTabs>
			<Flex justifyContent={"space-around"} mt={5}>
				<Text 
					width={"100%"} 
					textAlign={"center"} 
					bg={!pathname.includes("requests") ? "#343680" : "#DAE4FF"}
					textColor={!pathname.includes("requests") ? "#DAE4FF" : "#343680"}
					as={NavLink} 
					to={`/lecturer/courses/${id}/students/`}
				>
					Enrolled
				</Text>
				<Text 
					width={"100%"}
					textAlign={"center"}
					bg={pathname.includes("requests") ? "#343680" : "#DAE4FF"}
					textColor={pathname.includes("requests") ? "#DAE4FF" : "#343680"}
					as={NavLink}
					to={`/lecturer/courses/${id}/students/requests`}
				>
					Requests
				</Text>
			</Flex>

				<Outlet />

				<Routes>
					<Route path="/" element={<Enrolled id={id} />} />
					<Route path="/requests" element={<EnrollmentRequests id={id} />} />
				</Routes>
		</CourseTabs>
	);
}
