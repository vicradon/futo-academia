import AppTable from "../components/Table";
import http from "../utils/http";
import { Box, Text, Flex, Skeleton, Stack } from "@chakra-ui/react";
import TimerBox from "../components/TimerBox";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import CourseTabs from "../layout/CourseTabs";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";

import Countdown from "react-countdown";
import { useToast } from "@chakra-ui/react";
import { useAssessment } from "../hooks/useAssessment";

export default function ViewCourse() {
	
	const { id } = useParams();

	const toast = useToast();

	const { data: currUp, isLoading } = useQuery({
		queryKey: ["getCurrUp", id],
		queryFn: () => http.get(`/courses/${id}/assessments`).then((r) => r.data),
	});

	const [assessment, setAssessment] = useState("");
	const [name, setName] = useState("");

	const handleSearch = (e: any) => {
		setName(e?.target?.value);
	};

	const onSelectChange = (e: any) => {
		console.log("The id of select change", e?.target?.value);
		setAssessment(e?.target?.value);
	};

	const { data: tableData, isLoading: isTableLoading, isFetching } = useAssessment(assessment, name);


	useEffect(() => {
		console.log(
			"idddd",
			currUp?.filter((x: any) => x?.is_marked)
		);
		setAssessment(currUp?.filter((x: any) => x?.is_marked)[0]?.id);
	}, [isTableLoading]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	const header = [
		{
			title: "Name",
			key: "name",
			align: "left",
		},
		{
			title: "Reg No",
			key: "reg_num",
			align: "left",
		},
		{
			title: "Total (Score)",
			key: "total",
			align: "right",
		},
	];

	const navigate = useNavigate();
	const user = useUser();

	const renderer = ({ hours, minutes, seconds, completed }: any) => {
		if (completed) {
			return (
				<Box
					sx={{
						border: "1px solid #B6B3C7",
					}}
					borderRadius="8px"
					p={4}
					my={2}
					width="20%"
				>
					<Text fontWeight={"bold"} textAlign={"center"}>
						Completed!
					</Text>
				</Box>
			);
		} else {
			return <TimerBox hours={hours} minutes={minutes} seconds={seconds} />;
		}
	};

	return (
		<>
			<CourseTabs>
				<Box>
					<Text fontSize="24px" color="#585AD4" fontWeight="bold" mt={3}>
						Currently up
					</Text>

					<Flex alignItems="flex-start" mt={3} flexDir={"column"} justifyContent={"space-between"}>
						{isLoading ? (
							<Stack>
								<Skeleton height="20px" />
								<Skeleton height="20px" />
								<Skeleton height="20px" />
							</Stack>
						):
						currUp !== undefined ? currUp
							?.filter((x: any) => {
								return x?.is_active && !(Math.floor(Date?.now() / 1000) > convertToEpoch(x?.end_date));
							})
							?.map((x: any) => (
								<Flex alignItems={"center"} justifyContent={"space-between"} w="100%">
									<Flex
										ml={2}
										justifyContent="space-around"
										mr={3}
										my={2}
										cursor={"pointer"}
										onClick={() => {
											if (convertToEpoch(x?.start_date) > Math.floor(Date?.now() / 1000)) {
												toast({
													title: "Test is yet to start",
												});
											} else {
												navigate(`/exams/${id}/${x?.id}`);
											}
										}}
									>
										<Box width="100px" height="100px" bgColor="grey" display={"flex"} alignItems={"center"} justifyContent={"center"}>
											<Text fontWeight={"bold"} fontSize={"60px"} color={"white"}>
												{x?.course_id[0]?.toUpperCase()}
											</Text>
										</Box>
										<Box ml={2} display={"flex"} justifyContent={"space-around"} flexDir={"column"}>
											<Box fontWeight={"bold"}>
												{x?.course_id} ({x?.title}){" "}
											</Box>
											<Box>{x?.assessment_type}</Box>
											<Text color="#3578D3" fontWeight="bold">
												{x?.end_date.split("T")[0]}
											</Text>
										</Box>
									</Flex>
									{/* <TimerBox /> */}

									<Countdown date={x?.end_date} renderer={renderer} />
								</Flex>
							))
							: <Text>No active assessemnt</Text>
						}

					</Flex>
				</Box>
				{user?.is_instructor && (
					<AppTable
						title="Results"
						isLoading={isTableLoading || isLoading}
						isFetching={isFetching}
						data={tableData}
						header={header}
						filterData={currUp?.filter((x: any) => x?.is_marked)}
						onSelectChange={onSelectChange}
						handleSearch={handleSearch}
					/>
				)}
			</CourseTabs>
		</>
	);
}

const convertToEpoch = (timestamp: any) => {
	const dt = new Date(timestamp);
	const epochTime = dt.getTime() / 1000;

	return Math.floor(epochTime);
};
