import AppTable from "../components/Table";
import http from "../utils/http";
import { Box, Tab, TabList, TabPanels, TabPanel, Tabs, Text, Flex } from "@chakra-ui/react";
import AdminLayout from "../layout/AdminLayout";
import TimerBox from "../components/TimerBox";
import CourseHeader from "../components/CourseHeader";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import CourseTabs from "../layout/CourseTabs";

export default function ViewCourse() {
	const tabData = [
		{
			name: "Course Summary",
		},
		{
			name: "Assignments",
		},
		{
			name: "Tests",
		},
		{
			name: "Examination",
		},
	];
	const { id } = useParams();

	const { data } = useQuery({
		queryKey: ["getCourseID", id],
		queryFn: () => http.get(`/courses/${id}`).then((r) => r.data),
		onSuccess: (data: any) => console.log("Query per course Successful", data),
		onError: (err) => console.log("error", err),
	});

	const navigate = useNavigate();

	return (
		<>
			<CourseTabs>
				<Box>
					<Text fontSize="24px" color="#585AD4" fontWeight="bold">
						Currently up
					</Text>

					<Flex alignItems="center">
						<Box width="100px" height="100px" bgColor="red"></Box>
						<Flex direction="column" ml={2} justifyContent="space-around" mr={3}>
							<Box>Assignment</Box>
							<Box>
								<Text color="#3578D3" fontWeight="bold">
									Jan 1 2023
								</Text>
							</Box>
						</Flex>

						<TimerBox />
					</Flex>
				</Box>
				<AppTable></AppTable>
			</CourseTabs>
		</>
	);
}
