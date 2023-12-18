import { Box, Text, Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, ModalOverlay, ModalContent, Button, useDisclosure, Flex } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

import http from "../utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@chakra-ui/react";
import Countdown, { zeroPad } from "react-countdown";
import TimerBox from "./TimerBox";
import { useState } from "react";

export default function AssessmentCard({ is_active, title, id, idx, is_marked, is_completed, overAllClick, setExamSetUp, data }: Partial<any>) {
	const navigate = useNavigate();
	const user = useUser();
	const toast = useToast();
	const queryClient = useQueryClient();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [timer, setTimer] = useState(false)

	const markMutation = useMutation({
		mutationFn: (id) => {
			return http.post(`/marks/${id}/`);
		},
		onSuccess: () => {
			toast({ title: "Sucessfully mark", variant: "solid" });
			queryClient.invalidateQueries({ queryKey: ["getassesments"] });
		},
		onError: (err: any) => {
			console.log("toast err", err);
			toast({ title: err?.response?.data?.detail || err?.message });
		},
	});

	const uploadMutation = useMutation({
		mutationFn: (id) => {
			return http.put(`/assessments/${id}/activate`);
		},
		onSuccess: () => {
			toast({ title: "Sucessfully updated", variant: "solid" });
			queryClient.invalidateQueries({ queryKey: ["getassesments"] });
			setExamSetUp({});
		},
		onError: (err: any) => {
			if (err?.response) {
				toast({
					status: "error",
					description: err?.response?.data?.detail,
					position: "top"
				})
			}
		},
	});

	const startTimerMutation = useMutation({
		mutationFn: async ({ course_code, assessment_id }: any) => {
				return await http.post(`/assessment_times/${course_code}/${assessment_id}`);
			},
			onSuccess: (data: any) => {navigate(`/exams/${idx}/${data?.data?.assessment_id}`);},
			onError: (error: any) => {console.log(error)}
		});

	const handleBegin = ({course_code, assessment_id}: any) => {
		startTimerMutation.mutate({course_code, assessment_id})
	}

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
		<Box display="flex" my={4}>
			<Box bgColor="#fff" p={3} display="flex" alignItems="center" w="100%" justifyContent="space-between">
				<Box display="flex" flexDir="column" mr={2}>
					<Flex mb={2}>{title}<Text textColor={"#3578D3"} px={1} py={0} borderRadius={"20px"} >({data?.assessment_type === "Exam" ? "examination" : data?.assessment_type.toLowerCase()})</Text></Flex>
					
					{convertToEpoch(data?.start_date) > Math.floor(Date?.now()/1000) ? <Text color="#3578D3" fontSize={"sm"}>
												{new Date(data?.start_date).toDateString()}, {new Date(data?.start_date).getHours()}:{zeroPad(new Date(data?.start_date).getMinutes())} - {new Date(data?.end_date).toDateString()}, {new Date(data?.end_date).getHours()}:{zeroPad(new Date(data?.end_date).getMinutes())}
											</Text>
												:
											<Text color="#3578D3" fontSize={"sm"}>
												Ongoing
											</Text>
											}
				</Box>

				<Box display="flex" alignItems="center" justifyContent="space-between">
					{user?.is_instructor && !is_active && !is_marked && !is_completed && (
						<>
							<Text
								as={NavLink}
								to={is_active ? `/exams/${idx}/${id}`: `/courses/${idx}/assessment/${id}` }
								mr={2}
								cursor={"pointer"}
							>
								View
							</Text>
							<Text mx={3}>|</Text>
							<Text
								cursor="pointer"
								onClick={() => {
									navigate(`/courses/${idx}/assessment/add/${id}`);
								}}
							>
								Edit
							</Text>
							<Text mx={3}>|</Text>
							<Button 
								cursor="pointer" 
								colorScheme="blue" 
								isLoading={uploadMutation.isLoading} 
								as="button" 
								onClick={() => uploadMutation.mutate(id)}
								borderRadius={10}
								size={"sm"}
							>
								Upload
							</Button>
						</>
					)}
					{user?.is_instructor && is_active && (
						<>
							<Text
								cursor="pointer"
								onClick={() => {
									navigate(`/courses/${idx}/assessment/add/${id}`);
								}}
							>
								Edit
							</Text>
							<Text mx={3}>|</Text>
							<Text
								as={NavLink}
								to={`/courses/${idx}/assessment/${id}`}
								mr={2}
								cursor={"pointer"}
							>
								View
							</Text>
							<Text mx={3}>|</Text>
							<Text
								as={NavLink}
								to={`/courses/${idx}/assessment/${id}`}
								mr={2}
								cursor={"pointer"}
							>
								End
							</Text>
						</>
					)}
					{!user?.is_instructor && is_active && (
						<>
							<Text
								as={NavLink}
								onClick={convertToEpoch(data?.start_date) > Math.floor(Date?.now()/1000) ? () => toast({
									title: "Assessment is yet to begin",
									position: "top"
								}) : onOpen}
								mr={2}
								cursor={"pointer"}
							>
								Take
							</Text>
							<Modal isOpen={isOpen} onClose={onClose}>
										<ModalOverlay />
										<ModalContent>
										<ModalCloseButton />
											<ModalHeader borderBottom={"1px"} borderColor={"gray.200"}>
												<Text color="#3578D3">
													{data?.title} <i>({data?.assessment_type === "Exam" ? "Examination" : data?.assessment_type})</i>
												</Text>
											</ModalHeader>
											<ModalBody p={5} display={"flex"} flexDir={"column"}>
											<Flex alignSelf={"center"}>
												{convertToEpoch(data?.start_date) > Math.floor(Date?.now()/1000) && 
												<Countdown date={data?.start_date} renderer={renderer1} />}

												{convertToEpoch(data?.start_date) <= Math.floor(Date?.now()/1000) && 
												<Countdown date={data?.end_date} renderer={renderer2} />}

											</Flex>

												<Text mt={5}>Clicking <i>"Begin"</i> starts your timer for this {data?.assessment_type === "Exam" ? "Examination".toLowerCase() : data?.assessment_type.toLowerCase}.The {data?.assessment_type === "Exam" ? "Examination".toLowerCase() : data?.assessment_type.toLowerCase} will last for <b>{data?.duration}</b> minutes.</Text>
											</ModalBody>
											<ModalFooter>
												<Button 
													minWidth={"min-content"} 
													variant={"solid"} 
													colorScheme="blue"
													onClick={() => handleBegin({course_code: data?.course_id, assessment_id: data?.id})}
													isLoading={startTimerMutation.isLoading}
												>
													Begin
												</Button>
											</ModalFooter>
										</ModalContent>
									</Modal>
						</>
					)}
					{user?.is_instructor && is_completed && (
						<>
							<Button
								onClick={() => {
									navigate(`/courses/${idx}/assessment/${id}`);
								}}
								mr={2}
								size={"sm"}
							>
								View
							</Button>
							<Button onClick={() => markMutation.mutate(id)} isLoading={markMutation?.isLoading} size={"sm"}>
								Mark
							</Button>
						</>
					)}

					{is_marked && !user?.is_instructor && overAllClick && <Button onClick={() => overAllClick()}>View Result</Button>}
				</Box>
			</Box>
		</Box>
	);
}

const convertToEpoch = (timestamp: any) => {
	const dt = new Date(timestamp);
	const epochTime = dt.getTime() / 1000;

	return Math.floor(epochTime);
};