import AppTable from "../components/Table";
import http from "../utils/http";
import { Box, Text, Flex, Skeleton, Stack, Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, ModalOverlay, ModalContent, Button, Grid, GridItem } from "@chakra-ui/react";
import TimerBox from "../components/TimerBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import CourseTabs from "../layout/CourseTabs";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";

import Countdown, { zeroPad } from "react-countdown";
import { useToast } from "@chakra-ui/react";
import { useAssessment } from "../hooks/useAssessment";

export default function ViewCourse() {
	
	const { id } = useParams();
	// const { isOpen, onClose, onOpen } = useDisclosure();
	const [activeAssessments, setActiveAssessments] = useState<any>([])
	const [modalsStates, setModalsStates] = useState<boolean[]>([])
	const toast = useToast();

	// const { data: enrollmentStatus, isLoading: enrolledIsLoading } = useQuery({
	// 	queryKey: ["getEnrollmentStatus", id],
	// 	queryFn: () => http.get(`/courses/${id}/enrollment_status`).then((r) => r.data),
	// });

	const [timer, setTimer] = useState(false)

	const { data: allAssessments, isLoading, refetch } = useQuery({
		queryKey: ["getAssessments", id],
		queryFn: () => http.get(`/courses/${id}/assessments`).then((r) => r.data),
		onSuccess(data) {
			setActiveAssessments(data?.filter((x: any) => {
					return x?.is_active && !(Math.floor(Date?.now() / 1000) > convertToEpoch(x?.end_date));
				}).sort((a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()))
				setModalsStates([...Array(activeAssessments.length).fill(false)]);
		},
	});

	const onOpen = (index: number) => {
		const updatedModalsState = [...modalsStates];
		updatedModalsState[index] = true;
		setModalsStates(updatedModalsState);
	}
	const onClose = () => {
		setModalsStates([...Array(activeAssessments.length).fill(false)]);
	}

	const automaticEndAssessmentMutation = useMutation({
		mutationFn: (id: any) => {
			return http.put(`/assessments/${id}/end-automatic`)
		},
		onError: (err: any) => (
			console.log(err)
		)
	})

	useEffect(() => {
		for (let i = 0; i<activeAssessments?.length; i++) {
			automaticEndAssessmentMutation.mutate(activeAssessments[i].id)
		}
		refetch()
	}, [new Date().getMinutes()]);

	const startTimerMutation = useMutation({
			mutationFn: async ({ course_code, assessment_id }: any) => {
					return await http.post(`/assessment_times/${course_code}/${assessment_id}`);
				},
				onSuccess: (data: any) => {console.log(data); navigate(`/exams/${id}/${data?.data?.assessment_id}`);},
				onError: (error: any) => {console.log(error)}
			});

	const handleBegin = ({course_code, assessment_id}: any) => {
		startTimerMutation.mutate({course_code, assessment_id})
	}

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
		setAssessment(allAssessments?.filter((x: any) => x?.is_marked)[0]?.id);
	}, [isTableLoading]);


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

	const renderer1 = ({ days, hours, minutes, seconds, completed }: any) => {
		if (completed) {
			setTimer(!timer)
		}
			return <TimerBox days={days} hours={hours} minutes={minutes} seconds={seconds} />;
	};
	const renderer2 = ({ days, hours, minutes, seconds, completed }: any) => {
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
						Ended!
					</Text>
				</Box>
			);
		} else {
			return <TimerBox days={days} hours={hours} minutes={minutes} seconds={seconds} />;
		}
	};

	return (
		<>
			<CourseTabs>
				<Box>
					<Text fontSize="24px" color="#585AD4" fontWeight="bold" mt={10}>
						Currently up
					</Text>

					<Flex alignItems="flex-start" mt={3} flexDir={"column"} justifyContent={"space-between"} p={5} bg={"gray.200"}>
						{isLoading ? (
							<Stack>
								<Skeleton height="20px" />
								<Skeleton height="20px" />
								<Skeleton height="20px" />
							</Stack>
						):
						activeAssessments.length > 0 ? activeAssessments?.map((x: any, index: number) => (
							<Flex key={index} width={"100%"}>
								<Grid templateColumns={"repeat(10, 1fr)"} width={"100%"} alignItems={"center"} my={2} bg={"white"} p={3} columnGap={"2"} rowGap={"2"}>
									<GridItem colSpan={{base: 7, md: 4, lg: 5}} colStart={1} rowStart={1} justifySelf={"start"}>
										<Flex
											justifyContent="space-around"
											justifySelf={"start"}
										>
											<Box ml={2} display={"flex"} justifyContent={"space-around"} flexDir={"column"}>
												<Box fontWeight={"bold"}>
													{x?.title}{" "}
												</Box>
												<Box>({x?.assessment_type === "Exam" ? "Examination" : x?.assessment_type})</Box>
												{convertToEpoch(x?.start_date) > Math.floor(Date?.now()/1000) ? <Text color="#3578D3" fontSize={"sm"}>
													{new Date(x?.start_date).toDateString()}, {new Date(x?.start_date).getHours()}:{zeroPad(new Date(x?.start_date).getMinutes())} - {new Date(x?.end_date).toDateString()}, {new Date(x?.end_date).getHours()}:{zeroPad(new Date(x?.end_date).getMinutes())}
												</Text>
													:
												<Text color="#3578D3" fontSize={"sm"}>
													Ongoing
												</Text>
												}
											</Box>
										</Flex>
									</GridItem>
									
									<GridItem colSpan={{base: 10, md: 5, lg: 4}} display={'flex'} justifySelf={{base: "center", md: "end"}} >
										<Flex 
											justifyItems={"center"}
										>
											{convertToEpoch(x?.start_date) > Math.floor(Date?.now()/1000) && <Box gridColumn={{base: "span 10", md: "span 4"}} width={"100%"}><Countdown date={x?.start_date} renderer={renderer1} /></Box>}
											{convertToEpoch(x?.start_date) <= Math.floor(Date?.now()/1000) && <Box width={"100%"}><Countdown date={x?.end_date} renderer={renderer2} /></Box>}
										</Flex>
									</GridItem>

									<GridItem colSpan={{base: 3, md: 1}} rowStart={1} colStart={{base: 8, md: 10}} justifySelf={"end"}>
										<Flex>
										{
											user?.is_instructor ? 
											<Button
												fontWeight={"bold"}
												textAlign={"right"}
												variant={"outline"}
												colorScheme="blue"
												size={"sm"}
												onClick={() => navigate(`/courses/${x?.course_id}/assessment/${x?.id}`)}
											>
												View
											</Button>
											:
											<Button
												fontWeight={"bold"}
												textAlign={"right"}
												variant={"outline"}
												colorScheme="blue"
												size={"sm"}
												onClick={() => {
													if (convertToEpoch(x?.start_date) > Math.floor(Date?.now() / 1000)) {
														toast({
															title: "Assessment is yet to begin",
															position: "top"
														});
													} else {
														onOpen(index)
													}
												}}
											>
												Take
											</Button>
										}
										</Flex>
									</GridItem>

								</Grid>
								<Modal isOpen={modalsStates[index]} onClose={onClose} key={x?.id}>
									<ModalOverlay />
									<ModalContent>
									<ModalCloseButton />
										<ModalHeader borderBottom={"1px"} borderColor={"gray.200"}>
											<Text color="#3578D3">
												{x?.title} <i>({x?.assessment_type === "Exam" ? "Examination" : x?.assessment_type})</i>
											</Text>
										</ModalHeader>
										<ModalBody p={5} display={"flex"} flexDir={"column"}>
											<Flex alignSelf={"center"}>
												{convertToEpoch(x?.start_date) > Math.floor(Date?.now()/1000) && 
												<Countdown date={x?.start_date} renderer={renderer1} />}

												{convertToEpoch(x?.start_date) <= Math.floor(Date?.now()/1000) && 
												<Countdown date={x?.end_date} renderer={renderer2} />}
											</Flex>

											<Text mt={5}>Clicking <i>"Begin"</i> starts your timer for this {x?.assessment_type === "Exam" ? "Examination".toLowerCase() : x?.assessment_type.toLowerCase}.The {x?.assessment_type === "Exam" ? "Examination".toLowerCase() : x?.assessment_type.toLowerCase} will last for <b>{x?.duration}</b> minutes.</Text>
										</ModalBody>
										<ModalFooter>
											<Button 
												minWidth={"min-content"} 
												variant={"solid"} 
												colorScheme="blue"
												onClick={() => handleBegin({course_code: x?.course_id, assessment_id: x?.id})}
												isLoading={startTimerMutation.isLoading}
											>
												Begin
											</Button>
										</ModalFooter>
									</ModalContent>
								</Modal>
								</Flex>))
							:
							<Text alignSelf={"center"} textColor={"#696CFF"}>No active assessemnt</Text>
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
						filterData={allAssessments?.filter((x: any) => x?.is_marked)}
						onSelectChange={onSelectChange}
						handleSearch={handleSearch}
					/>
				)}
				{!user?.is_instructor && (
					<Flex flexDir={"column"}>
						<Text fontSize="24px" color="#585AD4" fontWeight="bold" mt={5}>
							Results
						</Text>
						<Flex flexDir={"column"} bg={"gray.200"} p={5}>
							<Text alignSelf={"center"} textColor={"#696CFF"}>
								No assessment result
							</Text>
						</Flex>


					</Flex>
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