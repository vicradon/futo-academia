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
			name: "Summary",
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
	});

	const navigate = useNavigate();

	const [active, setActive] = useState(0);

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
						<Box display="flex" bgColor="#dae4ff" alignItems="center" flexWrap={"wrap"} justifyContent={"space-around"} h={"30px"}>
							{tabData?.map((x, i) => (
								<Box
									onClick={() => {
										setActive(i);

										navigate(x?.path ?? x?.name.toLowerCase());
									}}
									key={i}
									w={"25%"}
									h={"30px"}
									cursor="pointer"
									as={"button"}
									textAlign={"center"}
									sx={{
										...(i === active && { color: "white", bg: "#343680"}),
									}}
									disabled={i === active}
									_selected={{ color: "white", bg: "#343680" }}
									fontSize={{base: "12px", sm: "18px"}}
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
