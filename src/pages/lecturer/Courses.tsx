import { Image, Text, Flex, Button, Box, Grid, Container } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";

import AddCourse from "../../components/AddCourse";
import { useQuery } from "@tanstack/react-query";
import http from "../../utils/http";

export default function Courses() {
	const [semester, setSemester] = useState(1);
	const navigate = useNavigate();

	const { data } = useQuery({
		queryKey: ["getCourse", semester],
		queryFn: () => http.get(`/courses/enrollments?semester=${semester}`).then((r) => r.data),
		onSuccess: (data: any) => console.log("Query Successful", data),
		onError: (err) => console.log("error", err),
	});

	const [showHarmattan, setShowHarmattan] = useState(true);
	const handleSemesterToggle = () => {
		setShowHarmattan((prevShowHarmattan) => !prevShowHarmattan);
	};
	return (
		<Box bg={"#F3F6FF"}>
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box my={8} sx={{ marginRight: "50px" }}>
					<Container maxW={"73vw"}>
						<Flex my={8} justifyContent={"center"}>
							<Button
								width={"200px"}
								variant={showHarmattan ? "solid" : "ghost"}
								colorScheme="blue"
								onClick={() => {
									setSemester(1);
									handleSemesterToggle();
								}}
							>
								Harmattan Semester
							</Button>
							<Button
								width={"150px"}
								variant={!showHarmattan ? "solid" : "ghost"}
								colorScheme="blue"
								onClick={() => {
									setSemester(2);
									handleSemesterToggle();
								}}
							>
								Rain Semester
							</Button>
						</Flex>

						<Grid justifyItems={"center"} rowGap={"3rem"} columnGap={"1.5rem"} templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}>
							{data?.map((course: any) => (
								<Box width={{ base: "260px", sm: "310px" }} sx={{ background: "#fff" }}>
									<Image height={"240px"} width={"100%"} backgroundSize="cover" src={course.course_photo_url} alt={course.title} />
									<Box borderRadius={"  0.5rem 0.5rem"} shadow={"lg"} padding={"1rem"}>
										<Box mb={6}>
											<Text fontSize={"2xl"} mb={0} color={"brand.500"}>
												{course.title}
											</Text>
											<Text color={"brand.500"}>{course.course_code}</Text>
										</Box>
										<Button width={"100%"} colorScheme={"brand"} onClick={() => navigate(`/lecturer/courses/${course?.course_code}`)}>
											View Course
										</Button>
									</Box>
								</Box>
							))}
							<AddCourse />
						</Grid>

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
