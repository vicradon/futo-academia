import { ReactNode, useEffect, useState } from "react";

import AppTable from "../components/Table";
import http from "../utils/http";
import { Box, Text, Flex } from "@chakra-ui/react";
import AdminLayout from "../layout/AdminLayout";
import TimerBox from "../components/TimerBox";
import CourseHeader from "../components/CourseHeader";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";

interface IProps {
	children: ReactNode;
}

export default function CourseTabs({ children }: IProps) {
	const { id } = useParams();
	const tabData = [
		{
			name: "Course Summary",
			path: `/lecturer/courses/${id}`,
		},
		{
			name: "Assessments",
			path: `/lecturer/courses/${id}/assignments`,
		},
		{
			name: "Tests",
		},
		{
			name: "Examination",
			path: `/lecturer/courses/${id}/examination`,
		},
	];

	const location = useLocation();

	const { data } = useQuery({
		queryKey: ["getCourseID", id],
		queryFn: () => http.get(`/courses/${id}`).then((r) => r.data),
		// onSuccess: (data: any) => console.log("Query per course Successful", data),
		// onError: (err) => console.log("error", err),
	});

	const navigate = useNavigate();

	const [active, setActive] = useState(0);

	console.log(data)

	useEffect(() => {
		if (location.pathname.includes("examination")) {
			setActive(3);
		}
		if (location.pathname.includes("assignments")) {
			setActive(1);
		}
	}, []);

	return (
		<>
			<AdminLayout>
				<CourseHeader {...data} />
				<Box>
					<Box>
						<Box display="flex" bgColor="#dae4ff" p={3} alignItems="center">
							{tabData?.map((x, i) => (
								<Box
									onClick={() => {
										setActive(i);

										navigate(x?.path ?? x?.name.toLowerCase());
									}}
									mr={4}
									cursor="pointer"
									as={"button"}
									sx={{
										...(i === active && { color: "white", bg: "#343680", p: 2 }),
									}}
									disabled={i === active}
									_selected={{ color: "white", bg: "#343680" }}
								>
									{x?.name}
								</Box>
							))}
						</Box>

						{children}
					</Box>
				</Box>
				{false && (
					<>
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
					</>
				)}
			</AdminLayout>
		</>
	);
}
