import { FormEvent, useState } from "react";
import { Flex, Box, Button, chakra, FormControl, FormLabel, Input, Select, Textarea, VStack, Heading } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../layout/Sidebar";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useCreateCourse, useUploadCourseCover } from "../../hooks/useCourses";
import { useEnrollStudents } from "../../hooks/useEnrollments";

const UploadCourse = () => {
	const navigate = useNavigate();
	const [courseTitle, setCourseTitle] = useState("");
	const [courseUnit, setCourseUnit] = useState("1");
	const [courseCode, setCourseCode] = useState("");
	const [courseFaculty, setCourseFaculty] = useState("");
	const [courseLevel, setCourseLevel] = useState("100");
	const [courseDescription, setCourseDescription] = useState("");
	const [courseCoverImage, setCourseCoverImage] = useState<File | null>(null);
	const [semester, setSemester] = useState("1");
	const [classList, setClassList] = useState<File | null>(null);

	const handleGoBack = () => {
		navigate(-1);
	};

	const HoverableArrowBackIcon = chakra(ArrowBackIcon, {
		baseStyle: {
			fontSize: "25px",
			cursor: "pointer",
			transition: "all 0.2s ease-in-out",
			_hover: {
				color: "blue.500",
			},
		},
	});

	const handleCourseTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCourseTitle(event.target.value);
	};

	const handleCourseUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCourseUnit(event.target.value);
	};

	const handleCourseCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCourseCode(event.target.value);
	};

	const handleCourseDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCourseDescription(event.target.value);
	};
	const handleCourseCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setCourseCoverImage(event.target.files[0]);
		}
	};

	const handleSemesterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSemester(event.target.value);
	};

	const handleClassListChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.length === 1) {
			setClassList(event.target.files[0]);
		}
	};

	const handleCancel = () => {
		window.history.back();
	};

	const createCourseMutation = useCreateCourse();
	const coursePhotoMutation = useUploadCourseCover(createCourseMutation.isSuccess);
	const enrollStudentMutation = useEnrollStudents(createCourseMutation.isSuccess);

	const handleSubmit = async (event: FormEvent) => {
		try {
			event.preventDefault();

			createCourseMutation.mutate({
				course_code: courseCode,
				title: courseTitle,
				description: courseDescription,
				units: courseUnit,
				faculty: courseFaculty,
				semester: semester,
				level: courseLevel,
			});

			enrollStudentMutation.mutate({
				file: classList,
				course_code: courseCode,
			});

			coursePhotoMutation.mutate({ course_code: courseCode, file: courseCoverImage });

			if (coursePhotoMutation.isSuccess && enrollStudentMutation.isSuccess && createCourseMutation.isSuccess) {
				// navigate('/somewhere')
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box bg={"#F3F6FF"} >
			<Navbar bgColor="#F3F6FF" />
			<Flex gap={"2vw"} paddingTop={"110px"}>
				<Sidebar />
				<Box paddingTop={"20px"} sx={{ marginRight: "50px" }}>
					<HoverableArrowBackIcon onClick={handleGoBack} marginLeft={"30px"} />
					<Box padding={"20px 20px"} width={{base: "100vw", md: "73vw"}} maxWidth={"1200px"}>
						<>
							<Box fontWeight="bold" mb={10} color={"#585AD4"} textAlign={"center"}>
								<Heading size="lg">Upload New Course</Heading>
							</Box>
							<VStack spacing={4} >
								<Flex justifyContent={"space-between"} columnGap={4} as="form" onSubmit={handleSubmit} width={"100%"} p={"0rem"} flexDir={{base: "column", md: "row"}}>
									<Box  width={{base: "100%", md: "50%"}}>
										<FormControl isRequired>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"} >
													Title
												</Heading>
											</FormLabel>
											<Input value={courseTitle} required onChange={handleCourseTitleChange} bg="#fff" placeholder="Title" mb={"20px"} />
										</FormControl>
										<FormControl>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Course Units
												</Heading>
											</FormLabel>

											<Select value={courseUnit} onChange={handleCourseUnitChange} sx={{ marginBottom: "20px" }} bg="#fff">
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
											</Select>
										</FormControl>
										<FormControl isRequired>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Course Code
												</Heading>
											</FormLabel>
											<Input value={courseCode} onChange={handleCourseCodeChange} sx={{ marginBottom: "20px" }} bg="#fff" />
										</FormControl>
										<FormControl>
											<FormLabel>
												<Heading size="sm" color={"#151633"}>
													Description
												</Heading>
											</FormLabel>
											<Textarea value={courseDescription} onChange={handleCourseDescriptionChange} sx={{ marginBottom: "20px" }} bg="#fff" />
										</FormControl>
									</Box>
									<Box width={{base: "100%", md: "50%"}} >
										<FormControl>
											<FormLabel>
												<Heading size="sm" color={"#151633"}>
													Cover Image
												</Heading>
											</FormLabel>
											<Input type="file" accept="image/*" onChange={handleCourseCoverImageChange} sx={{ marginBottom: "20px" }} bg="#fff" />
										</FormControl>
										<FormControl isRequired>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Course Faculty
												</Heading>
											</FormLabel>
											<Input value={courseFaculty} required onChange={({ target }) => setCourseFaculty(target.value)} bg="#fff" placeholder="Enter course's faculty" />
										</FormControl>
										<FormControl isRequired>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Course Level
												</Heading>
											</FormLabel>
											<Select isRequired value={courseLevel} onChange={({ target }) => setCourseLevel(target.value)} sx={{ marginBottom: "20px" }} bg="#fff">
												<option value={"100"}>100</option>
												<option value={"200"}>200</option>
												<option value={"300"}>300</option>
												<option value={"400"}>400</option>
												<option value={"500"}>500</option>
											</Select>
										</FormControl>
										<FormControl>
											<FormLabel>
												<Heading size="sm" color={"#151633"}>
													Semester
												</Heading>
											</FormLabel>
											<Select required value={semester} onChange={handleSemesterChange} sx={{ marginBottom: "20px" }} bg="#fff">
												<option value={"1"}>Harmattan Semester</option>
												<option value={"2"}>Rain Semester</option>
											</Select>
										</FormControl>
										<FormControl isRequired>
											<FormLabel display={"flex"} columnGap={4}>
												<Heading size="sm" color={"#151633"}>
													Upload Class List
												</Heading>
											</FormLabel>
											<Input required type="file" multiple onChange={handleClassListChange} sx={{ marginBottom: "20px" }} bg="#fff" accept="application/csv" />
										</FormControl>
									</Box>
								</Flex>
								<Flex alignItems={"center"} justifyContent={"center"} gap={"20px"}>
									<Button onClick={handleCancel} maxWidth={"200px"} border={"1px solid #EB5757"} color={"#EB5757"}>
										Cancel
									</Button>
									<Button type="submit" onClick={handleSubmit} colorScheme="brand" mr={2} maxWidth={"200px"}>
										Done
									</Button>
								</Flex>
							</VStack>
						</>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default UploadCourse;
