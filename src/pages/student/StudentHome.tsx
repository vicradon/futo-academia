import { Heading, Image, Text, Menu, MenuButton, MenuList, MenuItem, Flex, Button, Input, InputGroup, InputLeftAddon, Box, Grid, Container } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FilterIcon, SearchIcon } from "../../components/Icons";
import BackgroundImage from "../../assets/bg-images/students.png";
import StudentDashboardLayout from "../../layout/StudentDashboardLayout";
import BiologyImage from "../../assets/images/biology.png";
import ChemistryImage from "../../assets/images/chemistry.png";
import PhysicsImage from "../../assets/images/physics.png";
import EnglishImage from "../../assets/images/english.png";
import HumanitiesImage from "../../assets/images/humanities.png";
import MathematicsImage from "../../assets/images/mathematics.png";
import SocialSciencesImage from "../../assets/images/socialsciences.png";
import WorkshopImage from "../../assets/images/workshop.png";

export default function StudentHome() {
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
		{
			title: "General Chemistry",
			course_code: "CHM 101",
			image_url: ChemistryImage,
		},
	];

	const rainSemesterCourses = [
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
			title: "General Physics",
			course_code: "PHY 102",
			image_url: PhysicsImage,
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
		{
			title: "General Chemistry",
			course_code: "CHM 102",
			image_url: ChemistryImage,
		},
	];

	return (
		<StudentDashboardLayout>
			<Box backgroundImage={`url(${BackgroundImage})`} backgroundSize={"cover"}>
				<Container maxW={"container.xl"}>
					<Grid height={"85vh"} rowGap={12}>
						<Box alignSelf={"end"}>
							<Heading textAlign={"center"} color={"brand.500"}>
								Learn with Ease
							</Heading>
							<Text textAlign={"center"} color="white" fontWeight={"bold"}>
								Search for any course of your choice and learn at your own convenience.
							</Text>
						</Box>

						<Grid
							gridTemplateAreas={{
								base: `
						"search search search search"
						"faculty level level ."
						
					`,
								sm: `
						"search search search search search search"
						". . . . faculty level"`,
								md: `
						"faculty search level"
					`,
							}}
							rowGap={4}
							alignSelf={"start"}
							alignItems={"center"}
							justifyContent={"space-around"}
							columnGap={4}
						>
							<Box gridArea={"faculty"}>
								<Menu>
									<MenuButton size={{ base: "sm", sm: "md" }} variant={"outline"} colorScheme={"brand"} color={"white"} as={Button} rightIcon={<ChevronDownIcon />}>
										Faculty
									</MenuButton>
									<MenuList>
										<MenuItem>SEET</MenuItem>
										<MenuItem>SESET</MenuItem>
										<MenuItem>SOPS</MenuItem>
										<MenuItem>SOBS</MenuItem>
										<MenuItem>SCIT</MenuItem>
									</MenuList>
								</Menu>
							</Box>

							<InputGroup gridArea={"search"} backgroundColor={"white"} rounded={"md"} width={{ base: "100%", lg: "300px" }}>
								<InputLeftAddon backgroundColor={"white"} children={<SearchIcon />} />
								<Input placeholder="Search Courses..." />
							</InputGroup>

							<Box gridArea={"level"}>
								<Menu>
									<MenuButton
										style={{ width: "150px" }}
										size={{ base: "sm", sm: "md" }}
										variant={"outline"}
										color={"white"}
										colorScheme={"brand"}
										as={Button}
										leftIcon={<FilterIcon />}
									>
										Select Level
									</MenuButton>
									<MenuList>
										<MenuItem>100 Level</MenuItem>
										<MenuItem>200 Level</MenuItem>
										<MenuItem>300 Level</MenuItem>
										<MenuItem>400 Level</MenuItem>
										<MenuItem>500 Level</MenuItem>
									</MenuList>
								</Menu>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box my={8}>
				<Container maxW={"container.xl"}>
					<Flex my={8} justifyContent={"center"}>
						<Button width={"200px"} variant={"ghost"}>
							Harmattan Semester
						</Button>
						<Button width={"150px"} variant={"ghost"}>
							Rain Semester
						</Button>
					</Flex>

					<Grid justifyItems={"center"} rowGap={"3rem"} columnGap={"2rem"} templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}>
						{harmattanSemesterCourses.map((course) => (
							<Box width={{ base: "280px", sm: "313px" }}>
								<Image height={"300px"} backgroundSize="cover" src={course.image_url} alt={course.title} />
								<Box borderRadius={"0 0 0.5rem 0.5rem"} shadow={"lg"} padding={"1rem"}>
									<Box mb={6}>
										<Text fontSize={"2xl"} mb={0} color={"brand.500"}>
											{course.title}
										</Text>
										<Text color={"brand.500"}>{course.course_code}</Text>
									</Box>

									<Button width={"100%"} colorScheme={"brand"}>
										Add Course
									</Button>
								</Box>
							</Box>
						))}
					</Grid>

					<Flex my={12} justifyContent={"center"}>
						<Button width={{ base: "150px", md: "200px", lg: "400px" }} colorScheme={"brand"} variant={"outline"}>
							View More
						</Button>
					</Flex>
				</Container>
			</Box>
		</StudentDashboardLayout>
	);
}
