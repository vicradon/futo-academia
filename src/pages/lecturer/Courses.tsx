import { Image, Text, Flex, Button, Box, Grid, Container } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";
import BiologyImage from "../../assets/images/biology.png";
import PhysicsImage from "../../assets/images/physics.png";
import EnglishImage from "../../assets/images/english.png";
import HumanitiesImage from "../../assets/images/humanities.png";
import MathematicsImage from "../../assets/images/mathematics.png";
import SocialSciencesImage from "../../assets/images/socialsciences.png";
import WorkshopImage from "../../assets/images/workshop.png";
import AddCourse from "../../components/AddCourse";

export default function Courses() {
	const harmattanSemesterCourses = [
		{
			title: "Use of English",
			course_code: "GST 101",
			image_url: EnglishImage,
		},
		{
			title: "Biology",
			course_code: "BIO 101",
			image_url: BiologyImage,
		},
		{
			title: "General Physics",
			course_code: "PHY 101",
			image_url: PhysicsImage,
		},
		{
			title: "Humanities",
			course_code: "GST 103",
			image_url: HumanitiesImage,
		},
		{
			title: "Mathematics",
			course_code: "MTH 101",
			image_url: MathematicsImage,
		},
	];

	const rainSemesterCourses = [
		{
			title: "General Physics",
			course_code: "PHY 102",
			image_url: PhysicsImage,
		},
		{
			title: "Use of English II",
			course_code: "GST 102",
			image_url: EnglishImage,
		},
		{
			title: "Social Sciences I",
			course_code: "GST 108",
			image_url: SocialSciencesImage,
		},
		{
			title: "Workshop Practice II",
			course_code: "ENG 102",
			image_url: WorkshopImage,
		},
		{
			title: "Mathematics II",
			course_code: "MTH 102",
			image_url: MathematicsImage,
		},
	];

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
							<Button width={"200px"} variant={showHarmattan ? "solid" : "ghost"} colorScheme="blue" onClick={handleSemesterToggle}>
								Harmattan Semester
							</Button>
							<Button width={"150px"} variant={!showHarmattan ? "solid" : "ghost"} colorScheme="blue" onClick={handleSemesterToggle}>
								Rain Semester
							</Button>
						</Flex>

						<Grid justifyItems={"center"} rowGap={"3rem"} columnGap={"1.5rem"} templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}>
							{showHarmattan
								? harmattanSemesterCourses.map((course) => (
										<Box width={{ base: "260px", sm: "310px" }} sx={{ background: "#fff" }}>
											<Image height={"240px"} width={"100%"} backgroundSize="cover" src={course.image_url} alt={course.title} />
											<Box borderRadius={"  0.5rem 0.5rem"} shadow={"lg"} padding={"1rem"}>
												<Box mb={6}>
													<Text fontSize={"2xl"} mb={0} color={"brand.500"}>
														{course.title}
													</Text>
													<Text color={"brand.500"}>{course.course_code}</Text>
												</Box>
												<Button width={"100%"} colorScheme={"brand"}>
													View Course
												</Button>
											</Box>
										</Box>
								  ))
								: rainSemesterCourses.map((course) => (
										<Box width={{ base: "260px", sm: "310px" }} sx={{ background: "#fff" }}>
											<Image height={"300px"} backgroundSize="cover" src={course.image_url} alt={course.title} />
											<Box borderRadius={"0 0 0.5rem 0.5rem"} shadow={"lg"} padding={"1rem"}>
												<Box mb={6}>
													<Text fontSize={"2xl"} mb={0} color={"brand.500"}>
														{course.title}
													</Text>
													<Text color={"brand.500"}>{course.course_code}</Text>
												</Box>
												<Button width={"100%"} colorScheme={"brand"}>
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
