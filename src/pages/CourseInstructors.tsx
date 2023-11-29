import { useParams } from "react-router-dom";
import CourseTabs from "../layout/CourseTabs";
import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Loader from "../components/Loaders";


export default function CourseInstructors() {
	const { id } = useParams();

	const { data: coordinators, isLoading: coordinatorLoading } = useQuery({
		queryKey: ["getCoordinators", id],
		queryFn: () => http.get(`/instructors/coordinators/${id}`).then((r) => r.data),
		onError: (err) => console.log("error", err),
    onSuccess: (data) => {
      console.log(data);
    },
	});

	const { data: instructors, isLoading: instructorLoading } = useQuery({
		queryKey: ["getInstructors", id],
		queryFn: () => http.get(`/instructors/${id}`).then((r) => r.data),
		onError: (err) => console.log("error", err),
    onSuccess: (data) => {
      console.log(data);
    },
	});

	const { data: enrollment_status } = useQuery({
		queryKey: ["getEnrollmentStatus", id],
		queryFn: () => http.get(`/courses/${id}/enrollment_status`).then((r) => r.data),
	});



	return (
		<CourseTabs>
			<Heading mt={5} fontSize={{base: "16", md: "20"}} textColor={"white"}bg={"#343680"} p={2}>Coordinators</Heading>
			{
				coordinatorLoading ? <Loader /> :
				coordinators?.length >= 0 ?
				<Flex flexDir={"column"}>
					{coordinators?.map((coordinator: any, index: number) => 
					<Flex p={3} bg={index%2 === 0 ? "#E0E0E066" : "unset"} columnGap={1}>
						<Text >{index+1}.</Text>
						<Text>{coordinator?.title}</Text>
						<Text>{coordinator?.name}</Text>
						<Text>({coordinator?.department})</Text>
						<Spacer />
						{coordinator?.is_current_user && <Text>You</Text>}
					</Flex>
					)}
				</Flex> :
				<Text>No Coordinator</Text>
			}
			<Heading mt={5} fontSize={{base: "16", md: "20"}} textColor={"white"}bg={"#343680"} p={2}>Instructors</Heading>
			{
				instructorLoading ? <Loader /> :
				instructors?.length >= 0 ?
				<Flex flexDir={"column"}>
					{instructors?.map((instructor: any, index: number) => 
					<Flex p={3} bg={index%2 === 0 ? "#E0E0E066" : "unset"} columnGap={1}>
						<Text >{index+1}.</Text>
						<Text>{instructor?.title}</Text>
						<Text>{instructor?.name}</Text>
						<Text>({instructor?.department})</Text>
						<Spacer />
						{instructor?.is_current_user && <Text>You</Text>}
					</Flex>
					)}
				</Flex> :
				<Text>No Coordinator</Text>
			}
			{enrollment_status?.is_course_coordinator && <><Heading mt={5} fontSize={{base: "16", md: "20"}} textColor={"white"}bg={"#343680"} p={2}>Requests</Heading>
			{
				instructorLoading ? <Loader /> :
				instructors?.length >= 0 ?
				<Flex flexDir={"column"}>
					{instructors?.map((instructor: any, index: number) => 
					<Flex p={3} bg={index%2 === 0 ? "#E0E0E066" : "unset"} columnGap={1}>
						<Text >{index+1}.</Text>
						<Text>{instructor?.title}</Text>
						<Text>{instructor?.name}</Text>
						<Text>({instructor?.department})</Text>
						<Spacer />
						<Button variant={"ghost"} colorScheme="green" size={"sm"}>Accept</Button>
						<Button variant={"ghost"} colorScheme="red" size={"sm"}>Reject</Button>
					</Flex>
					)}
				</Flex> :
				<Text>No Coordinator</Text>
			}</>}
			
		</CourseTabs>
	);
}
