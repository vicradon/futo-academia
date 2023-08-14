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

	const { data: currUp } = useQuery({
		queryKey: ["getCurrUp", id],
		queryFn: () => http.get(`/courses/${id}/assessments?is_active=true`).then((r) => r.data),
		onSuccess: (data: any) => console.log("curr up Successful", data),
		onError: (err) => console.log("error", err),
	});

	const navigate = useNavigate();

	return (
		<>
			<CourseTabs>
				<Box>
					<Text fontSize="24px" color="#585AD4" fontWeight="bold" mt={3}>
						Currently up
					</Text>

					<Flex alignItems="center" mt={3}>
						{currUp?.map((x: any) => (
							<>
								<Flex ml={2} justifyContent="space-around" mr={3} cursor={"pointer"} onClick={() => navigate(`/exams/${id}/${x?.id}`)}>
									<Box width="100px" height="100px" bgColor="grey" display={"flex"} alignItems={"center"} justifyContent={"center"}>
										<Text fontWeight={"bold"} fontSize={"60px"} color={"white"}>
											{x?.course_id[0]?.toUpperCase()}
										</Text>
									</Box>
									<Box ml={2} display={"flex"} justifyContent={"space-around"} flexDir={"column"}>
										<Box fontWeight={"bold"}>{x?.course_id}</Box>
										<Box>{x?.assessment_type}</Box>
										<Text color="#3578D3" fontWeight="bold">
											{x?.start_date.split("T")[0]}
										</Text>
									</Box>
								</Flex>
							</>
						))}

						<TimerBox />
					</Flex>
				</Box>
				<AppTable></AppTable>
			</CourseTabs>
		</>
	);
}
